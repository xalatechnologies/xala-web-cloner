-- First delete existing records for contact form
DELETE FROM public.sections 
WHERE section_name = 'contact-form' 
  AND language IN ('en', 'no');

-- Insert contact form translations for English
INSERT INTO public.sections (section_name, title, language, sort_order, translations)
VALUES 
(
  'contact-form',
  'Contact Form',
  'en',
  1000,
  '{
    "contact.form.name.placeholder": "Your name (e.g., John Smith)",
    "contact.form.email.placeholder": "Your email (e.g., john@example.com)",
    "contact.form.subject.placeholder": "Subject of your inquiry (e.g., Business Inquiry)",
    "contact.form.message.placeholder": "Please describe your inquiry in detail...",
    "contact.form.status.send": "Send Message",
    "contact.form.status.sending": "Sending...",
    "contact.form.success.title": "Message Sent",
    "contact.form.success.description": "Thank you for your message. We will get back to you soon.",
    "contact.form.error.title": "Error",
    "contact.form.error.description": "Failed to send message. Please try again.",
    "contact.form.validation.name.min": "Name must be at least 2 characters",
    "contact.form.validation.email.invalid": "Invalid email address",
    "contact.form.validation.subject.min": "Subject must be at least 2 characters",
    "contact.form.validation.message.min": "Message must be at least 10 characters"
  }'::jsonb
)
ON CONFLICT (section_name, language) 
DO UPDATE SET 
  translations = EXCLUDED.translations,
  updated_at = now();

-- Insert contact form translations for Norwegian
INSERT INTO public.sections (section_name, title, language, sort_order, translations)
VALUES 
(
  'contact-form',
  'Kontaktskjema',
  'no',
  1000,
  '{
    "contact.form.name.placeholder": "Ditt navn (f.eks., Ola Nordmann)",
    "contact.form.email.placeholder": "Din e-post (f.eks., ola@example.com)",
    "contact.form.subject.placeholder": "Emne for henvendelsen (f.eks., Forretningsforespørsel)",
    "contact.form.message.placeholder": "Vennligst beskriv din henvendelse i detalj...",
    "contact.form.status.send": "Send Melding",
    "contact.form.status.sending": "Sender...",
    "contact.form.success.title": "Melding Sendt",
    "contact.form.success.description": "Takk for din melding. Vi vil svare deg så snart som mulig.",
    "contact.form.error.title": "Feil",
    "contact.form.error.description": "Kunne ikke sende melding. Vennligst prøv igjen.",
    "contact.form.validation.name.min": "Navnet må være minst 2 tegn",
    "contact.form.validation.email.invalid": "Ugyldig e-postadresse",
    "contact.form.validation.subject.min": "Emnet må være minst 2 tegn",
    "contact.form.validation.message.min": "Meldingen må være minst 10 tegn"
  }'::jsonb
)
ON CONFLICT (section_name, language) 
DO UPDATE SET 
  translations = EXCLUDED.translations,
  updated_at = now(); 