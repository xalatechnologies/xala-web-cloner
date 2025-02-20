-- Verify config values
select * from public.config where key in ('edge_function_key', 'admin_email');

-- Update Edge Function key with the correct service role key
insert into public.config (key, value)
values (
  'edge_function_key',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dnBzamV1Y2V3bmVuamV2ZmhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzg1NDYwNiwiZXhwIjoyMDUzNDMwNjA2fQ.CkwwsUflQQQawtxCaxL2_CxYYjNnjnQWIIczlH15OeU'
)
on conflict (key) do update 
set value = excluded.value, updated_at = now();

-- Update admin email if needed
insert into public.config (key, value)
values ('admin_email', 'info@xala.no')
on conflict (key) do update 
set value = excluded.value, updated_at = now(); 