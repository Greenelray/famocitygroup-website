create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text not null unique,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_slug text not null,
  course_title text not null,
  paystack_reference text not null unique,
  amount_naira integer not null,
  currency text not null default 'NGN',
  status text not null default 'success',
  paid_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  course_slug text not null,
  purchased_via text default 'paystack',
  purchase_id uuid references public.purchases (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, course_slug)
);

create or replace function public.handle_profile_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.handle_profile_updated_at();

alter table public.profiles enable row level security;
alter table public.purchases enable row level security;
alter table public.enrollments enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can view own purchases" on public.purchases;
create policy "Users can view own purchases"
on public.purchases
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own purchases" on public.purchases;
create policy "Users can insert own purchases"
on public.purchases
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can view own enrollments" on public.enrollments;
create policy "Users can view own enrollments"
on public.enrollments
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own enrollments" on public.enrollments;
create policy "Users can insert own enrollments"
on public.enrollments
for insert
to authenticated
with check (auth.uid() = user_id);
