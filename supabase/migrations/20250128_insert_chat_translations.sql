-- Insert chat widget translations for English and Norwegian
INSERT INTO public.sections (section_name, title, language, sort_order, translations)
VALUES 
-- English
(
  'chat-widget',
  'Chat Widget',
  'en',
  1000,
  '{
    "chat.title": "Chat with Us",
    "chat.status.thinking": "Thinking...",
    "chat.status.online": "Online",
    "chat.input.placeholder": "Type your message here...",
    "chat.input.button": "Send",
    "chat.errors.failed_to_send": "Failed to send message. Please try again."
  }'::jsonb
),
-- Norwegian
(
  'chat-widget',
  'Chat Widget',
  'no',
  1000,
  '{
    "chat.title": "Chat med oss",
    "chat.status.thinking": "Tenker...",
    "chat.status.online": "Pålogget",
    "chat.input.placeholder": "Skriv din melding her...",
    "chat.input.button": "Send",
    "chat.errors.failed_to_send": "Kunne ikke sende melding. Vennligst prøv igjen."
  }'::jsonb
)
ON CONFLICT (section_name, language) 
DO UPDATE SET 
  translations = EXCLUDED.translations,
  updated_at = now(); 