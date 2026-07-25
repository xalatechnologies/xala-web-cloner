import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { ChatWidget } from '../ChatWidget';
import { useChatStore } from '../useChatStore';
import { useSessionChat } from '@/hooks/use-session-chat';
import { useTranslation } from 'react-i18next';

// jsdom doesn't implement scrollIntoView; Chat.tsx calls it on every message update.
Element.prototype.scrollIntoView = vi.fn();

// useChatTranslations queries Supabase (currently unreachable) via
// react-query, so ChatWidget needs a QueryClientProvider ancestor in tests
// just like it has in the real app (see AppProviders).
function renderChatWidget() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <ChatWidget />
    </QueryClientProvider>
  );
}

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

    // ChatWidget only renders once the user has scrolled past the "#home"
    // hero section; simulate that scroll position so these tests see the
    // widget the same way a real page visit would.
    const hero = document.createElement('div');
    hero.id = 'home';
    Object.defineProperty(hero, 'offsetHeight', { value: 1000, configurable: true });
    document.body.appendChild(hero);
    Object.defineProperty(window, 'scrollY', { value: 900, configurable: true, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true, writable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 5000, configurable: true });

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

  afterEach(() => {
    document.getElementById('home')?.remove();
  });

  it('renders chat button when closed', () => {
    (useChatStore as any).mockReturnValue({
      isOpen: false,
      thinking: false,
      setOpen: mockSetOpen,
    });

    renderChatWidget();
    expect(screen.getByText('chat.input.button')).toBeInTheDocument();
  });

  it('opens chat when button is clicked', () => {
    (useChatStore as any).mockReturnValue({
      isOpen: false,
      thinking: false,
      setOpen: mockSetOpen,
    });

    renderChatWidget();
    fireEvent.click(screen.getByText('chat.input.button'));
    expect(mockSetOpen).toHaveBeenCalledWith(true);
  });

  it('sends message when form is submitted', async () => {
    const testMessage = 'Hello, this is a test message';
    
    renderChatWidget();
    
    const input = screen.getByPlaceholderText('chat.input.placeholder');
    const form = input.closest('form') as HTMLFormElement;

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

    renderChatWidget();
    expect(screen.getByText('chat.status.thinking')).toBeInTheDocument();
  });

  it('handles message status updates', async () => {
    const testMessage = 'Test message';
    
    renderChatWidget();
    
    const input = screen.getByPlaceholderText('chat.input.placeholder');
    const form = input.closest('form') as HTMLFormElement;

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

    renderChatWidget();
    expect(screen.getByText('Chat med Xala AI')).toBeInTheDocument();
  });
});
