# Chadaver.gg Supabase Admin App

This is a real multi-file Vite + React + TypeScript app with:
- Supabase magic-link auth
- admin allowlist using `VITE_ADMIN_ALLOWLIST`
- protected `/admin` route
- public submit-guide form
- pending submission queue stored locally for scaffold mode

## Setup

1. Copy `.env.example` to `.env`
2. Verify these values:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_ADMIN_ALLOWLIST`
3. Install and run:

```bash
npm install
npm run dev
```

## Important

This scaffold protects the admin experience in the app and uses Supabase auth for identity.
For production-grade data security, move guide submissions from local storage into Supabase tables and enforce RLS policies there.

## Cloudflare Pages

- Root directory: blank
- Build command: `npm run build`
- Build output directory: `dist`

## Required env vars in Cloudflare

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_ADMIN_ALLOWLIST`
