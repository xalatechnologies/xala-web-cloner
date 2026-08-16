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
  fireEvent.change(screen.getByLabelText('contact.form.name.label'), {
    target: { value: 'Jane Doe' },
  });
  fireEvent.change(screen.getByLabelText('contact.form.email.label'), {
    target: { value: 'jane@example.com' },
  });
  fireEvent.change(screen.getByLabelText('contact.form.subject.label'), {
    target: { value: 'Hello there' },
  });
  fireEvent.change(screen.getByLabelText('contact.form.message.label'), {
    target: { value: 'This is a long enough test message.' },
  });
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: 'contact.form.status.send' }));
}

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    openMock.mockReset();
    vi.stubGlobal('open', openMock);
    // The default is now the same-origin endpoint. These cases cover the
    // mailto fallback, so they opt into it the way a build would.
    vi.stubEnv('VITE_FORM_ENDPOINT', 'off');
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

  it('leaves subject blank by default so /kontakt stays a blank enquiry', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('contact.form.subject.label')).toHaveValue('');
  });

  it('pre-fills subject when given a default, and uses it on submit', async () => {
    render(<ContactForm defaultSubject="Book en demo" />);
    expect(screen.getByLabelText('contact.form.subject.label')).toHaveValue('Book en demo');

    fireEvent.change(screen.getByLabelText('contact.form.name.label'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText('contact.form.email.label'), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByLabelText('contact.form.message.label'), {
      target: { value: 'This is a long enough test message.' },
    });
    submit();

    await waitFor(() => expect(openMock).toHaveBeenCalledTimes(1));
    expect(decodeURIComponent(openMock.mock.calls[0][0])).toContain('[xala.no] Book en demo');
  });

  it('gives every field a visible associated label and keeps placeholders as hints', () => {
    render(<ContactForm />);

    const fields = [
      { label: 'contact.form.name.label', placeholder: 'contact.form.name.placeholder' },
      { label: 'contact.form.email.label', placeholder: 'contact.form.email.placeholder' },
      { label: 'contact.form.subject.label', placeholder: 'contact.form.subject.placeholder' },
      { label: 'contact.form.message.label', placeholder: 'contact.form.message.placeholder' },
    ] as const;

    for (const { label, placeholder } of fields) {
      const control = screen.getByLabelText(label);
      expect(control).toBeVisible();
      expect(control).toHaveAttribute('required');
      expect(control).toHaveAttribute('placeholder', placeholder);
      expect(screen.getByText(label)).toBeVisible();
    }
  });
});
