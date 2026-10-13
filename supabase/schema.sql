-- FD Events — Supabase schema
-- Run this in the Supabase SQL editor, then set NEXT_PUBLIC_SUPABASE_URL and
-- SUPABASE_SERVICE_ROLE_KEY. The site switches from /content to Supabase automatically.

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  youtube_id text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  event text not null default '',
  rating smallint not null default 5 check (rating between 1 and 5),
  quote text not null,
  created_at timestamptz not null default now()
);

-- Public can read; only the server (service role key) can write.
alter table public.gallery_items enable row level security;
alter table public.videos enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "Public read gallery" on public.gallery_items;
create policy "Public read gallery" on public.gallery_items for select using (true);

drop policy if exists "Public read videos" on public.videos;
create policy "Public read videos" on public.videos for select using (true);

drop policy if exists "Public read reviews" on public.reviews;
create policy "Public read reviews" on public.reviews for select using (true);

-- Public storage bucket for uploaded photos
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;
