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
    <div 
      className="group relative h-24 flex items-center justify-center p-4 rounded-xl hover:shadow-card transition-all duration-500"
    >
      <div className="absolute inset-0 rounded-xl bg-card border border-border dark:bg-xala-secondary dark:border-primary/20" />
      
      {!imgError ? (
        <div className="relative w-full h-full flex items-center justify-center p-2">
          <div className="w-full h-full flex items-center justify-center rounded-md bg-white">
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
              className="h-14 sm:h-16 w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center p-2">
          <span className="px-3 py-1 rounded-md bg-surface text-muted-foreground border border-border text-sm font-medium">
            {name}
          </span>
        </div>
      )}

      <div className="absolute bottom-1 left-0 w-full text-center opacity-0 transform translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        <span className="text-sm text-muted-foreground dark:text-white font-medium">
          {name}
        </span>
      </div>
    </div>
  );
};

export default ClientCard;