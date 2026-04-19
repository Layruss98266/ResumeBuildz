// Client-side observability entry point. Loaded automatically by Next.js
// in the browser. Sentry stays inert unless NEXT_PUBLIC_SENTRY_DSN is set.

import * as Sentry from '@sentry/nextjs';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0,
    sendDefaultPii: false,
    ignoreErrors: [
      // Next.js router aborts an in-flight RSC fetch when the user
      // navigates away; it's noise, not a bug.
      'Failed to fetch RSC payload',
      'NetworkError when attempting to fetch resource',
      // Chrome extension errors that aren't ours.
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
    ],
  });
}

export const onRouterTransitionStart = dsn ? Sentry.captureRouterTransitionStart : () => {};
