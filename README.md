# Portal Warga Starter

Next.js 15 + TypeScript + Tailwind CSS 4 + Supabase starter for a modern residential community portal.

## Run locally
1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`, then fill your Supabase URL and anon/publishable key.
4. In Supabase SQL Editor run `supabase/schema.sql`.
5. In Supabase Authentication create an email/password user. Find its UUID, then run `insert into public.admin_users(user_id) values ('YOUR_USER_UUID');` in SQL Editor. Never expose service role keys in the frontend.
6. Run `npm run dev`, visit http://localhost:3000.

## Current implementation
- Responsive homepage and mobile navigation.
- Placeholder public detail pages.
- Supabase email/password admin login.
- Admin route checks authenticated user and admin_users membership.
- Supabase auth session refresh middleware.
- Starter RLS schema for announcements, events, finance, suggestions.

## Next iteration
- Full admin CRUD screens, photo storage, finance reports, public live data, meeting notes, ronda scheduling, protected suggestions submission with rate limiting, logout, and automated tests.

**Note:** The homepage contains sample agenda items and explanatory copy, not real community data. Admin cards are placeholders. Do not use for production until remaining features and session handling are completed.
