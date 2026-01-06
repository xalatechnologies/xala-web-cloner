-- Update client logo URLs to prefer PNG variants when present.
-- This is safe/idempotent; if PNGs are not available it won't break rendering because the UI falls back to SVG.

UPDATE public.clients
SET logo_url = regexp_replace(logo_url, '\\.svg$', '.png')
WHERE logo_url ~* '\\.svg$';


