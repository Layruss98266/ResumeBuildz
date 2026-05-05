import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { serverEnv } from '@/lib/env';
import { loadStripe } from '@/lib/lazyStripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { PLANS, type PlanId } from '@/lib/stripe';

// Stripe webhook handler — signature verification + event routing.
//
// Deployment steps (all required before Stripe Dashboard setup):
//   1. npm install stripe
//   2. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in Vercel env
//   3. Stripe Dashboard → Developers → Webhooks → Add endpoint:
//        URL: https://<yourdomain>/api/stripe/webhook
//        Events: checkout.session.completed,
//                customer.subscription.updated,
//                customer.subscription.deleted,
//                invoice.payment_failed
//   4. Copy the signing secret → STRIPE_WEBHOOK_SECRET
//
// SECURITY: the signature check below is the ONLY thing standing between
// the internet and your billing state. Never accept events without it —
// an attacker who knows the webhook URL can otherwise promote themselves
// to Pro by POSTing a fake `customer.subscription.updated` payload.
//
// Rate limiting: not applied here intentionally. Stripe retries with
// exponential backoff on 5xx, so a tight rate limit would break legitimate
// retries. Stripe signs every request, so spam from other parties fails
// at the signature check anyway.

// Node runtime required because we need the raw body for signature check.
export const runtime = 'nodejs';
// Disable Next.js body parsing; Stripe needs the exact raw bytes.
export const dynamic = 'force-dynamic';

const REQUIRED_ENV = ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'] as const;

export async function POST(req: NextRequest) {
  // 1. Fail fast if webhook env not configured (pre-launch state).
  for (const key of REQUIRED_ENV) {
    if (!process.env[key]) {
      // Return 503 so Stripe retries once the secret is set, but don't
      // reveal which env var is missing to an outside caller.
      return new NextResponse('Webhook not configured', { status: 503 });
    }
  }

  // 2. Signature verification. MUST happen on the raw body.
  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    return new NextResponse('Missing signature', { status: 400 });
  }

  const rawBody = await req.text();

  // Lazy-load Stripe SDK (see lib/lazyStripe.ts).
  const Stripe = await loadStripe();
  if (!Stripe) {
    return new NextResponse('Stripe SDK not installed', { status: 503 });
  }
  const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY);

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, serverEnv.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Invalid signature';
    // Only log the TYPE of failure — never echo the signature back, as
    // that leaks timing info that could help forge future requests.
    logger.warn('[stripe-webhook] signature verification failed:', msg);
    return new NextResponse('Signature verification failed', { status: 400 });
  }

  // 3. Route events. All state updates go through Supabase service role
  //    (server-only; never exposed to the client). Each handler is
  //    idempotent because Stripe retries on any non-2xx.
  try {
    const db = createAdminClient();

    switch (event.type) {
      case 'checkout.session.completed': {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const session = event.data.object as any;
        const userId: string | null = session.client_reference_id ?? session.metadata?.userId ?? null;
        const plan: string | null = session.metadata?.plan ?? null;
        const customerId: string | null =
          typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null;

        if (!userId) {
          logger.warn('[stripe-webhook] checkout.session.completed: no userId in client_reference_id or metadata');
          break;
        }
        if (!plan || !(plan in PLANS)) {
          logger.warn('[stripe-webhook] checkout.session.completed: unknown plan in metadata:', plan);
          break;
        }

        const update: Record<string, unknown> = { plan: plan as PlanId };
        if (customerId) update.stripe_customer_id = customerId;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (db.from('profiles') as any).update(update).eq('id', userId);
        if (error) {
          logger.error('[stripe-webhook] failed to upgrade profile:', error.message);
          // Return 500 so Stripe retries.
          return new NextResponse('DB update failed', { status: 500 });
        }
        logger.info(`[stripe-webhook] upgraded user ${userId} to plan ${plan}`);
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sub = event.data.object as any;
        const customerId: string = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id;

        // Determine new plan: active subscriptions map price → plan; anything
        // else (canceled, unpaid, incomplete_expired) reverts to free.
        let newPlan: string = 'free';
        if (event.type === 'customer.subscription.updated' && sub.status === 'active') {
          const priceId: string | undefined = sub.items?.data?.[0]?.price?.id;
          const matched = Object.values(PLANS).find((p) => p.priceId && p.priceId === priceId);
          if (matched) newPlan = matched.id;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (db.from('profiles') as any)
          .update({ plan: newPlan })
          .eq('stripe_customer_id', customerId);
        if (error) {
          logger.error('[stripe-webhook] failed to sync subscription plan:', error.message);
          return new NextResponse('DB update failed', { status: 500 });
        }
        logger.info(`[stripe-webhook] subscription ${event.type}: customer ${customerId} → plan ${newPlan}`);
        break;
      }

      case 'invoice.payment_failed': {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const invoice = event.data.object as any;
        const customerId: string = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;
        // Stripe handles retries and grace periods via dunning settings.
        // Log here for ops visibility; revoke access only after subscription
        // transitions to 'canceled' (handled by subscription.deleted above).
        logger.warn(`[stripe-webhook] payment_failed for customer ${customerId}`);
        break;
      }

      default:
        // Log unknown events for visibility without crashing.
        logger.warn('[stripe-webhook] unhandled event:', event.type);
    }
  } catch (err) {
    // 500 triggers Stripe retry with backoff. Don't return details to Stripe.
    logger.error('[stripe-webhook] handler error:', err);
    return new NextResponse('Handler error', { status: 500 });
  }

  return NextResponse.json({ received: true });
}
