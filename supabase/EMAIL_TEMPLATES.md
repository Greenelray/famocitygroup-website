# Famocity Email Templates

These files are ready to use for Supabase hosted auth emails:

- `supabase/email-templates/confirmation.html`
- `supabase/email-templates/recovery.html`
- `supabase/email-templates/magic-link.html`

## How to apply them in Supabase

1. Open Supabase Dashboard.
2. Go to `Authentication`.
3. Open `Email Templates`.
4. Open the matching template type.
5. Paste the HTML content from the file.
6. Update the subject line if you want.
7. Save.

Recommended subjects:

- Confirmation: `Confirm your Famocity account`
- Recovery: `Reset your Famocity password`
- Magic Link: `Your Famocity sign-in link`

## Receipt Email

The website-side branded receipt email template is available in:

- `lib/email-templates.ts`

This template is not sent automatically yet. To send it, the site still needs an email provider such as Resend, SendGrid, or SMTP connected in production.
