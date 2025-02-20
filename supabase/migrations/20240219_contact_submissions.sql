-- Create enum for language
create type public.contact_language as enum ('en', 'no');

-- Create the contact submissions table
create table if not exists public.contact_submissions (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text not null,
    subject text not null,
    message text not null,
    language contact_language not null,
    status text default 'pending',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Add RLS policies
alter table public.contact_submissions enable row level security;

-- Allow anonymous inserts
create policy "Allow anonymous inserts"
    on public.contact_submissions
    for insert
    to anon
    with check (true);

-- Allow authenticated reads
create policy "Allow authenticated reads"
    on public.contact_submissions
    for select
    to authenticated
    using (true);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger set_updated_at
    before update on public.contact_submissions
    for each row
    execute function public.handle_updated_at(); 