-- Create the gdpr_notifications table
create table if not exists public.gdpr_notifications (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    content text not null,
    button_text text not null,
    is_active boolean default true,
    language text references supported_language not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.gdpr_notifications enable row level security;

create policy "Allow public read access to gdpr_notifications"
    on public.gdpr_notifications for select
    to public
    using (true);

create policy "Allow authenticated users to manage gdpr_notifications"
    on public.gdpr_notifications for all
    to authenticated
    using (true)
    with check (true);

-- Create a function to automatically update the updated_at column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create a trigger to automatically update the updated_at column
create trigger handle_updated_at
    before update on public.gdpr_notifications
    for each row
    execute function public.handle_updated_at();
