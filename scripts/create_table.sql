-- Set search path to public schema
set search_path to public;

-- Drop existing objects
drop function if exists insert_document cascade;
drop function if exists match_documents cascade;
drop function if exists insert_document_raw cascade;
drop table if exists documents cascade;

-- Enable the pgvector extension if not already enabled
create extension if not exists vector;

-- Create documents table with vector support
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  type text not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding vector(1536), -- OpenAI embeddings are 1536 dimensions
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create raw insert function
create or replace function public.insert_document_raw(
  p_content text,
  p_type text,
  p_metadata text,
  p_embedding float[]
) returns uuid as $$
declare
  v_id uuid;
begin
  insert into public.documents (content, type, metadata, embedding)
  values (p_content, p_type, p_metadata::jsonb, p_embedding::vector)
  returning id into v_id;
  return v_id;
end;
$$ language plpgsql security definer;

-- Create stored procedure for document insertion
create or replace function public.insert_document(
  p_content text,
  p_type text,
  p_metadata jsonb,
  p_embedding vector(1536)
) returns void as $$
begin
  insert into public.documents (content, type, metadata, embedding)
  values (p_content, p_type, p_metadata, p_embedding);
end;
$$ language plpgsql security definer;

-- Create similarity search function
create or replace function public.match_documents(
  query_embedding vector(1536),
  match_threshold float default 0.7,
  match_count int default 5
) returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
) language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from public.documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Grant access to authenticated users
grant select on public.documents to authenticated;
grant insert, update on public.documents to authenticated;
grant execute on function public.insert_document(text, text, jsonb, vector) to authenticated;
grant execute on function public.insert_document_raw(text, text, text, float[]) to authenticated;
grant execute on function public.match_documents(vector, float, int) to authenticated;

-- Create index for faster similarity search
create index on public.documents using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- Commit the transaction to ensure all changes are applied
commit;

-- Force PostgREST to reload its schema cache
notify pgrst, 'reload schema';

-- Additional step to ensure PostgREST picks up the changes
select pg_sleep(1);
notify pgrst, 'reload schema';
