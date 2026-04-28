create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tagline text not null,
  description text not null,
  price_naira integer not null default 0,
  level text not null,
  duration text not null,
  format text not null,
  hero_image text not null,
  thumbnail text not null,
  outcomes jsonb not null default '[]'::jsonb,
  audience jsonb not null default '[]'::jsonb,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  slug text not null,
  title text not null,
  summary text not null,
  position integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  unique (course_id, slug)
);

create table if not exists public.course_lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.course_modules (id) on delete cascade,
  slug text not null,
  title text not null,
  duration text not null,
  preview boolean not null default false,
  summary text not null,
  video_url text not null,
  resources jsonb not null default '[]'::jsonb,
  body jsonb not null default '[]'::jsonb,
  position integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  unique (module_id, slug)
);

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at
before update on public.courses
for each row
execute function public.handle_profile_updated_at();

alter table public.courses enable row level security;
alter table public.course_modules enable row level security;
alter table public.course_lessons enable row level security;

drop policy if exists "Anyone can view published courses" on public.courses;
create policy "Anyone can view published courses"
on public.courses
for select
to anon, authenticated
using (is_published = true);

drop policy if exists "Anyone can view modules for published courses" on public.course_modules;
create policy "Anyone can view modules for published courses"
on public.course_modules
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.courses
    where public.courses.id = course_modules.course_id
      and public.courses.is_published = true
  )
);

drop policy if exists "Anyone can view lessons for published courses" on public.course_lessons;
create policy "Anyone can view lessons for published courses"
on public.course_lessons
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.course_modules
    join public.courses on public.courses.id = public.course_modules.course_id
    where public.course_modules.id = course_lessons.module_id
      and public.courses.is_published = true
  )
);
