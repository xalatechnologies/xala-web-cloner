-- Add error_details column to contact_submissions table
alter table public.contact_submissions 
add column if not exists error_details text;

-- Update existing error records with a default message
update public.contact_submissions
set error_details = 'Previous error - details not captured'
where status = 'error' and error_details is null; 