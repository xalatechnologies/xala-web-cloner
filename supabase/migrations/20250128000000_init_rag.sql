-- Enable the pgvector extension to work with embeddings
create extension if not exists vector;

-- Create an enum for document types
create type document_type as enum ('reference', 'case_study', 'company_info');

-- Create the documents table
create table if not exists documents (
    id uuid primary key default gen_random_uuid(),
    content text not null,
    metadata jsonb not null default '{}'::jsonb,
    embedding vector(1536), -- OpenAI embeddings are 1536 dimensions
    type document_type not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a function to search for similar documents
create or replace function match_documents (
    query_embedding vector(1536),
    match_threshold float default 0.7,
    match_count int default 5
) returns table (
    id uuid,
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
    order by documents.embedding <=> query_embedding
    limit match_count;
end;
$$;

-- Create a function to update embeddings
create or replace function update_document_embedding(
    document_id uuid,
    new_embedding vector(1536)
) returns void
language plpgsql
as $$
begin
    update documents
    set 
        embedding = new_embedding,
        updated_at = timezone('utc'::text, now())
    where id = document_id;
end;
$$;

-- Create indexes for better performance
create index on documents using ivfflat (embedding vector_cosine_ops)
    with (lists = 100);

-- Create a trigger to update the updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger documents_updated_at
    before update on documents
    for each row
    execute function update_updated_at_column();

-- Create RLS policies
alter table documents enable row level security;

-- Allow read access to all authenticated users
create policy "Allow read access to all authenticated users"
    on documents for select
    to authenticated
    using (true);

-- Allow insert/update access only to service role
create policy "Allow insert/update access only to service role"
    on documents for insert
    to service_role
    using (true);

create policy "Allow update access only to service role"
    on documents for update
    to service_role
    using (true);
