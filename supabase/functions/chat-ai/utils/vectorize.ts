import { createClient } from '@supabase/supabase-js';
import { OpenAIEmbeddings } from 'openai';
import { Document } from 'langchain/document';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

export interface DocumentMetadata {
  source: string;
  type: 'reference' | 'case_study' | 'company_info';
  title?: string;
  author?: string;
  date?: string;
}

export class DocumentVectorizer {
  private supabase;
  private embeddings;

  constructor(supabaseUrl: string, supabaseKey: string, openAiKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.embeddings = new OpenAIEmbeddings({ openAIApiKey: openAiKey });
  }

  private async createVectorStore() {
    const { error } = await this.supabase.rpc('create_vector_store');
    if (error) throw error;
  }

  private async splitDocument(text: string): Promise<Document[]> {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: CHUNK_SIZE,
      chunkOverlap: CHUNK_OVERLAP,
    });

    return splitter.createDocuments([text]);
  }

  public async vectorizeAndStore(
    text: string,
    metadata: DocumentMetadata
  ): Promise<void> {
    try {
      // Split the document into chunks
      const docs = await this.splitDocument(text);

      // Generate embeddings for each chunk
      for (const doc of docs) {
        const embedding = await this.embeddings.embedQuery(doc.pageContent);

        // Store in Supabase
        const { error } = await this.supabase.from('documents').insert({
          content: doc.pageContent,
          metadata: { ...metadata },
          embedding,
        });

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error vectorizing document:', error);
      throw error;
    }
  }

  public async semanticSearch(
    query: string,
    limit: number = 5
  ): Promise<Array<{ content: string; metadata: DocumentMetadata; similarity: number }>> {
    try {
      // Generate embedding for the query
      const queryEmbedding = await this.embeddings.embedQuery(query);

      // Perform similarity search
      const { data, error } = await this.supabase.rpc('match_documents', {
        query_embedding: queryEmbedding,
        match_threshold: 0.7,
        match_count: limit,
      });

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error performing semantic search:', error);
      throw error;
    }
  }
}
