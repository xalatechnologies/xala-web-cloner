import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

/**
 * Which of the two paths a build takes, and what each one claims.
 *
 * The distinction is the whole point of `SubmitOutcome`. A mail client opening
 * is not a message arriving — the old default said "sent" either way, so an
 * enquiry could vanish with the sender believing it had gone. Only `'posted'`
 * means a server accepted it, and only `'posted'` is reported to Google Ads.
 */
async function load() {
  vi.resetModules();
  return import('../submit');
}

describe('formEndpoint', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('defaults to the same-origin endpoint, so no build variable is required', async () => {
    vi.stubEnv('VITE_FORM_ENDPOINT', '');
    const { formEndpoint, DEFAULT_FORM_ENDPOINT } = await load();
    expect(formEndpoint()).toBe('/api/contact');
    expect(DEFAULT_FORM_ENDPOINT).toBe('/api/contact');
  });

  it('honours an explicit override', async () => {
    vi.stubEnv('VITE_FORM_ENDPOINT', 'https://forms.example.test/submit');
    const { formEndpoint } = await load();
    expect(formEndpoint()).toBe('https://forms.example.test/submit');
  });

  it('treats "off" as a deliberate return to mailto', async () => {
    vi.stubEnv('VITE_FORM_ENDPOINT', 'off');
    const { formEndpoint } = await load();
    expect(formEndpoint()).toBeUndefined();
  });
});

describe('submitForm', () => {
  const fallback = { to: 'info@xala.no', subject: 'S', body: 'B' };

  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('posts to the endpoint and reports a confirmed send', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);
    const { submitForm } = await load();

    await expect(submitForm({ form: 'contact', name: 'Jane' }, fallback)).resolves.toBe('posted');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe('/api/contact');
  });

  it('throws rather than claiming success when the endpoint rejects', async () => {
    // The worst available outcome is a form that says "sent" on a 4xx: the
    // message is gone and nobody knows.
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 422 }));
    const { submitForm } = await load();
    await expect(submitForm({ form: 'contact' }, fallback)).rejects.toThrow('422');
  });

  it('falls back to the mail client, and says so, when no endpoint is configured', async () => {
    vi.stubEnv('VITE_FORM_ENDPOINT', 'off');
    const openMock = vi.fn();
    vi.stubGlobal('open', openMock);
    const { submitForm } = await load();

    await expect(submitForm({ form: 'contact' }, fallback)).resolves.toBe('mailto');
    expect(openMock).toHaveBeenCalledTimes(1);
    expect(String(openMock.mock.calls[0][0])).toContain('mailto:info@xala.no');
  });
});
