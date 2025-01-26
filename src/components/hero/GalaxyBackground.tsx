import React from 'react';

const GalaxyBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Star field layer */}
    <div className="absolute inset-0">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 bg-white rounded-full
            ${i % 3 === 0 ? 'animate-twinkle-1' : i % 3 === 1 ? 'animate-twinkle-2' : 'animate-twinkle-3'}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}
    </div>
    
    {/* Nebula effects */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute w-[800px] h-[800px] rounded-full bg-purple-500/20 blur-3xl -top-[400px] -left-[400px] animate-galaxy-spin" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-3xl -bottom-[300px] -right-[300px] animate-galaxy-spin" style={{ animationDelay: '-20s' }} />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/20 blur-3xl top-[20%] right-[10%] animate-galaxy-spin" style={{ animationDelay: '-40s' }} />
    </div>
  </div>
);

export default GalaxyBackground;