import { supabase } from './supabase-client';

export interface RelevantDocument {
  id: string;
  content: string;
  metadata: Record<string, any>;
  similarity: number;
}

export async function findRelevantDocuments(
  query: string,
  matchThreshold: number = 0.7,
  matchCount: number = 5
): Promise<RelevantDocument[]> {
  const { data, error } = await supabase.functions.invoke('rag-search', {
    body: { query, matchThreshold, matchCount }
  });

  if (error) {
    console.error('Error finding relevant documents:', error);
    return [];
  }

  return data;
}

export function formatDocumentsAsContext(documents: RelevantDocument[]): string {
  return documents
    .map((doc, index) => {
      const metadata = doc.metadata || {};
      const source = metadata.source ? ` (Source: ${metadata.source})` : '';
      return `[Document ${index + 1}${source}]\n${doc.content}`;
    })
    .join('\n\n');
}

export async function generateContextEnrichedPrompt(
  userQuery: string,
  systemPrompt: string,
  defaultContext: string
): Promise<string> {
  const relevantDocs = await findRelevantDocuments(userQuery);
  const context = relevantDocs.length > 0
    ? formatDocumentsAsContext(relevantDocs)
    : defaultContext;

  return `${systemPrompt}\n\nContext:\n${context}\n\nUser Query: ${userQuery}`;
}
