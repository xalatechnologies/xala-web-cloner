import { useState } from 'react';

interface ClientCardProps {
  name: string;
  logoUrl: string;
}

const ClientCard = ({ name, logoUrl }: ClientCardProps) => {
  const [imgError, setImgError] = useState(false);
  const originalUrl = logoUrl;
  const preferPng = originalUrl.endsWith('.svg')
    ? originalUrl.replace(/\.svg$/i, '.png')
    : originalUrl;
  const [src, setSrc] = useState(preferPng);
  const [triedSvg, setTriedSvg] = useState(false);

  return (
    <div className="group relative h-24 flex items-center justify-center p-4 rounded-xl transition-all duration-500">
      <div className="absolute inset-0 rounded-xl client-card" />

      {!imgError ? (
        <div className="relative w-full h-full flex items-center justify-center p-2">
          <div className="w-full h-full flex items-center justify-center rounded-lg client-logo-container p-3">
            <img
              src={src}
              alt={name}
              onError={() => {
                if (!triedSvg && originalUrl !== src) {
                  setTriedSvg(true);
                  setSrc(originalUrl);
                  return;
                }
                setImgError(true);
              }}
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