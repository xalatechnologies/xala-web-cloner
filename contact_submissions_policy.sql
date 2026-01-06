-- Enable RLS on the table
alter table "contact_submissions" enable row level security;

-- Create a policy that allows anonymous users to insert
create policy "Allow anonymous submissions"
  on "contact_submissions"
  for insert
  to anon
  with check (true);
