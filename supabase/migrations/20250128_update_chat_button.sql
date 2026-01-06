-- Update chat widget translations for English
UPDATE public.sections 
SET translations = translations || 
  '{
    "chat.input.button": "Chat with Xala AI"
  }'::jsonb
WHERE section_name = 'chat-widget' 
  AND language = 'en';

-- Update chat widget translations for Norwegian
UPDATE public.sections 
SET translations = translations || 
  '{
    "chat.input.button": "Chat med Xala AI"
  }'::jsonb
WHERE section_name = 'chat-widget' 
  AND language = 'no'; 