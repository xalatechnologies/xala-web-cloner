-- First, let's try a simple insert with a small embedding
-- Create a test embedding array with 1536 dimensions
WITH test_array AS (
  SELECT array_fill(0::float8, ARRAY[1536]) as arr
)
INSERT INTO documents (content, type, metadata, embedding)
SELECT 
  'This is a test document',
  'company_info',
  '{"source": "test", "title": "Test Document"}'::jsonb,
  arr::vector
FROM test_array;

-- Verify the insert
SELECT id, content, type, metadata, created_at
FROM documents 
ORDER BY created_at DESC 
LIMIT 1;
