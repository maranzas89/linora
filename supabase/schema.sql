-- Linora: minimal schema for MVP
-- Run this in your Supabase SQL Editor

create table if not exists analyses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  job_title text not null,
  company text not null,
  job_description text not null,
  resume_text text not null,
  result jsonb not null,
  created_at timestamptz default now() not null
);

-- RLS: users can only access their own analyses
alter table analyses enable row level security;

create policy "Users can insert their own analyses"
  on analyses for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own analyses"
  on analyses for select
  using (auth.uid() = user_id);

-- Index for fast dashboard queries
create index if not exists idx_analyses_user_created
  on analyses (user_id, created_at desc);
