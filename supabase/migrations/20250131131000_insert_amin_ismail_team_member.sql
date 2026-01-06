-- Insert new teammate: Amin Ismail (EN and NO)
-- Safe upsert by name+language. Update fields if exists.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema='public' AND table_name='team_members'
  ) THEN
    RAISE NOTICE 'team_members table missing; skipping';
    RETURN;
  END IF;

  -- English
  INSERT INTO public.team_members (name, role, description, image_url, linkedin_url, email, language, sort_order)
  VALUES (
    'Amin Ismail',
    'Full‑stack Software Engineer',
    'Full‑stack engineer focused on building reliable, scalable web applications. Experienced with React, TypeScript, Node.js and cloud services. Passionate about clean architecture, developer productivity and crafting delightful user interfaces.',
    '/team/amin.png',
    'https://www.linkedin.com/in/amin-ismail-moh/',
    'amin@xala.no',
    'en',
    999
  )
  ON CONFLICT (id) DO NOTHING;

  -- Norwegian
  INSERT INTO public.team_members (name, role, description, image_url, linkedin_url, email, language, sort_order)
  VALUES (
    'Amin Ismail',
    'Fullstack programvareutvikler',
    'Fullstack‑utvikler med fokus på å bygge robuste og skalerbare webløsninger. Erfaring med React, TypeScript, Node.js og skybaserte tjenester. Brenner for ryddig arkitektur, god utvikleropplevelse og brukervennlige grensesnitt.',
    '/team/amin.png',
    'https://www.linkedin.com/in/amin-ismail-moh/',
    'amin@xala.no',
    'no',
    999
  )
  ON CONFLICT (id) DO NOTHING;
END $$;


