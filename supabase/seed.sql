-- Create API keys table first
create table if not exists api_keys (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  key_value text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a secure key for encryption
create table if not exists encryption_keys (
  id uuid default uuid_generate_v4() primary key,
  key_value text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table api_keys enable row level security;

-- Create policy for secure access
create policy "Allow authenticated read access to api_keys"
  on api_keys for select
  to authenticated
  using (true);

-- Insert default encryption key if not exists
insert into encryption_keys (key_value)
select 'xala-secure-encryption-key-2025'
where not exists (select 1 from encryption_keys);

-- Insert GDPR notifications for different languages
INSERT INTO public.gdpr_notifications (title, content, button_text, language)
VALUES 
(
    'Cookie and Privacy Notice',
    'We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking "Accept", you agree to this use as described in our Cookie Policy.',
    'Accept',
    'en'
),
(
    'Informasjon om informasjonskapsler og personvern',
    'Vi bruker informasjonskapsler og lignende teknologier for å hjelpe til med å tilpasse innhold, skreddersy og måle annonser, og gi en bedre opplevelse. Ved å klikke på "Godta" samtykker du til denne bruken som beskrevet i vår retningslinjer for informasjonskapsler.',
    'Godta',
    'no'
);

-- Insert chat widget translations
INSERT INTO public.sections (id, title, description, status, language, sort_order, translations)
VALUES 
-- English
(
    gen_random_uuid(),
    'Chat Widget',
    'Chat widget component translations',
    'published',
    'en',
    1000,
    jsonb_build_object(
        'chat.title', 'Xala AI Assistant',
        'chat.status.thinking', 'Thinking...',
        'chat.status.online', 'Online',
        'chat.input.placeholder', 'Type your message...',
        'chat.input.button', 'Chat with Xala AI',
        'chat.errors.failed_to_send', 'Failed to send message'
    )
),
-- Norwegian
(
    gen_random_uuid(),
    'Chat Widget',
    'Chat widget komponentoversettelser',
    'published',
    'no',
    1000,
    jsonb_build_object(
        'chat.title', 'Xala AI-assistent',
        'chat.status.thinking', 'Tenker...',
        'chat.status.online', 'Pålogget',
        'chat.input.placeholder', 'Skriv meldingen din...',
        'chat.input.button', 'Chat med Xala AI',
        'chat.errors.failed_to_send', 'Kunne ikke sende melding'
    )
);

-- Insert sample chat messages
INSERT INTO public.chat_messages (id, content, type, status, language, sources, created_at)
VALUES 
-- English messages
(
    gen_random_uuid(),
    'Hi! How can I help you with your software development needs?',
    'assistant',
    'sent',
    'en',
    NULL,
    NOW() - INTERVAL '1 hour'
),
(
    gen_random_uuid(),
    'I need help with choosing the right tech stack for my project.',
    'user',
    'sent',
    'en',
    NULL,
    NOW() - INTERVAL '59 minutes'
),
(
    gen_random_uuid(),
    'I''d be happy to help you choose the right technology stack. Based on our expertise at Xala, I recommend considering:\n\n1. **Frontend**:\n- Next.js for server-side rendering\n- React for component-based UI\n- TailwindCSS for styling\n\n2. **Backend**:\n- Node.js with Express\n- PostgreSQL for data storage\n- Redis for caching\n\nWould you like me to explain why these technologies would be beneficial for your project?',
    'assistant',
    'sent',
    'en',
    '[{"title": "Technology Stack", "url": "/technologies"}]',
    NOW() - INTERVAL '58 minutes'
),

-- Norwegian messages
(
    gen_random_uuid(),
    'Hei! Hvordan kan jeg hjelpe deg med programvareutviklingen din?',
    'assistant',
    'sent',
    'no',
    NULL,
    NOW() - INTERVAL '1 hour'
),
(
    gen_random_uuid(),
    'Jeg trenger hjelp med å velge riktig teknologistakk for prosjektet mitt.',
    'user',
    'sent',
    'no',
    NULL,
    NOW() - INTERVAL '59 minutes'
),
(
    gen_random_uuid(),
    'Jeg hjelper deg gjerne med å velge riktig teknologistakk. Basert på vår ekspertise hos Xala, anbefaler jeg:\n\n1. **Frontend**:\n- Next.js for server-side rendering\n- React for komponentbasert UI\n- TailwindCSS for styling\n\n2. **Backend**:\n- Node.js med Express\n- PostgreSQL for datalagring\n- Redis for hurtigbufring\n\nVil du at jeg skal forklare hvorfor disse teknologiene vil være fordelaktige for prosjektet ditt?',
    'assistant',
    'sent',
    'no',
    '[{"title": "Teknologistakk", "url": "/technologies"}]',
    NOW() - INTERVAL '58 minutes'
);
