import { useState } from 'react';

interface ClientLogoProps {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
}

/**
 * One client, as a monochrome mark.
 *
 * `brightness-0` flattens any source artwork to solid black whatever its own
 * colours are, and `invert` in dark mode turns that to solid white — the same
 * treatment the case cards use. That is what makes a light card unnecessary:
 * the mark adapts to the surface instead of the surface accommodating the mark.
 *
 * The name is the image's alt text rather than a visible caption. It still
 * reads as text to a crawler and a screen reader — which is the point, since a
 * logo alone is not a citable claim about who this company works with — but a
 * wall of marks does not need each one captioned to be understood.
 */
const ClientLogo = ({ name, logoUrl, websiteUrl }: ClientLogoProps) => {
  const [failed, setFailed] = useState(false);

  const content = failed ? (
    <span className="text-sm font-semibold text-muted-foreground">{name}</span>
  ) : (
    <img
      src={logoUrl}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-12 w-auto max-w-full object-contain opacity-70 brightness-0 transition-opacity duration-300 group-hover:opacity-100 dark:invert md:h-14"
    />
  );

  const shared =
    'group flex h-full min-h-[7rem] items-center justify-center rounded-xl px-5 py-6 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 md:min-h-[8rem]';

  if (!websiteUrl) return <div className={shared}>{content}</div>;

  return (
    <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={shared} title={name}>
      {content}
    </a>
  );
};

export default ClientLogo;
