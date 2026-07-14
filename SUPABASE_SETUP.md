# Onemovie Login Setup

The application code is ready for optional Google login. Complete these dashboard steps once.

## 1. Create the database

1. Create a project at `https://supabase.com/dashboard`.
2. Open **SQL Editor**.
3. Run `supabase/migrations/202607140001_user_accounts.sql`.

The migration creates profiles, synced wishlists, watch history, activity, movie requests,
notification preferences, and notifications. Row Level Security limits every user to their own data.

## 2. Add application keys

Copy the Project URL and publishable key from the Supabase **Connect** dialog into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
```

Add the same variables to the production hosting provider. Never put a Supabase secret or
service-role key in a `NEXT_PUBLIC_` variable.

## 3. Configure Google login

1. In Google Auth Platform, create a **Web application** OAuth client.
2. Add `https://www.onemovie.in` and `http://localhost:3001` as authorized origins.
3. Copy the callback URL shown on Supabase **Authentication > Providers > Google** into
   Google's authorized redirect URIs. It normally looks like
   `https://YOUR_PROJECT.supabase.co/auth/v1/callback`.
4. Put the Google Client ID and Client Secret into the Supabase Google provider and enable it.
5. In Supabase **Authentication > URL Configuration**, set the Site URL to
   `https://www.onemovie.in` and allow these redirects:
   - `https://www.onemovie.in/auth/callback`
   - `http://localhost:3001/auth/callback`

Restart the site after adding environment variables.

## 4. Sending notification emails

The dashboard stores each user's notification choices and the `notifications` table is ready.
Actual outbound email requires a mail provider or a scheduled Supabase Edge Function. Keep its
secret server-side and select only users whose corresponding preference is enabled.
