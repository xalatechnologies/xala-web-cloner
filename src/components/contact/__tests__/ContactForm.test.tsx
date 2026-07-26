import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ContactForm } from '../ContactForm';

const toastMock = vi.fn();
const openMock = vi.fn();

vi.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({ toast: toastMock }),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

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

function submit() {
  fireEvent.click(screen.getByRole('button', { name: 'contact.form.status.send' }));
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('open', openMock);
  });

  it('hands a valid submission to the mail client with the message encoded', async () => {
    render(<ContactForm />);
    fillValidForm();
    submit();

    await waitFor(() => expect(openMock).toHaveBeenCalledTimes(1));

    const [url, target] = openMock.mock.calls[0];
    expect(url).toContain('mailto:info@xala.no');
    // The subject is namespaced and the body carries name + email + message,
    // so a submission is not silently reduced to an empty mail draft.
    expect(decodeURIComponent(url)).toContain('[xala.no] Hello there');
    expect(decodeURIComponent(url)).toContain('jane@example.com');
    expect(decodeURIComponent(url)).toContain('This is a long enough test message.');
    expect(target).toBe('_self');
  });

  it('confirms a successful submission to the user', async () => {
    render(<ContactForm />);
    fillValidForm();
    submit();

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith(
        expect.not.objectContaining({ variant: 'destructive' })
      );
    });
  });

  it('shows a visible error toast when handing off to the mail client fails', async () => {
    // Replaces the old Supabase-insert failure path: the delivery mechanism
    // changed to mailto, but a failed send must still be visible rather than
    // leaving the user staring at an apparently-accepted form.
    openMock.mockImplementation(() => {
      throw new Error('no mail handler');
    });

    render(<ContactForm />);
    fillValidForm();
    submit();

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith(
        expect.objectContaining({ variant: 'destructive' })
      );
    });
  });

  it('does not attempt a send when the form is empty', async () => {
    render(<ContactForm />);
    submit();

    await waitFor(() => {
      expect(screen.getByText('contact.form.validation.name.min')).toBeInTheDocument();
    });
    expect(openMock).not.toHaveBeenCalled();
  });
});
