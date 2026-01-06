import React from 'react';

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Static gradients */}
          <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" />
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="100%" stopColor="currentColor" />
          </linearGradient>

          {/* Circuit pattern with counter-rotation */}
          <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M5 5h10v10h-10z M2 10h3 M10 2v3 M15 10h3 M10 15v3"
              stroke="url(#mainGradient)"
              strokeWidth="0.5"
              opacity="0.3"
              />
          </pattern>

          {/* Enhanced metallic effect */}
          <filter id="enhancedMetallic">
            <feDiffuseLighting in="SourceGraphic" result="light" lightingColor="white">
              <feDistantLight azimuth="240" elevation="20"/>
            </feDiffuseLighting>
            <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
            <feGaussianBlur stdDeviation="1"/>
            <feComposite in="SourceGraphic" operator="over"/>
          </filter>

          {/* Gentle glow */}
          <filter id="cyberGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
            <feFlood floodColor="currentColor" floodOpacity="0.35" result="color"/>
            <feComposite in="color" in2="blur" operator="in" result="glow"/>
            <feMerge>
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Static background */}
        <rect x="0" y="0" width="100" height="100" fill="url(#circuit)"/>

        {/* Static container (no rotation) */}
        <g>

          {/* Glowing background X */}
          <g filter="url(#cyberGlow)">
            <path
              d="M25 25 L75 75 M75 25 L25 75"
              strokeWidth="12"
              strokeLinecap="round"
              stroke="url(#mainGradient)"
              opacity="0.6"
            />
          </g>

          {/* Main X with enhanced metallic effect */}
          <g filter="url(#enhancedMetallic)">
            <path
              d="M25 25 L75 75 M75 25 L25 75"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="url(#mainGradient)"
              className="opacity-90"
            />
          </g>

          {/* Circuit details */}
          <g className="circuit-details">
            {/* Corner circuits */}
            <path
              d="M15 15 h10 v10 M85 15 h-10 v10 M15 85 h10 v-10 M85 85 h-10 v-10"
              stroke="url(#mainGradient)"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Data flow lines */}
            <path
              d="M10 50 h15 M75 50 h15 M50 10 v15 M50 75 v15"
              stroke="url(#mainGradient)"
              strokeWidth="1"
              strokeDasharray="4 2"
            />
          </g>
        </g>

        {/* Static energy core */}
        <circle
          cx="50"
          cy="50"
          r="4"
          fill="url(#mainGradient)"
          filter="url(#cyberGlow)"
        />

        {/* Simplified micro icons ring around the X - reduced from 8 to 4 for better visibility */}
        <g stroke="url(#mainGradient)" strokeWidth="1.8" fill="none" opacity="1">
          {/* AI (brain) - Top */}
          <g transform="translate(50 50) rotate(0) translate(0 -36)">
            <path d="M-5 -3c2.5-2.5 7.5-2.5 10 0m-12.5 3.5h15m-12.5 3.5c2.5 2.5 7.5 2.5 10 0" />
            <circle cx="-3" cy="0" r="1.5" />
            <circle cx="3" cy="0" r="1.5" />
          </g>
          {/* Database (cylinder) - Right */}
          <g transform="translate(50 50) rotate(90) translate(0 -36)">
            <ellipse cx="0" cy="-4.5" rx="6" ry="2.8" />
            <rect x="-6" y="-4.5" width="12" height="9" rx="1.5" />
            <ellipse cx="0" cy="4.5" rx="6" ry="2.8" />
          </g>
          {/* Cloud - Bottom */}
          <g transform="translate(50 50) rotate(180) translate(0 -36)">
            <path d="M-6 2a4 4 0 1 1 4.5-5 3.5 3.5 0 1 1 2.3 6.5h-6.8z" />
          </g>
          {/* Chip - Left */}
          <g transform="translate(50 50) rotate(270) translate(0 -36)">
            <rect x="-5" y="-5" width="10" height="10" rx="1.5" />
            <line x1="-8" y1="0" x2="-5" y2="0" />
            <line x1="8" y1="0" x2="5" y2="0" />
            <line x1="0" y1="-8" x2="0" y2="-5" />
            <line x1="0" y1="8" x2="0" y2="5" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Logo;