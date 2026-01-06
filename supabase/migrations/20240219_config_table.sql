-- Create the config table if it doesn't exist
create table if not exists public.config (
  key text primary key,
  value text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create an update trigger for updated_at
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_config_updated_at
  before update
  on public.config
  for each row
  execute function public.update_updated_at_column();

-- Insert initial configuration
insert into public.config (key, value)
values
  ('edge_function_url', 'https://ttvpsjeucewnenjevfhh.supabase.co/functions/v1'),
  ('edge_function_key', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dnBzamV1Y2V3bmVuamV2ZmhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzg1NDYwNiwiZXhwIjoyMDUzNDMwNjA2fQ.CkwwsUflQQQawtxCaxL2_CxYYjNnjnQWIIczlH15OeU'),
  ('admin_email', 'Info@xala.no')
on conflict (key) do update
set value = excluded.value;