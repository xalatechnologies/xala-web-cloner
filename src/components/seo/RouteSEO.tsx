import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from './SEO';
import UniversalHead from './UniversalHead';
import { canonicalFor, normalizeLanguage, resolveRoute } from './routeRules';

/**
 * Gives every static route its head tags from one mount point.
 *
 * Before this existed, <SEO> was reachable only through MainLayout, and only
 * two components used MainLayout — so the front page, /produkter,
 * /slik-vi-jobber, /teknologi, /om-oss, /karriere, the three legal pages and
 * the 404 all shipped with no title, description or canonical at all.
 *
 * Six routes manage their own <Helmet> because their metadata depends on
 * content this component cannot see. Those are skipped rather than overridden,
 * so no page emits two titles or two canonicals — but only for the tags that
 * differ per page. The universal ones are rendered here for every route,
 * including the self-managed ones, which is how those six stopped shipping
 * without og:locale, twitter:card, hreflang or a share image.
 */
const RouteSEO = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  const rule = resolveRoute(pathname);
  const canonicalUrl = canonicalFor(pathname);

  // Rendered before the early return: a self-managed page still needs these.
  if (rule.selfManaged) return <UniversalHead canonicalUrl={canonicalUrl} />;

  return (
    <>
      <UniversalHead canonicalUrl={canonicalUrl} />
      <SEO
        pageId={rule.pageId}
        language={normalizeLanguage(i18n.language)}
        canonicalUrl={canonicalUrl}
        ogType={rule.ogType ?? 'website'}
        noIndex={rule.noIndex ?? false}
      />
    </>
  );
};

export default RouteSEO;
