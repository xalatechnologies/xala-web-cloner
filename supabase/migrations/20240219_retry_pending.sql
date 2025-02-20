-- First, create the http schema if it doesn't exist
create schema if not exists http;

-- Drop and recreate the HTTP extension to ensure it's properly installed
drop extension if exists http cascade;
create extension if not exists http with schema http;

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

-- Function to get a summary of contact submissions by status
create or replace function public.get_submission_status_summary()
returns table (
  status text,
  count bigint,
  latest_error text
)
language sql
security definer
as $$
  select 
    status,
    count(*),
    max(error_details) as latest_error
  from public.contact_submissions
  group by status
  order by count(*) desc;
$$;

-- Grant execute permission to authenticated users
grant execute on function public.get_submission_status_summary() to authenticated;

-- Function to retry sending pending contact submissions
create or replace function public.retry_pending_notifications()
returns setof uuid
language plpgsql
security definer
as $$
declare
  v_submission record;
  v_request_body jsonb;
  v_request_url text;
  v_error_details text;
begin
  -- Log function start
  raise notice 'Starting retry of pending notifications';

  -- Loop through all pending submissions
  for v_submission in 
    select * from public.contact_submissions 
    where status = 'pending' or status = 'error'
    order by created_at asc
  loop
    -- Log current submission
    raise notice 'Processing submission ID: %', v_submission.id;

    -- Prepare request data
    v_request_url := 'https://ttvpsjeucewnenjevfhh.supabase.co/functions/v1/contact-notification';
    v_request_body := jsonb_build_object(
      'type', 'INSERT',
      'record', row_to_json(v_submission)
    );

    -- Log request details
    raise notice 'Request URL: %', v_request_url;
    raise notice 'Request Body: %', v_request_body;

    -- Make the HTTP request using pg_net
    begin
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

      -- Update submission status to pending since pg_net is asynchronous
      update public.contact_submissions
      set 
        status = 'pending',
        error_details = null,
        updated_at = now()
      where id = v_submission.id;
      raise notice 'Successfully queued notification for ID: %', v_submission.id;

      -- Return the processed submission ID
      return next v_submission.id;

    exception
      when others then
        -- Log error details
        GET STACKED DIAGNOSTICS v_error_details = MESSAGE_TEXT;
        raise notice 'Error processing submission %: % (State: %, Details: %)', 
          v_submission.id,
          SQLERRM, 
          SQLSTATE,
          v_error_details;

        -- Update status to error
        update public.contact_submissions
        set 
          status = 'error',
          error_details = v_error_details,
          updated_at = now()
        where id = v_submission.id;

        -- Continue with next submission
        continue;
    end;

    -- Add a small delay between requests to avoid rate limiting
    perform pg_sleep(1);
  end loop;

  return;
end;
$$;

-- Grant execute permission to authenticated users
grant execute on function public.retry_pending_notifications() to authenticated;

-- First show current status
select status, count(*), max(error_details) as latest_error
from public.contact_submissions
group by status
order by count(*) desc;

-- Retry all pending submissions
select id, status, error_details
from public.contact_submissions
where id in (
    select retry_pending_notifications()
);

-- Show final status
select status, count(*), max(error_details) as latest_error
from public.contact_submissions
group by status
order by count(*) desc; 