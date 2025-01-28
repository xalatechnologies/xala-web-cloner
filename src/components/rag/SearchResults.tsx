import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

interface Document {
  id: string;
  content: string;
  metadata: Record<string, any>;
  similarity: number;
}

interface SearchResultsProps {
  documents: Document[];
}

export function SearchResults({ documents }: SearchResultsProps) {
  if (!documents.length) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">No relevant documents found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc, index) => {
        const metadata = doc.metadata || {};
        const source = metadata.source ? ` (Source: ${metadata.source})` : '';
        const similarity = (doc.similarity * 100).toFixed(1);

        return (
          <Card key={doc.id}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                Document {index + 1}{source} - {similarity}% relevance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{doc.content}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
