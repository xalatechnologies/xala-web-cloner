#!/usr/bin/env node
/**
 * The endpoint the contact and job-application forms POST to.
 *
 * Why this exists at all: the forms used to hand the message to the visitor's
 * own mail client via `mailto:`. That is defensible on privacy grounds and it
 * is what `src/lib/forms/submit.ts` documents — but it means nobody ever finds
 * out whether the message was sent. A mail window opening is not a message
 * arriving, so Google Ads could never be told a lead happened, and a visitor
 * whose machine has no mail handler was shown "sent" while their enquiry
 * vanished.
 *
 * Why it is not just Resend: Resend is an API that needs a secret key, and a
 * key in a browser bundle is a key anyone can read with view-source and use to
 * send mail as us. So the browser posts to this, same-origin, and this holds
 * the key. Resend is the delivery mechanism, not the endpoint.
 *
 * Resend was already the fleet's mail channel (`core/comms-email.ts`), the key
 * already exists on this box, and the account's region is eu-west-1 — so
 * enquiry data stays in the EU and one processor covers every mail this
 * organisation sends rather than adding a second.
 *
 * Deliberately dependency-free: node's own http and fetch. A service whose job
 * is to accept untrusted input from the open internet is a bad place to carry
 * a dependency tree that needs patching.
 */
import { createServer } from 'node:http';

const PORT = Number(process.env.CONTACT_PORT || 8099);
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const MAIL_FROM = process.env.CONTACT_MAIL_FROM || 'Xala Technologies <noreply@digilist.no>';
const MAIL_TO = process.env.CONTACT_MAIL_TO || 'info@xala.no';

/** Bigger than any honest enquiry, small enough that nobody can post a film. */
const MAX_BODY_BYTES = 16 * 1024;

/** Per-IP token bucket. Not security, just a lid on the obvious abuse. */
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const seen = (hits.get(ip) || []).filter(t => now - t < RATE_LIMIT.windowMs);
  seen.push(now);
  hits.set(ip, seen);
  // The map would otherwise grow for the lifetime of the process.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some(t => now - t < RATE_LIMIT.windowMs)) hits.delete(k);
  }
  return seen.length > RATE_LIMIT.max;
}

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const looksLikeEmail = v => /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(v);
const escapeHtml = v =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Turn a posted payload into a mail, or explain why it is not one.
 *
 * `to` is never taken from the request. An endpoint that mails wherever it is
 * told is an open relay, and an open relay on a verified sending domain is how
 * a domain's reputation gets destroyed by someone else's phishing run.
 */
export function buildMail(payload) {
  const form = str(payload?.form, 40) || 'contact';
  const name = str(payload?.name, 200);
  const email = str(payload?.email, 200);
  if (!name) return { error: 'name is required' };
  if (!looksLikeEmail(email)) return { error: 'a valid email is required' };

  const fields = Object.entries(payload || {})
    .filter(([k]) => !['form', 'name', 'email'].includes(k))
    .map(([k, v]) => [k, str(v, 5000)])
    .filter(([, v]) => v);

  const subject =
    form === 'careers'
      ? `[xala.no] Søknad – ${str(payload?.role, 120) || 'åpen søknad'}`
      : `[xala.no] ${str(payload?.subject, 160) || 'Henvendelse'}`;

  const rows = [['Navn', name], ['E-post', email], ...fields]
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;vertical-align:top;color:#666">${escapeHtml(k)}</td><td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
    .join('');

  return {
    mail: {
      from: MAIL_FROM,
      to: [MAIL_TO],
      // So hitting reply in the mail client answers the person, not the robot.
      reply_to: email,
      subject,
      html: `<table style="font:14px -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;border-collapse:collapse">${rows}</table>`
    }
  };
}

async function readBody(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error('payload too large');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

const send = (res, code, obj) => {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
};

const server = createServer(async (req, res) => {
  if (req.url === '/health') return send(res, 200, { ok: true });
  if (req.method !== 'POST') return send(res, 405, { error: 'method not allowed' });
  if (!req.url?.startsWith('/contact')) return send(res, 404, { error: 'not found' });

  // nginx is the only thing that talks to this, so the real client address is
  // the last hop it recorded, not the socket.
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  if (rateLimited(ip)) return send(res, 429, { error: 'too many submissions, try again later' });

  let payload;
  try {
    payload = JSON.parse(await readBody(req));
  } catch {
    return send(res, 400, { error: 'invalid request' });
  }

  const { mail, error } = buildMail(payload);
  if (error) return send(res, 400, { error });

  if (!RESEND_API_KEY) {
    // Fail loudly rather than 200. The form reports success only on 2xx, and a
    // silent success here is exactly the failure this endpoint replaced.
    console.error('[contact] RESEND_API_KEY is not set — refusing to claim the mail was sent');
    return send(res, 500, { error: 'mail is not configured' });
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(mail)
    });
    if (!r.ok) {
      console.error('[contact] resend responded', r.status, (await r.text()).slice(0, 300));
      return send(res, 502, { error: 'could not send the message' });
    }
    console.log(`[contact] delivered form=${str(payload?.form, 40) || 'contact'} ip=${ip}`);
    return send(res, 200, { ok: true });
  } catch (err) {
    console.error('[contact] resend request failed', err);
    return send(res, 502, { error: 'could not send the message' });
  }
});

// Loopback only: nginx proxies to it, the internet never reaches it directly.
server.listen(PORT, '127.0.0.1', () => console.log(`[contact] listening on 127.0.0.1:${PORT}`));
