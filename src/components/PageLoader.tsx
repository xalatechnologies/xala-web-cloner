import { useEffect, useState } from 'react';

const LOGO_SRC = '/LOGO/PNG/Asset 4@6x.png';
const LOGO_SRC_DARK = '/LOGO/PNG/Asset 3@6x.png';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress: fast start, slow approach to 90%, then hold until unmount
    const duration = 1200;
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // Ease-out: fast then slow, cap at 90% until page actually loads
      const p = t < 1 ? 90 * (1 - Math.pow(1 - t, 2)) : 90;
      setProgress(p);
      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Use green logo on light, white on dark (match navbar behavior)
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  const logoSrc = isDark ? LOGO_SRC_DARK : LOGO_SRC;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-background"
      role="status"
      aria-label="Laster siden"
    >
      <img
        src={logoSrc}
        alt="Xala"
        className="h-12 w-auto object-contain sm:h-14 md:h-16"
        width={160}
        height={64}
      />
      <div className="w-full max-w-xs px-4 sm:max-w-sm">
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
