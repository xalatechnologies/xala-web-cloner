-- Add "Blogg" / "Blog" to the site navigation.
--
-- The navbar and footer are data, not code: Navbar.tsx reads menu_items via
-- useMenuItems() and Footer.tsx queries the same table. So shipping the /blogg
-- route is not enough to make it reachable — without these rows the blog exists
-- and is indexed but nothing on the site links to it, which is also the worst
-- case for SEO (an orphan page carries no internal link equity).
--
-- sort_order 55 puts it after the main sections and before Kontakt; adjust to
-- taste. `location` matches whatever the existing rows use for the header.
--
-- CANNOT BE APPLIED YET. The configured Supabase project
-- (ttvpsjeucewnenjevfhh.supabase.co) does not resolve in DNS, so there is no
-- database to run this against and the navigation is already non-functional
-- for reasons unrelated to the blog. See XWEB-2. Run this once a backend
-- exists again; until then /blogg is reachable by URL, sitemap and RSS.

INSERT INTO public.menu_items (name, href, language, location, sort_order)
SELECT v.name, v.href, v.language::supported_language, v.location, v.sort_order
FROM (VALUES
  ('Blogg', '/blogg', 'no', 'header', 55),
  ('Blog',  '/blogg', 'en', 'header', 55),
  ('Blogg', '/blogg', 'no', 'footer', 55),
  ('Blog',  '/blogg', 'en', 'footer', 55)
) AS v(name, href, language, location, sort_order)
WHERE NOT EXISTS (
  SELECT 1 FROM public.menu_items m
  WHERE m.href = v.href
    AND m.language = v.language::supported_language
    AND m.location = v.location
);
