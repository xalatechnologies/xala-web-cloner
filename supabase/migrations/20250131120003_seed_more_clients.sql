-- Seed additional partners provided via assets. Uses name as natural key.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='clients'
  ) THEN
    RAISE NOTICE 'clients table missing; skip'; RETURN; END IF;

  INSERT INTO public.clients (name, logo_url, website_url, sort_order, language)
  VALUES
    ('Statistics Norway', '/clients/statistics-norway.svg', 'https://www.ssb.no', 10, 'en')
  ON CONFLICT (name) DO UPDATE SET logo_url=EXCLUDED.logo_url, website_url=EXCLUDED.website_url, sort_order=EXCLUDED.sort_order, updated_at=NOW();
END $$;


