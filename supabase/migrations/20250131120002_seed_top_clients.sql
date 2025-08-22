-- Seed top clients/partners. Uses upsert pattern to be idempotent across environments.
-- Logos point to local placeholders under /public/clients for now; replace with official SVGs when available.

DO $$
BEGIN
  -- Ensure table exists (safety in case of env drift)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'clients'
  ) THEN
    RAISE NOTICE 'Table public.clients does not exist; skipping seed.';
    RETURN;
  END IF;

  -- Helper upsert using name as natural key
  -- Use filenames that currently exist in /public/clients
  INSERT INTO public.clients (name, logo_url, website_url, sort_order, language)
  VALUES
    ('Statistics Norway', '/clients/ssb.svg', 'https://www.ssb.no', 10, 'en'),
    ('Norsk Helsenett', '/clients/nhn.svg', 'https://www.nhn.no', 20, 'en'),
    ('Sykehuspartner', '/clients/sykehuspartner.svg', 'https://www.sykehuspartner.no', 30, 'en'),
    ('NOV', '/clients/nov2.svg', 'https://www.nov.com', 40, 'en'),
    ('OCHA', '/clients/ocha.png', 'https://www.unocha.org', 50, 'en'),
    ('GlobalConnect', '/clients/globelconnect.png', 'https://www.globalconnect.no', 60, 'en'),
    ('Fürst', '/clients/furst.png', 'https://www.furst.no', 70, 'en'),
    ('USAID', '/clients/usaid.png', 'https://www.usaid.gov', 80, 'en'),
    ('Norwegian', '/clients/norwegian.svg', 'https://www.norwegian.com', 90, 'en'),
    ('Altinn', '/clients/altinn.svg', 'https://www.altinn.no', 100, 'en'),
    ('UNICEF', '/clients/unicef.png', 'https://www.unicef.org', 110, 'en'),
    ('Nordre Follo kommune', '/clients/nordre-follo.svg', 'https://www.nordrefollo.kommune.no', 120, 'en'),
    ('Ruter', '/clients/ruter.png', 'https://www.ruter.no', 140, 'en'),
    ('SpareBank 1', '/clients/sparebank.png', 'https://www.sparebank1.no', 150, 'en')
  ON CONFLICT (name) DO UPDATE SET
    logo_url = EXCLUDED.logo_url,
    website_url = EXCLUDED.website_url,
    sort_order = EXCLUDED.sort_order,
    updated_at = NOW();
END $$;


