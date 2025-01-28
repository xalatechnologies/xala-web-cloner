const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

interface DocumentInfo {
  path: string;
  type: 'company_info' | 'reference' | 'case_study';
  metadata: Record<string, any>;
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DOCUMENTS: DocumentInfo[] = [
  {
    path: '../public/docs/company_profile.md',
    type: 'company_info',
    metadata: {
      source: 'company_profile',
      title: 'Xala Technologies Company Profile',
      author: 'Ibrahim Rahmani'
    }
  },
  {
    path: '../public/docs/references.md',
    type: 'reference',
    metadata: {
      source: 'references',
      title: 'Client References and Case Studies'
    }
  },
  {
    path: '../public/docs/services.md',
    type: 'company_info',
    metadata: {
      source: 'services',
      title: 'Xala Technologies Services'
    }
  }
];

async function createEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text.replace(/\n/g, ' '),
  });
  return response.data[0].embedding;
}

function chunkDocument(content: string, maxChunkSize: number = 1000): string[] {
  const paragraphs = content.split('\n\n');
  const chunks: string[] = [];
  let currentChunk = '';

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = '';
    }
    currentChunk += paragraph + '\n\n';
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

async function uploadDocument(docInfo: DocumentInfo): Promise<void> {
  try {
    const content = fs.readFileSync(path.join(__dirname, docInfo.path), 'utf-8');
    const chunks = chunkDocument(content);
    
    console.log(`Processing ${docInfo.path} - ${chunks.length} chunks`);

    for (const [index, chunk] of chunks.entries()) {
      const embedding = await createEmbedding(chunk);
      
      // Using direct table insert with proper vector casting
      const { data, error } = await supabase
        .from('documents')
        .insert({
          content: chunk,
          type: docInfo.type,
          metadata: {
            ...docInfo.metadata,
            chunk_index: index,
            total_chunks: chunks.length
          },
          embedding: `[${embedding.join(',')}]`
        })
        .select('id');

      if (error) {
        console.error('Error details:', error);
        throw error;
      }

      if (data) {
        console.log(`Successfully uploaded chunk ${index + 1}/${chunks.length} for ${docInfo.path} with id ${data[0].id}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${docInfo.path}:`, error);
  }
}

async function uploadAllDocuments(): Promise<void> {
  for (const doc of DOCUMENTS) {
    console.log(`Starting upload for ${doc.path}`);
    await uploadDocument(doc);
    console.log(`Completed upload for ${doc.path}`);
  }
}

console.log('Starting document upload process...');
uploadAllDocuments()
  .then(() => console.log('All documents processed successfully'))
  .catch(error => console.error('Error processing documents:', error));
