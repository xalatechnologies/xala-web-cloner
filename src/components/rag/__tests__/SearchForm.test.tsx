import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from '../SearchForm';

describe('SearchForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders the form correctly', () => {
    render(<SearchForm onSubmit={mockOnSubmit} isLoading={false} />);
    expect(screen.getByLabelText(/search query/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('shows validation error when submitting empty query', async () => {
    render(<SearchForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    expect(await screen.findByText(/please enter a search query/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with query when form is valid', async () => {
    render(<SearchForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    fireEvent.change(screen.getByLabelText(/search query/i), {
      target: { value: 'test query' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    expect(mockOnSubmit).toHaveBeenCalledWith({ query: 'test query' });
  });

  it('disables form when loading', () => {
    render(<SearchForm onSubmit={mockOnSubmit} isLoading={true} />);
    
    expect(screen.getByLabelText(/search query/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /searching/i })).toBeDisabled();
  });
});
