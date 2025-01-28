-- Create enum for message types
CREATE TYPE message_type AS ENUM ('user', 'assistant');

-- Create enum for message status
CREATE TYPE message_status AS ENUM ('sending', 'sent', 'error');

-- Create the chat_messages table
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    type message_type NOT NULL,
    status message_status NOT NULL DEFAULT 'sending',
    language VARCHAR(2) NOT NULL DEFAULT 'en',
    sources JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add RLS policies
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow anonymous read access"
    ON chat_messages FOR SELECT
    TO anon
    USING (true);

-- Allow anonymous insert
CREATE POLICY "Allow anonymous insert"
    ON chat_messages FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow anonymous update of status
CREATE POLICY "Allow anonymous update status"
    ON chat_messages FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_chat_messages_updated_at
    BEFORE UPDATE
    ON chat_messages
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
