-- Create enum for legal content types
CREATE TYPE legal_content_type AS ENUM ('privacy', 'terms', 'cookies');

-- Create legal_sections table
CREATE TABLE legal_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type legal_content_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    language VARCHAR(2) NOT NULL DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create legal_content table
CREATE TABLE legal_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type legal_content_type NOT NULL,
    section_id UUID REFERENCES legal_sections(id) ON DELETE CASCADE,
    title TEXT,
    content TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    language VARCHAR(2) NOT NULL DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add indexes for better performance
CREATE INDEX idx_legal_sections_type_language ON legal_sections(type, language);
CREATE INDEX idx_legal_content_section_id ON legal_content(section_id);
CREATE INDEX idx_legal_content_type_language ON legal_content(type, language);

-- Add RLS policies
ALTER TABLE legal_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_content ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow anonymous read access to legal_sections"
    ON legal_sections FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow anonymous read access to legal_content"
    ON legal_content FOR SELECT
    TO anon
    USING (true);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_legal_sections_updated_at
    BEFORE UPDATE
    ON legal_sections
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_legal_content_updated_at
    BEFORE UPDATE
    ON legal_content
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();