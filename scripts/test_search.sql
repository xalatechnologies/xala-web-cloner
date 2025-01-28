-- Test similarity search with a sample query
WITH sample_embedding AS (
  SELECT embedding 
  FROM documents 
  WHERE content ILIKE '%xala%' 
  LIMIT 1
)
SELECT 
  content,
  type,
  metadata,
  1 - (embedding <=> (SELECT embedding FROM sample_embedding)) as similarity
FROM documents
WHERE embedding IS NOT NULL
ORDER BY embedding <=> (SELECT embedding FROM sample_embedding)
LIMIT 5;
