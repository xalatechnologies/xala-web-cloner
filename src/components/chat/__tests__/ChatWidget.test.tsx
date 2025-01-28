import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatWidget } from '../ChatWidget';
import { useChatStore } from '../useChatStore';
import { useChatMessages } from '@/hooks/use-chat-messages';
import { vi } from 'vitest';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock translations
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'chat.title': 'Xala AI Assistant',
        'chat.status.thinking': 'Thinking...',
        'chat.status.online': 'Online',
        'chat.input.placeholder': 'Type your message...',
        'chat.input.button': 'Chat with Xala AI',
        'chat.errors.failed_to_send': 'Failed to send message',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock the hooks
vi.mock('../useChatStore');
vi.mock('@/hooks/use-chat-messages');

describe('ChatWidget', () => {
  const mockStore = {
    isOpen: false,
    thinking: false,
    setOpen: vi.fn(),
  };

  const mockChatMessages = {
    messages: [],
    isLoading: false,
    sendMessage: vi.fn(),
    updateMessageStatus: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useChatStore as any).mockImplementation(() => mockStore);
    (useChatMessages as any).mockImplementation(() => mockChatMessages);
  });

  it('renders chat button with correct text when closed', () => {
    render(<ChatWidget />);
    expect(screen.getByText('Chat with Xala AI')).toBeInTheDocument();
  });

  it('opens chat window when button is clicked', () => {
    render(<ChatWidget />);
    const button = screen.getByText('Chat with Xala AI');
    fireEvent.click(button);
    expect(mockStore.setOpen).toHaveBeenCalledWith(true);
  });

  it('displays title and status when open', () => {
    mockStore.isOpen = true;
    render(<ChatWidget />);
    expect(screen.getByText('Xala AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('shows thinking status when processing', () => {
    mockStore.isOpen = true;
    mockStore.thinking = true;
    render(<ChatWidget />);
    expect(screen.getByText('Thinking...')).toBeInTheDocument();
  });

  it('sends message and updates database', async () => {
    mockStore.isOpen = true;
    const message = 'Test message';
    
    render(<ChatWidget />);
    const input = screen.getByPlaceholderText('Type your message...');
    const form = screen.getByRole('form');
    
    fireEvent.change(input, { target: { value: message } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockChatMessages.sendMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          content: message,
          type: 'user',
          status: 'sending',
        })
      );

      expect(mockChatMessages.updateMessageStatus).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'sent',
        })
      );
    });
  });

  it('closes chat when clicking outside', () => {
    mockStore.isOpen = true;
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <ChatWidget />
      </div>
    );

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(mockStore.setOpen).toHaveBeenCalledWith(false);
  });

  it('displays messages from database', () => {
    mockStore.isOpen = true;
    const mockMessages = [
      {
        id: '1',
        content: 'Hello',
        type: 'user' as const,
        status: 'sent' as const,
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        content: 'Hi there!',
        type: 'assistant' as const,
        status: 'sent' as const,
        created_at: new Date().toISOString(),
      },
    ];

    mockChatMessages.messages = mockMessages;
    render(<ChatWidget />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('handles message send failure', async () => {
    mockStore.isOpen = true;
    mockChatMessages.sendMessage.mockRejectedValue(new Error('Failed to send'));
    
    render(<ChatWidget />);
    const input = screen.getByPlaceholderText('Type your message...');
    const form = screen.getByRole('form');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockChatMessages.sendMessage).toHaveBeenCalled();
      expect(mockChatMessages.updateMessageStatus).not.toHaveBeenCalled();
    });
  });
});
