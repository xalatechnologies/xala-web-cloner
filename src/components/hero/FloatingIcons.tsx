import React from 'react';
import { Brain, CircuitBoard, Cpu, Database, Network, Server, Sparkles, Star, StarHalf } from 'lucide-react';

const FloatingIcons = () => (
  <>
    {/* Tech icons */}
    <div className="absolute top-20 left-20 animate-float-1">
      <Brain className="w-8 h-8 text-xala-accent/30" />
    </div>
    <div className="absolute top-40 left-40 animate-float-2">
      <CircuitBoard className="w-6 h-6 text-xala-accent/20" />
    </div>
    <div className="absolute top-32 right-24 animate-float-3">
      <Cpu className="w-10 h-10 text-xala-accent/25" />
    </div>
    <div className="absolute top-60 right-40 animate-float-1">
      <Database className="w-7 h-7 text-xala-accent/30" />
    </div>

    {/* Enhanced sparkling stars */}
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className={`absolute ${i % 3 === 0 ? 'animate-twinkle-1' : i % 3 === 1 ? 'animate-twinkle-2' : 'animate-twinkle-3'}`}
        style={{
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 80 + 10}%`,
        }}
      >
        {i % 3 === 0 ? (
          <Sparkles className="w-5 h-5 text-yellow-400/40" />
        ) : i % 3 === 1 ? (
          <Star className="w-4 h-4 text-yellow-400/30" />
        ) : (
          <StarHalf className="w-6 h-6 text-yellow-400/35" />
        )}
      </div>
    ))}

    {/* Bottom clusters */}
    <div className="absolute bottom-32 left-1/4 animate-float-3">
      <Network className="w-9 h-9 text-xala-accent/25" />
    </div>
    <div className="absolute bottom-40 right-1/3 animate-float-2">
      <Server className="w-8 h-8 text-xala-accent/30" />
    </div>
  </>
);

export default FloatingIcons;