import { SearchForm } from '@/components/rag/SearchForm';
import { SearchResults } from '@/components/rag/SearchResults';
import { useRagStore } from '@/store/useRagStore';

export default function TestRAGEdge() {
  const { documents, isLoading, error, search } = useRagStore();

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-8">Test RAG System (Edge Function)</h1>
      
      <div className="space-y-8">
        <SearchForm 
          onSubmit={async ({ query }) => {
            await search(query);
          }} 
          isLoading={isLoading}
        />

        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded">
            {error}
          </div>
        )}

        {documents.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Results:</h2>
            <SearchResults documents={documents} />
          </div>
        )}
      </div>
    </div>
  );
}
