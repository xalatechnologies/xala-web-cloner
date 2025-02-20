-- First, create the http schema if it doesn't exist
create schema if not exists http;

-- Enable the HTTP extension in the http schema
create extension if not exists http with schema http;

-- Create the webhook function
create or replace function public.handle_contact_notification()
returns trigger
security definer
set search_path = public, http
language plpgsql
as $$
declare
  webhook_url text := (select value::text from public.config where key = 'edge_function_url');
begin
  -- Make HTTP request to the Edge Function
  perform
    http.post(
      url := webhook_url || '/contact-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || (select value::text from public.config where key = 'edge_function_key')
      ),
      body := jsonb_build_object(
        'type', TG_OP,
        'record', row_to_json(NEW)
      )
    );
  return NEW;
exception
  when others then
    -- Log error but don't fail the transaction
    raise warning 'Failed to send webhook: %', SQLERRM;
    return NEW;
end;
$$;

-- Create the trigger
drop trigger if exists contact_notification_trigger on public.contact_submissions;
create trigger contact_notification_trigger
  after insert
  on public.contact_submissions
  for each row
  execute function public.handle_contact_notification(); 