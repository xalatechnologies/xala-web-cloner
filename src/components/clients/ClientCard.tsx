import { useState } from 'react';

interface ClientCardProps {
  name: string;
  logoUrl: string;
}

const ClientCard = ({ name, logoUrl }: ClientCardProps) => {
  const [imgError, setImgError] = useState(false);

  /*
   * Load the file the data names, and nothing else.
   *
   * This used to rewrite every `.svg` to `.png` and try that first, falling
   * back to the real file on error. No such PNGs exist, so each of the seven
   * SVG-logo clients cost a guaranteed 404 and a console error on every visit
   * to the front page — the fallback worked, which is exactly why it went
   * unnoticed. clients.json already names the correct extension per client.
   */

  return (
    <div className="group relative h-24 flex items-center justify-center p-4 rounded-xl transition-all duration-500">
      <div className="absolute inset-0 rounded-xl client-card" />

      {!imgError ? (
        <div className="relative w-full h-full flex items-center justify-center p-2">
          <div className="w-full h-full flex items-center justify-center rounded-lg client-logo-container p-3">
            <img
              src={logoUrl}
              alt={name}
              onError={() => setImgError(true)}
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center p-2">
          <span className="px-3 py-1 rounded-md client-card-fallback text-sm font-medium">
            {name}
          </span>
        </div>
      )}
    </div>
  );
};

export default ClientCard;