-- Add translations column to sections table
ALTER TABLE public.sections
ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}'::jsonb;

-- Add a comment to explain the column's purpose
COMMENT ON COLUMN public.sections.translations IS 'Stores key-value pairs of translation strings for the section';

-- Create an index for better performance when querying translations
CREATE INDEX IF NOT EXISTS idx_sections_translations ON public.sections USING GIN (translations);

-- Grant necessary permissions
GRANT ALL ON public.sections TO authenticated;
GRANT ALL ON public.sections TO service_role;
