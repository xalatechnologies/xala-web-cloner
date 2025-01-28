import { render, screen, fireEvent } from '@testing-library/react';
import { ChatMessage } from '../ChatMessage';
import { vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('ChatMessage', () => {
  const mockUserMessage = {
    id: '1',
    type: 'user' as const,
    content: 'Hello',
    timestamp: new Date(),
    status: 'sent' as const,
  };

  const mockAssistantMessage = {
    id: '2',
    type: 'assistant' as const,
    content: 'Hi there',
    timestamp: new Date(),
    sources: [
      {
        title: 'Test Source',
        url: 'https://example.com',
        content: 'Source content',
      },
    ],
  };

  it('renders user message correctly', () => {
    render(<ChatMessage message={mockUserMessage} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Sent')).toBeInTheDocument();
  });

  it('renders assistant message correctly', () => {
    render(<ChatMessage message={mockAssistantMessage} />);
    expect(screen.getByText('Hi there')).toBeInTheDocument();
  });

  it('shows thinking state for assistant message', () => {
    render(
      <ChatMessage
        message={{ ...mockAssistantMessage, thinking: true }}
      />
    );
    expect(screen.getByText('Thinking...')).toBeInTheDocument();
  });

  it('handles sources display and interaction', () => {
    render(<ChatMessage message={mockAssistantMessage} />);
    
    // Initially shows "Show 1 sources"
    const sourcesButton = screen.getByText('Show 1 sources');
    expect(sourcesButton).toBeInTheDocument();
    
    // Click to show sources
    fireEvent.click(sourcesButton);
    
    // Check source content is displayed
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    expect(screen.getByText('Source content')).toBeInTheDocument();
    
    // Shows "Hide 1 sources" after expanding
    expect(screen.getByText('Hide 1 sources')).toBeInTheDocument();
  });

  it('shows correct status icons for user messages', () => {
    // Sending status
    render(
      <ChatMessage
        message={{ ...mockUserMessage, status: 'sending' }}
      />
    );
    expect(screen.getByLabelText('sending')).toBeInTheDocument();

    // Error status
    render(
      <ChatMessage
        message={{ ...mockUserMessage, status: 'error' }}
      />
    );
    expect(screen.getByLabelText('error')).toBeInTheDocument();
  });

  it('formats timestamp correctly', () => {
    const date = new Date('2024-01-27T12:34:00');
    render(
      <ChatMessage
        message={{ ...mockUserMessage, timestamp: date }}
      />
    );
    expect(screen.getByText('12:34')).toBeInTheDocument();
  });
});
