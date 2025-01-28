-- Enable the pgvector extension
create extension if not exists vector;

-- Create documents table with vector support
create table if not exists documents (
  id bigint primary key generated always as identity,
  content text,
  metadata jsonb,
  embedding vector(1536), -- OpenAI embeddings are 1536 dimensions
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a function to match documents based on embedding similarity
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
end;
$$;
