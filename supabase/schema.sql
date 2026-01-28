-- PlanMate Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Interviews table
create table if not exists public.interviews (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'in_progress' check (status in ('in_progress', 'completed')),
  answers jsonb default '{}'::jsonb,
  business_plan text,
  email text
);

-- Enable Row Level Security
alter table public.interviews enable row level security;

-- Policy: Allow anonymous inserts (for MVP - no auth required)
create policy "Allow anonymous inserts" on public.interviews
  for insert with check (true);

-- Policy: Allow anonymous updates (for MVP)
create policy "Allow anonymous updates" on public.interviews
  for update using (true);

-- Policy: Allow anonymous selects (for MVP)
create policy "Allow anonymous selects" on public.interviews
  for select using (true);

-- Index for faster queries
create index if not exists interviews_status_idx on public.interviews(status);
create index if not exists interviews_created_at_idx on public.interviews(created_at desc);

-- Function to auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger for updated_at
drop trigger if exists on_interviews_updated on public.interviews;
create trigger on_interviews_updated
  before update on public.interviews
  for each row execute function public.handle_updated_at();
