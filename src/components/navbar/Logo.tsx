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
          {/* Spinning animation */}
          <animateTransform
            id="spin"
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="10s"
            repeatCount="indefinite"
            additive="sum"
          />

          {/* Enhanced gradients */}
          <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6E3BF4">
              <animate
                attributeName="stop-color"
                values="#6E3BF4; #D946EF; #6E3BF4"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#D946EF">
              <animate
                attributeName="stop-color"
                values="#D946EF; #0EA5E9; #D946EF"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#0EA5E9">
              <animate
                attributeName="stop-color"
                values="#0EA5E9; #6E3BF4; #0EA5E9"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Circuit pattern with counter-rotation */}
          <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M5 5h10v10h-10z M2 10h3 M10 2v3 M15 10h3 M10 15v3"
              stroke="url(#mainGradient)"
              strokeWidth="0.5"
              opacity="0.3"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.6;0.3"
                dur="3s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="360 10 10"
                to="0 10 10"
                dur="20s"
                repeatCount="indefinite"
              />
            </path>
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

          {/* Cyber glow */}
          <filter id="cyberGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
            <feFlood floodColor="#0EA5E9" floodOpacity="0.5" result="color"/>
            <feComposite in="color" in2="blur" operator="in" result="glow"/>
            <feMerge>
              <feMergeNode in="glow"/>
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Advanced glitch */}
          <filter id="advancedGlitch">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="1" result="noise">
              <animate
                attributeName="baseFrequency"
                values="0.01;0.02;0.01"
                dur="0.2s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3"/>
          </filter>
        </defs>

        {/* Static background */}
        <rect x="0" y="0" width="100" height="100" fill="url(#circuit)"/>

        {/* Spinning container */}
        <g>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="10s"
            repeatCount="indefinite"
          />

          {/* Glowing background X */}
          <g filter="url(#cyberGlow)">
            <path
              d="M25 25 L75 75 M75 25 L25 75"
              strokeWidth="12"
              strokeLinecap="round"
              stroke="url(#mainGradient)"
              opacity="0.6"
            >
              <animate
                attributeName="opacity"
                values="0.4;0.8;0.4"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* Main X with enhanced metallic effect */}
          <g filter="url(#enhancedMetallic)">
            <path
              d="M25 25 L75 75 M75 25 L25 75"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="url(#mainGradient)"
              className="opacity-90"
            >
              <animate
                attributeName="filter"
                values="url(#enhancedMetallic);url(#enhancedMetallic) url(#advancedGlitch);url(#enhancedMetallic)"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* Circuit details */}
          <g className="circuit-details">
            {/* Corner circuits */}
            <path
              d="M15 15 h10 v10 M85 15 h-10 v10 M15 85 h10 v-10 M85 85 h-10 v-10"
              stroke="url(#mainGradient)"
              strokeWidth="2"
              opacity="0.6"
            >
              <animate
                attributeName="opacity"
                values="0.4;0.8;0.4"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>

            {/* Data flow lines */}
            <path
              d="M10 50 h15 M75 50 h15 M50 10 v15 M50 75 v15"
              stroke="url(#mainGradient)"
              strokeWidth="1"
              strokeDasharray="4 2"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="6;0;6"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>

        {/* Static energy core */}
        <circle
          cx="50"
          cy="50"
          r="4"
          fill="url(#mainGradient)"
          filter="url(#cyberGlow)"
        >
          <animate
            attributeName="r"
            values="3;5;3"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

export default Logo;