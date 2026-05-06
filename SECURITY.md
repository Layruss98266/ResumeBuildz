# Security Policy

ResumeBuildz takes security seriously. This document describes the security architecture, data handling practices, and vulnerability reporting process.

## Architecture Overview

ResumeBuildz is a **hybrid application**: the builder UI runs entirely in the browser, but opt-in features (auth, cloud sync, billing, share invites) use server-side infrastructure.

| Layer | Technology | What it handles |
|---|---|---|
| Frontend | Next.js 16 (App Router) | Builder UI, ATS tools, templates |
| Auth | Supabase (GoTrue) | Google OAuth, email/password, TOTP 2FA |
| Database | Supabase Postgres + RLS | User profiles, cloud sync |
| Billing | Stripe | Subscription management |
| Email | Resend | Share invite emails |
| Edge Functions | Supabase Deno runtime | Usage counting, account deletion (GDPR) |

## Data Storage

### Local (unauthenticated users)
- Resume content, template, and preferences are stored in **`localStorage`** — they never leave the browser.
- Auto-saves debounce at 1 second; `beforeunload` / `pagehide` flush any pending writes.

### Cloud (signed-in users, opt-in)
- Resume data can be synced to Supabase Postgres via cloud save.
- Every table is protected by **Row-Level Security (RLS)**: `auth.uid() = id` on all rows.
- Supabase service-role key is only used in `app/api/stripe/webhook` after Stripe signature verification. It is never exposed client-side.

### Groq API Keys (AI assist)
- Users supply their own Groq API key for the AI writing assistant.
- Keys are stored in **`sessionStorage`** — scoped to the current browser tab and automatically cleared when the tab closes, limiting the exposure window compared to `localStorage`.
- API calls go **directly from the browser to Groq**. The key never passes through any ResumeBuildz server.

## Authentication

- **Google OAuth** and **email/password** are supported via Supabase Auth.
- TOTP two-factor authentication is available for additional account security.
- Session cookies are managed by `@supabase/ssr` (HttpOnly, SameSite=Lax).
- Server-side auth is verified via `supabase.auth.getUser()` in every Route Handler and Server Action — never trusted from request body or headers alone.
- The checkout Route Handler extracts `userId` from the server-side session cookie; it is not accepted from the request body to prevent privilege escalation.

## API Security

### Rate Limiting
- Share invite endpoint: 10 requests per IP per hour.
- Same-origin enforcement: `Origin` header is validated against `SITE_URL` on all write endpoints.

### Input Validation
- All user-facing inputs are validated with `lib/validation.ts` helpers.
- Free-text fields are sanitized with `stripControlChars` to remove C0 control characters and zero-width Unicode that can break ATS parsers.
- HTML export output is escaped with `escapeHtml` before rendering in email bodies or HTML files.

### Stripe Webhooks
- All incoming Stripe webhook payloads are verified with `stripe.webhooks.constructEvent` using `STRIPE_WEBHOOK_SECRET` before any database writes.
- Unverified payloads return 400 immediately.

## Security Measures

### XSS Prevention
- HTML export output is sanitized before writing to files.
- No `dangerouslySetInnerHTML` with unsanitized user input.
- Content Security Policy, HSTS, X-Frame-Options, and Referrer-Policy headers are set via Next.js middleware.

### File Upload Limits
- Resume import: maximum 10 MB (DOCX, TXT, HTML, MD, PDF).
- Profile photo: maximum 2 MB.
- File type validation runs before any processing.
- Files are processed client-side only and are never transmitted to ResumeBuildz servers.

### CSS Injection Prevention
- Font selections are restricted to a whitelist of safe fonts.
- Configurable numeric values (font size, margins) are clamped to safe ranges.

## GDPR Compliance

- **Export data**: `useAuth.exportUserData()` downloads a JSON bundle of account details and localStorage resume data.
- **Delete account**: calls the `delete-user` Supabase Edge Function which removes both the `profiles` row and the `auth.users` record. Falls back to profile-only deletion if the Edge Function is unavailable, with a `partialDeletion` flag returned to the UI.
- Deleted users' data is removed from the database immediately.

## Reporting Vulnerabilities

If you discover a security vulnerability, please report it responsibly.

### How to Report

Send an email to: **Suryaraj8147@gmail.com**

Include:
- A description of the vulnerability.
- Steps to reproduce.
- The potential impact.
- Any suggested fixes (optional but appreciated).

### What to Expect

- Acknowledgment within 48 hours.
- Investigation and status updates.
- Credit in the fix commit unless you prefer to remain anonymous.

## Responsible Disclosure

- Do not publicly disclose before a fix is deployed.
- Do not exploit beyond what is necessary to demonstrate the issue.
- Act in good faith to avoid data destruction or service disruption.

We will not pursue legal action against researchers who follow this policy.

## Scope

**In scope:**
- Auth bypass or privilege escalation (e.g. upgrading account plan without payment)
- XSS in resume rendering, PDF export, or HTML export
- Data leakage through exported files or share links
- Stripe webhook bypass or billing manipulation
- RLS bypass on Supabase tables
- Groq API key exfiltration from sessionStorage
- File import parsing vulnerabilities (DOCX, PDF, HTML, MD, TXT)

**Out of scope:**
- Vulnerabilities in third-party services (Groq, Stripe, Supabase infrastructure)
- Issues requiring physical device access
- Browser-specific bugs not caused by ResumeBuildz code
- Social engineering attacks

## Disclosure Timeline

| Day | Action |
|---|---|
| 0 | Vulnerability report received |
| 1–2 | Acknowledgment sent |
| 7 | Initial assessment and severity classification |
| 30 | Fix developed and tested |
| 45 | Fix deployed to production |
| 90 | Public disclosure (coordinated with reporter) |

---

Last updated: 2026-05-06
