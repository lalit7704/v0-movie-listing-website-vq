-- Voting page (/vote). Accounts here are separate from Supabase auth users:
-- voters sign up with phone + password and log in with password + SMS OTP.
-- Only the server (service role) reads or writes these tables.
--
-- Server env vars: VOTE_OWNER_PHONE (owner's mobile, comma separated for more than one),
-- SUPABASE_SERVICE_ROLE_KEY, and an SMS provider:
--   VOTE_SMS_PROVIDER=fast2sms + FAST2SMS_API_KEY, or
--   VOTE_SMS_PROVIDER=twilio + TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM.
-- Without a provider, local dev shows the OTP on screen; production refuses to send.

create extension if not exists pgcrypto;

create table if not exists public.vote_users (
  id uuid primary key default gen_random_uuid(),
  phone text not null unique check (phone ~ '^\+91[6-9][0-9]{9}$'),
  name text not null check (char_length(name) between 2 and 60),
  password_hash text not null,
  role text not null default 'voter' check (role in ('voter', 'manager')),
  failed_logins integer not null default 0,
  locked_until timestamptz,
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.vote_otp_challenges (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  purpose text not null check (purpose in ('signup', 'login')),
  code_hash text not null,
  payload jsonb not null default '{}'::jsonb,
  attempts integer not null default 0,
  ip_hash text,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists vote_otp_challenges_phone_idx
  on public.vote_otp_challenges (phone, created_at desc);
create index if not exists vote_otp_challenges_ip_idx
  on public.vote_otp_challenges (ip_hash, created_at desc);
create index if not exists vote_otp_challenges_created_idx
  on public.vote_otp_challenges (created_at);

create table if not exists public.vote_sessions (
  token_hash text primary key,
  user_id uuid not null references public.vote_users(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists vote_sessions_user_idx on public.vote_sessions (user_id);

create table if not exists public.vote_polls (
  id uuid primary key default gen_random_uuid(),
  question text not null check (char_length(question) between 3 and 200),
  description text check (char_length(description) <= 500),
  status text not null default 'open' check (status in ('open', 'closed')),
  ends_at timestamptz,
  created_by uuid references public.vote_users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.vote_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.vote_polls(id) on delete cascade,
  label text not null check (char_length(label) between 1 and 120),
  position integer not null default 0,
  vote_count integer not null default 0,
  unique (poll_id, id)
);

-- One vote per user per poll; the composite key makes sure the option belongs to the poll.
create table if not exists public.vote_votes (
  poll_id uuid not null,
  option_id uuid not null,
  user_id uuid not null references public.vote_users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (poll_id, user_id),
  foreign key (poll_id, option_id) references public.vote_options(poll_id, id) on delete cascade
);

create index if not exists vote_votes_user_idx on public.vote_votes (user_id);

-- Keeps vote_options.vote_count in step, so results never need to read every vote row.
create or replace function public.vote_count_change()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    update public.vote_options set vote_count = vote_count + 1 where id = new.option_id;
  elsif tg_op = 'DELETE' then
    update public.vote_options set vote_count = greatest(vote_count - 1, 0) where id = old.option_id;
  end if;
  return null;
end;
$$;

drop trigger if exists vote_votes_count on public.vote_votes;
create trigger vote_votes_count
  after insert or delete on public.vote_votes
  for each row execute procedure public.vote_count_change();

alter table public.vote_users enable row level security;
alter table public.vote_otp_challenges enable row level security;
alter table public.vote_sessions enable row level security;
alter table public.vote_polls enable row level security;
alter table public.vote_options enable row level security;
alter table public.vote_votes enable row level security;

revoke all on public.vote_users, public.vote_otp_challenges, public.vote_sessions,
  public.vote_polls, public.vote_options, public.vote_votes from anon, authenticated;
revoke all on function public.vote_count_change() from public, anon, authenticated;
