alter table public.profiles
  add column if not exists premium_plan_id text,
  add column if not exists premium_expiry timestamptz,
  add column if not exists email text;

create unique index if not exists profiles_email_unique_idx
  on public.profiles (lower(email))
  where email is not null;