import { createClient } from '@supabase/supabase-js';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// Function to create embeddings
async function createEmbedding(text: string) {
  const response = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return response.data.data[0].embedding;
}

// Function to chunk text into smaller pieces
function chunkText(text: string, maxChunkLength: number = 1000): string[] {
  const sentences = text.split(/[.!?]+/);
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxChunkLength && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = '';
    }
    currentChunk += sentence + '. ';
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// Main function to process and store documents
async function processDocuments() {
  try {
    // Read your documents
    const documents = [
      {
        content: readFileSync(path.join(__dirname, '../public/docs/company_profile.md'), 'utf-8'),
        type: 'company_info',
        metadata: { source: 'company_profile' }
      },
      {
        content: readFileSync(path.join(__dirname, '../public/docs/references.md'), 'utf-8'),
        type: 'reference',
        metadata: { source: 'references' }
      }
      // Add more documents as needed
    ];

    for (const doc of documents) {
      const chunks = chunkText(doc.content);
      
      for (const chunk of chunks) {
        const embedding = await createEmbedding(chunk);
        
        await supabase.from('documents').insert({
          content: chunk,
          type: doc.type,
          metadata: doc.metadata,
          embedding
        });
        
        console.log(`Processed chunk for ${doc.metadata.source}`);
      }
    }

    console.log('Successfully processed all documents');
  } catch (error) {
    console.error('Error processing documents:', error);
  }
}

// Run the script
processDocuments();
