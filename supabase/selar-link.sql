alter table public.courses
add column if not exists selar_url text;

alter table public.courses
add column if not exists lesson_count integer not null default 0;
