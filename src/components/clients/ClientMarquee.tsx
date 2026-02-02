import { useRef, useState } from 'react';
import ClientCard from './ClientCard';

interface Client {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
}

interface ClientMarqueeProps {
  clients: Client[];
  rows?: number;
  speedSeconds?: number; // per 50% traverse
}

const splitEvenly = <T,>(arr: T[], rows: number): T[][] => {
  if (rows <= 1) return [arr.slice()];
  const base = Math.floor(arr.length / rows);
  const extra = arr.length % rows;
  const out: T[][] = [];
  let start = 0;
  for (let r = 0; r < rows; r++) {
    const size = base + (r < extra ? 1 : 0);
    out.push(arr.slice(start, start + size));
    start += size;
  }
  return out;
};

export default function ClientMarquee({ clients, rows = 2, speedSeconds = 45 }: ClientMarqueeProps) {
  if (!clients?.length) return null;

  const rowsData = splitEvenly(clients, rows);

  return (
    <div className="relative">
      <div className="marquee-mask" />
      <div className="space-y-6">
        {rowsData.map((row, idx) => {
          const doubled = [...row, ...row]; // seamless, but unique per row
          const reverse = idx % 2 === 1;
          const duration = speedSeconds; // identical speed both rows
          const scale = idx === 0 ? 1.0 : 0.985; // subtle parallax depth
          const opacity = idx === 0 ? 1.0 : 0.97;
          return (
            <MarqueeRow key={idx} items={doubled} reverse={reverse} duration={duration} scale={scale} opacity={opacity} />
          );
        })}
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse, duration, scale = 1, opacity = 1 }: { items: Client[]; reverse?: boolean; duration: number; scale?: number; opacity?: number }) {
  // Drag-to-scroll interaction using pointer events
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    containerRef.current?.style.setProperty('--drag-offset', `${delta}px`);
  };
  const endDrag = () => {
    setIsDragging(false);
    startXRef.current = 0;
    containerRef.current?.style.setProperty('--drag-offset', '0px');
  };

  return (
    <div className="marquee overflow-hidden" style={{ ['--marquee-duration' as any]: `${duration}s`, transform: `scale(${scale})`, opacity }}>
      <div
        ref={containerRef}
        className={`marquee-inner`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div className={`marquee-row ${reverse ? 'marquee-row-reverse' : ''}`} style={{ animationPlayState: isDragging ? 'paused' as const : 'running' }}>
          {items.map((client, i) => (
            <div key={`${client.id}-${i}-${reverse ? 'rev' : 'fwd'}`} className="w-[280px]">
              <ClientCard name={client.name} logoUrl={client.logo_url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


