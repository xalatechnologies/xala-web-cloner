-- Create API keys table
create table api_keys (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  key_value text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table api_keys enable row level security;

-- Create policy for secure access
create policy "Allow authenticated read access to api_keys"
  on api_keys for select
  to authenticated
  using (true);

-- Create a secure key for encryption
create table if not exists encryption_keys (
  id uuid default uuid_generate_v4() primary key,
  key_value text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default encryption key if not exists
insert into encryption_keys (key_value)
select 'xala-secure-encryption-key-2025'
where not exists (select 1 from encryption_keys);

-- Function to encrypt API keys
create or replace function encrypt_api_key(key_value text) returns text as $$
declare
  encryption_key text;
begin
  select key_value into encryption_key from encryption_keys limit 1;
  return encode(encrypt_iv(key_value::bytea, encryption_key::bytea, '0123456789abcdef'::bytea, 'aes-cbc/pad:pkcs'), 'base64');
end;
$$ language plpgsql security definer;

-- Function to decrypt API keys
create or replace function decrypt_api_key(encrypted_value text) returns text as $$
declare
  encryption_key text;
begin
  select key_value into encryption_key from encryption_keys limit 1;
  return convert_from(decrypt_iv(decode(encrypted_value, 'base64'), encryption_key::bytea, '0123456789abcdef'::bytea, 'aes-cbc/pad:pkcs'), 'utf8');
end;
$$ language plpgsql security definer;
