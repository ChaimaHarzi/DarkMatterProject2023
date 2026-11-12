# Dark Matter

Website of Dark Matter — built with Next.js 15 (App Router), React 19 and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Contact form email

The contact form posts to `/api/contact`, which sends the message by SMTP with
[Nodemailer](https://nodemailer.com/). The visitor's address is set as **Reply-To**, so you can
answer directly from your mailbox.

1. Copy `.env.example` to `.env.local`.
2. Fill in an SMTP account. With Gmail: enable 2-Step Verification, create an
   [App Password](https://myaccount.google.com/apppasswords) and use it as `SMTP_PASS`.
3. Restart `npm run dev`.

`CONTACT_TO_EMAIL` sets the recipient (defaults to `chaima.harzi@etudiant-fst.utm.tn`).
When deploying (e.g. Vercel), add the same variables in the hosting provider's environment settings.

Built-in protections: server-side validation, a hidden honeypot field against bots, and a basic
rate limit (5 messages per 10 minutes per IP).

## Project structure

```
src/
  app/
    page.tsx              Home page (sections in order)
    api/contact/route.ts  Contact form email endpoint
    components/           Header, hero, services, work, partners, contact, footer…
    privacy/ terms/       Legal pages
    not-found.tsx         Custom 404
  lib/
    contact.ts            Validation rules shared by the form and the API
    nav.ts                Navigation links
```
