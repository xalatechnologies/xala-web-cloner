import { render, screen } from '@testing-library/react';
import { SearchResults } from '../SearchResults';

describe('SearchResults', () => {
  const mockDocuments = [
    {
      id: '1',
      content: 'Test content 1',
      metadata: { source: 'test.md' },
      similarity: 0.95,
    },
    {
      id: '2',
      content: 'Test content 2',
      metadata: {},
      similarity: 0.85,
    },
  ];

  it('renders empty state when no documents', () => {
    render(<SearchResults documents={[]} />);
    expect(screen.getByText(/no relevant documents found/i)).toBeInTheDocument();
  });

  it('renders documents correctly', () => {
    render(<SearchResults documents={mockDocuments} />);
    
    // Check first document
    expect(screen.getByText(/document 1/i)).toBeInTheDocument();
    expect(screen.getByText(/source: test\.md/i)).toBeInTheDocument();
    expect(screen.getByText(/95%/)).toBeInTheDocument();
    expect(screen.getByText('Test content 1')).toBeInTheDocument();
    
    // Check second document
    expect(screen.getByText(/document 2/i)).toBeInTheDocument();
    expect(screen.getByText(/85%/)).toBeInTheDocument();
    expect(screen.getByText('Test content 2')).toBeInTheDocument();
  });
});
