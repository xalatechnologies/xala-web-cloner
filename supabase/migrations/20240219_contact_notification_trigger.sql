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

-- Create the config table if it doesn't exist
create table if not exists public.config (
  key text primary key,
  value text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create a function to log messages with timestamp
create or replace function public.log_message(message text)
returns void
language plpgsql
as $$
begin
  raise notice '[%] %', now(), message;
end;
$$;

-- Function to retry sending pending contact submissions
create or replace function public.handle_contact_notification()
returns trigger
security definer
language plpgsql
as $$
declare
  v_request_body jsonb;
  v_request_url text;
  v_error_details text;
begin
  -- Log function start
  raise notice 'Starting contact notification for ID: %', NEW.id;

  -- Prepare request data
  v_request_url := 'https://ttvpsjeucewnenjevfhh.supabase.co/functions/v1/contact-notification';
  v_request_body := jsonb_build_object(
    'type', TG_OP,
    'record', row_to_json(NEW)
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
    where id = NEW.id;
    raise notice 'Successfully queued notification for ID: %', NEW.id;

  exception
    when others then
      -- Log error details
      GET STACKED DIAGNOSTICS v_error_details = MESSAGE_TEXT;
      raise notice 'Error processing submission: % (State: %)', 
        SQLERRM, 
        SQLSTATE;

      -- Update status to error
      update public.contact_submissions
      set 
        status = 'error',
        error_details = v_error_details,
        updated_at = now()
      where id = NEW.id;
  end;

  return NEW;
end;
$$;

-- Recreate the trigger
drop trigger if exists contact_notification_trigger on public.contact_submissions;
create trigger contact_notification_trigger
  after insert
  on public.contact_submissions
  for each row
  execute function public.handle_contact_notification(); 