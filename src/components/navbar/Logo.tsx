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
            <stop offset="0%" stopColor="#6E3BF4" />
            <stop offset="50%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#0EA5E9" />
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
            <feFlood floodColor="#0EA5E9" floodOpacity="0.35" result="color"/>
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

        {/* Micro icons ring around the X */}
        <g stroke="url(#mainGradient)" strokeWidth="1.2" fill="none" opacity="0.85">
          {/* AI (brain) */}
          <g transform="translate(50 50) rotate(0) translate(0 -36)">
            <path d="M-4 -2.5c2-2 6-2 8 0m-10 2.5h12m-10 2.5c2 2 6 2 8 0" />
            <circle cx="-2.5" cy="0" r="1.1" />
            <circle cx="2.5" cy="0" r="1.1" />
          </g>
          {/* Database (cylinder) */}
          <g transform="translate(50 50) rotate(45) translate(0 -36)">
            <ellipse cx="0" cy="-3.5" rx="5" ry="2.2" />
            <rect x="-5" y="-3.5" width="10" height="7" rx="1.2" />
            <ellipse cx="0" cy="3.5" rx="5" ry="2.2" />
          </g>
          {/* Web app (browser window) */}
          <g transform="translate(50 50) rotate(90) translate(0 -36)">
            <rect x="-6" y="-5" width="12" height="10" rx="1.8" />
            <line x1="-6" y1="-2.5" x2="6" y2="-2.5" />
            <circle cx="-3.8" cy="-3.7" r="0.7" />
            <circle cx="-1.8" cy="-3.7" r="0.7" />
            <circle cx="0.2" cy="-3.7" r="0.7" />
          </g>
          {/* Applications (grid) */}
          <g transform="translate(50 50) rotate(135) translate(0 -36)">
            <rect x="-5.5" y="-5.5" width="4.5" height="4.5" rx="0.8" />
            <rect x="1" y="-5.5" width="4.5" height="4.5" rx="0.8" />
            <rect x="-5.5" y="1" width="4.5" height="4.5" rx="0.8" />
            <rect x="1" y="1" width="4.5" height="4.5" rx="0.8" />
          </g>
          {/* Cloud */}
          <g transform="translate(50 50) rotate(180) translate(0 -36)">
            <path d="M-5 1.5a3.5 3.5 0 1 1 3.8-4 3 3 0 1 1 1.8 5.5h-5.6z" />
          </g>
          {/* Code brackets */}
          <g transform="translate(50 50) rotate(225) translate(0 -36)">
            <path d="M-5 -4 l-2 2 l2 2 M5 -4 l2 2 l-2 2" />
          </g>
          {/* Chip */}
          <g transform="translate(50 50) rotate(270) translate(0 -36)">
            <rect x="-4" y="-4" width="8" height="8" rx="1.2" />
            <line x1="-7" y1="0" x2="-4" y2="0" />
            <line x1="7" y1="0" x2="4" y2="0" />
            <line x1="0" y1="-7" x2="0" y2="-4" />
            <line x1="0" y1="7" x2="0" y2="4" />
          </g>
          {/* Data flow (arrows) */}
          <g transform="translate(50 50) rotate(315) translate(0 -36)">
            <path d="M-5 0 h7 m0 0 l-2 -2 m2 2 l-2 2" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Logo;