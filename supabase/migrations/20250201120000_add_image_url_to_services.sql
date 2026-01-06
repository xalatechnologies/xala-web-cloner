-- Add image_url column to services table
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add comment for documentation
COMMENT ON COLUMN services.image_url IS 'URL for AI-generated service image';

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_services_image_url ON services(image_url);