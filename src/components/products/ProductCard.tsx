import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { resolveIcon } from '@/lib/icons';
import type { LucideIcon } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  icon?: string | null;
  /** Internal route for this product's page. */
  to?: string;
  comingSoon?: boolean;
}

/**
 * One product, linking to its own page.
 *
 * It used to link straight out to the product's external site. Two of the
 * three domains do not resolve, so those cards sent people to a connection
 * error, and the one that does resolve handed its authority to another domain
 * instead of keeping it here.
 *
 * The icon is looked up in lucide by name. The previous version rendered
 * `<Package>` whenever an icon name was present at all, so every product on
 * the page showed the same box.
 */
const ProductCard = ({ title, description, icon, to, comingSoon }: ProductCardProps) => {
  const { t } = useTranslation();
  const Icon = resolveIcon(icon, 'Package');

  const body = (
    <>
      <div className="flex items-center gap-3">
        <span className="card-icon group-hover:bg-primary/20">
          <Icon aria-hidden="true" />
        </span>
        <h3 className="card-heading">{title}</h3>
        {comingSoon && (
          <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {t('products.comingSoon', 'Kommer')}
          </span>
        )}
      </div>

      <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{description}</p>

      {to && (
        <span className="mt-6 inline-flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-primary">
          {t('products.readMore', 'Les mer')}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      )}
    </>
  );

  const className =
    'group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:p-8';

  if (!to) return <div className={className}>{body}</div>;

  return (
    <Link to={to} className={className}>
      {body}
    </Link>
  );
};

export default ProductCard;
