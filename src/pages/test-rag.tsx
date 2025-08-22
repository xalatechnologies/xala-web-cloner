import { useState } from 'react';
import { findRelevantDocuments, formatDocumentsAsContext } from '../utils/retrieval';

export default function TestRAG() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const documents = await findRelevantDocuments(query);
      const context = formatDocumentsAsContext(documents);
      setResults(context || 'No relevant documents found');
    } catch (error) {
      console.error('Error:', error);
      setResults('Error searching documents');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test RAG System</h1>
      
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query..."
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {results && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Results:</h2>
          <pre className="whitespace-pre-wrap bg-muted p-4 rounded">
            {results}
          </pre>
        </div>
      )}
    </div>
  );
}
