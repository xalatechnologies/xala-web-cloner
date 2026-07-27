import { useState } from 'react';

interface ClientLogoProps {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
}

/**
 * One client, as a monochrome mark with its name in text.
 *
 * `brightness-0` flattens any source artwork to solid black regardless of its
 * own colours, and `invert` in dark mode turns that to solid white — the same
 * treatment the case cards already use. That is what makes a light card
 * unnecessary: the mark adapts to the surface instead of the surface having to
 * accommodate the mark.
 *
 * The name is rendered, not just used as alt text. Logos are images, and an
 * image is not a citable claim about who this company works with.
 */
const ClientLogo = ({ name, logoUrl, websiteUrl }: ClientLogoProps) => {
  const [failed, setFailed] = useState(false);

  const content = (
    <>
      {!failed ? (
        <img
          src={logoUrl}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-8 w-auto max-w-[80%] object-contain opacity-70 brightness-0 transition-opacity duration-300 group-hover:opacity-100 dark:invert"
        />
      ) : (
        <span aria-hidden="true" className="text-sm font-semibold text-muted-foreground">
          {name}
        </span>
      )}
      <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {name}
      </span>
    </>
  );

  const shared =
    'group flex min-h-[6.5rem] w-[10.5rem] flex-col items-center justify-center gap-2.5 rounded-xl px-4 py-5 text-center transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:w-[11.5rem]';

  if (!websiteUrl) return <div className={shared}>{content}</div>;

  return (
    <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={shared}>
      {content}
      <span className="sr-only">(åpnes i ny fane)</span>
    </a>
  );
};

export default ClientLogo;
