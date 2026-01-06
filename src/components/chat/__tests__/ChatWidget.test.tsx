import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ChatWidget } from '../ChatWidget';
import { useChatStore } from '../useChatStore';
import { useSessionChat } from '@/hooks/use-session-chat';
import { useTranslation } from 'react-i18next';

// Mock the hooks
vi.mock('../useChatStore');
vi.mock('@/hooks/use-session-chat');
vi.mock('react-i18next');
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ChatWidget', () => {
  const mockSetOpen = vi.fn();
  const mockSendMessage = vi.fn();
  const mockUpdateMessageStatus = vi.fn();

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Mock useChatStore
    (useChatStore as any).mockReturnValue({
      isOpen: true,
      thinking: false,
      setOpen: mockSetOpen,
    });

    // Mock useSessionChat
    (useSessionChat as any).mockReturnValue({
      messages: [],
      isLoading: false,
      sendMessage: mockSendMessage,
      updateMessageStatus: mockUpdateMessageStatus,
    });

    // Mock useTranslation
    (useTranslation as any).mockReturnValue({
      t: (key: string) => key,
      i18n: {
        language: 'en',
        changeLanguage: vi.fn(),
      },
    });
  });

  it('renders chat button when closed', () => {
    (useChatStore as any).mockReturnValue({
      isOpen: false,
      thinking: false,
      setOpen: mockSetOpen,
    });

    render(<ChatWidget />);
    expect(screen.getByText('chat.input.button')).toBeInTheDocument();
  });

  it('opens chat when button is clicked', () => {
    (useChatStore as any).mockReturnValue({
      isOpen: false,
      thinking: false,
      setOpen: mockSetOpen,
    });

    render(<ChatWidget />);
    fireEvent.click(screen.getByText('chat.input.button'));
    expect(mockSetOpen).toHaveBeenCalledWith(true);
  });

  it('sends message when form is submitted', async () => {
    const testMessage = 'Hello, this is a test message';
    
    render(<ChatWidget />);
    
    const input = screen.getByPlaceholderText('chat.input.placeholder');
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: testMessage } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith(expect.objectContaining({
        content: testMessage,
        type: 'user',
      }));
    });
  });

  it('displays thinking state', () => {
    (useChatStore as any).mockReturnValue({
      isOpen: true,
      thinking: true,
      setOpen: mockSetOpen,
    });

    render(<ChatWidget />);
    expect(screen.getByText('chat.status.thinking')).toBeInTheDocument();
  });

  it('handles message status updates', async () => {
    const testMessage = 'Test message';
    
    render(<ChatWidget />);
    
    const input = screen.getByPlaceholderText('chat.input.placeholder');
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: testMessage } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockUpdateMessageStatus).toHaveBeenCalledWith(expect.objectContaining({
        status: 'sent',
      }));
    });
  });

  it('supports Norwegian language', () => {
    (useTranslation as any).mockReturnValue({
      t: (key: string) => key === 'chat.input.button' ? 'Chat med Xala AI' : key,
      i18n: {
        language: 'no',
        changeLanguage: vi.fn(),
      },
    });

    render(<ChatWidget />);
    expect(screen.getByText('Chat med Xala AI')).toBeInTheDocument();
  });
});
