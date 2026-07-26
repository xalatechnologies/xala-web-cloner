import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

interface DocumentInfo {
  path: string;
  type: 'company_info' | 'reference' | 'case_study';
  metadata: Record<string, any>;
  /** If set, use this instead of reading from path (for JSON-derived content) */
  content?: string;
}

/** Recursively find all .md files under dir; returns paths relative to ROOT */
function getMarkdownFiles(dir: string): string[] {
  const results: string[] = [];
  const fullDir = path.isAbsolute(dir) ? dir : path.join(ROOT, dir);
  if (!fs.existsSync(fullDir)) return results;
  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(fullDir, e.name);
    if (e.isDirectory()) {
      results.push(...getMarkdownFiles(full));
    } else if (e.isFile() && e.name.endsWith('.md')) {
      results.push(path.relative(ROOT, full));
    }
  }
  return results;
}

/** Turn a JSON file from src/data into readable text for RAG */
function jsonToReadableText(filePath: string, data: unknown): string {
  const name = path.basename(filePath, '.json');
  const lines: string[] = [`Document: ${name}`, ''];

  function walk(obj: unknown, prefix = ''): void {
    if (obj === null || obj === undefined) return;
    if (Array.isArray(obj)) {
      obj.forEach((item, i) => {
        if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
          const entries = Object.entries(item as Record<string, unknown>)
            .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`)
            .join('; ');
          lines.push(`${prefix}[${i}] ${entries}`);
        } else {
          lines.push(`${prefix}${String(item)}`);
        }
      });
      return;
    }
    if (typeof obj === 'object') {
      for (const [k, v] of Object.entries(obj)) {
        if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
          lines.push(`${prefix}${k}: ${v}`);
        } else if (Array.isArray(v) || (typeof v === 'object' && v !== null)) {
          lines.push(`${prefix}${k}:`);
          walk(v, prefix + '  ');
        }
      }
    }
  }

  walk(data);
  return lines.join('\n');
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

function buildDocumentList(): DocumentInfo[] {
  const list: DocumentInfo[] = [
    {
      path: 'public/docs/company_profile.md',
      type: 'company_info',
      metadata: { source: 'company_profile', title: 'Xala Technologies Company Profile', author: 'Ibrahim Rahmani' }
    },
    {
      path: 'public/docs/references.md',
      type: 'reference',
      metadata: { source: 'references', title: 'Client References and Case Studies' }
    },
    {
      path: 'public/docs/services.md',
      type: 'company_info',
      metadata: { source: 'services', title: 'Xala Technologies Services' }
    }
  ];

  // README at project root
  if (fs.existsSync(path.join(ROOT, 'README.md'))) {
    list.push({
      path: 'README.md',
      type: 'company_info',
      metadata: { source: 'project_docs', title: 'Project README' }
    });
  }

  // docs/**/*.md (all markdown in docs/, including docs/README.md)
  const docsDir = path.join(ROOT, 'docs');
  if (fs.existsSync(docsDir)) {
    const mdFiles = getMarkdownFiles('docs');
    for (const rel of mdFiles) {
      list.push({
        path: rel,
        type: 'company_info',
        metadata: { source: 'project_docs', title: path.basename(rel, '.md') }
      });
    }
  }

  // src/data/*.json as readable text (content generated below)
  const dataDir = path.join(ROOT, 'src', 'data');
  if (fs.existsSync(dataDir)) {
    const jsonFiles = fs.readdirSync(dataDir).filter((f: string) => f.endsWith('.json'));
    for (const name of jsonFiles) {
      const fullPath = path.join(dataDir, name);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const data = JSON.parse(raw);
      const content = jsonToReadableText(name, data);
      list.push({
        path: `src/data/${name}`,
        type: 'company_info',
        metadata: { source: 'structured_data', title: `Website data: ${name}` },
        content
      });
    }
  }

  return list;
}

const DOCUMENTS = buildDocumentList();

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
    const content =
      docInfo.content !== undefined
        ? docInfo.content
        : fs.readFileSync(path.join(ROOT, docInfo.path), 'utf-8');
    const chunks = chunkDocument(content);

    console.log(`Processing ${docInfo.path} - ${chunks.length} chunks`);

    for (const [index, chunk] of chunks.entries()) {
      const embedding = await createEmbedding(chunk);

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
