import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ContactForm } from '../ContactForm';

const insertMock = vi.fn();
const toastMock = vi.fn();

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: insertMock,
    })),
  },
}));

vi.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({ toast: toastMock }),
}));

vi.mock('@/hooks/use-section', () => ({
  useSection: () => ({ data: null }),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

function renderForm() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <ContactForm />
    </QueryClientProvider>
  );
}

function fillValidForm() {
  fireEvent.change(screen.getByPlaceholderText('contact.form.name.placeholder'), {
    target: { value: 'Jane Doe' },
  });
  fireEvent.change(screen.getByPlaceholderText('contact.form.email.placeholder'), {
    target: { value: 'jane@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('contact.form.subject.placeholder'), {
    target: { value: 'Hello there' },
  });
  fireEvent.change(screen.getByPlaceholderText('contact.form.message.placeholder'), {
    target: { value: 'This is a long enough test message.' },
  });
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows a visible error toast when the Supabase insert fails', async () => {
    insertMock.mockResolvedValue({ error: new Error('network error') });

    renderForm();
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: 'contact.form.status.send' }));

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith(
        expect.objectContaining({ variant: 'destructive' })
      );
    });
  });

  it('shows a success toast when the Supabase insert succeeds', async () => {
    insertMock.mockResolvedValue({ error: null });

    renderForm();
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: 'contact.form.status.send' }));

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith(
        expect.not.objectContaining({ variant: 'destructive' })
      );
    });
  });
});
