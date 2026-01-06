-- Enable debug logging
set client_min_messages to 'debug';

-- Create pg_net extension for asynchronous HTTP requests
create extension if not exists pg_net;

-- Create the http_header type if it doesn't exist
do $$
begin
  if not exists (select 1 from pg_type where typname = 'http_header') then
    create type http_header as (
      field_name text,
      field_value text
    );
  end if;
end;
$$;

-- Show current status of submissions
select 
  status,
  count(*) as count,
  max(error_details) as latest_error
from public.contact_submissions
group by status;

-- Insert a test submission
insert into public.contact_submissions 
  (name, email, subject, message, language)
values
  ('Test User', 'test@example.com', 'Test Subject', 'This is a test message', 'en')
returning *;

-- Wait a moment for trigger to complete
select pg_sleep(2);

-- Show status of test submission
select 
  id,
  status,
  error_details,
  created_at,
  updated_at
from public.contact_submissions
where created_at > now() - interval '1 minute'
order by created_at desc;

-- Show all error details for debugging
select 
  id,
  status,
  error_details,
  created_at,
  updated_at
from public.contact_submissions
where status = 'error'
order by updated_at desc
limit 5;

-- Test the trigger function directly
do $$
declare
  v_submission record;
  v_request_body jsonb;
  v_request_url text;
  v_error_details text;
begin
  -- Get the latest submission
  select * into v_submission
  from public.contact_submissions
  where created_at > now() - interval '1 minute'
  limit 1;

  -- Prepare request data
  v_request_url := 'https://ttvpsjeucewnenjevfhh.supabase.co/functions/v1/contact-notification';
  v_request_body := jsonb_build_object(
    'type', 'INSERT',
    'record', row_to_json(v_submission)
  );

  -- Log request details
  raise notice 'Testing direct HTTP request:';
  raise notice 'URL: %', v_request_url;
  raise notice 'Body: %', v_request_body;

  -- Make the HTTP request using pg_net
  perform net.http_post(
    url := v_request_url,
    body := v_request_body,
    params := '{}'::jsonb,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dnBzamV1Y2V3bmVuamV2ZmhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzg1NDYwNiwiZXhwIjoyMDUzNDMwNjA2fQ.CkwwsUflQQQawtxCaxL2_CxYYjNnjnQWIIczlH15OeU'
    ),
    timeout_milliseconds := 10000
  );

  -- Log completion
  raise notice 'Request queued successfully';
end;
$$;

-- Show final status counts
select 'Final Status Counts:' as step, 
       status, 
       count(*),
       max(error_details) as latest_error
from public.contact_submissions 
group by status; 