-- Drop functions first
DROP FUNCTION IF EXISTS encrypt_api_key(text);
DROP FUNCTION IF EXISTS decrypt_api_key(text);

-- Drop tables
DROP TABLE IF EXISTS api_keys CASCADE;
DROP TABLE IF EXISTS encryption_keys CASCADE;

-- Drop policies
DROP POLICY IF EXISTS "Allow authenticated read access to api_keys" ON api_keys;
