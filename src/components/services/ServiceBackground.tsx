import React from 'react';
import { Atom, CircuitBoard, Network, Satellite, Signal, Globe } from 'lucide-react';

const ServiceBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Tech icons with floating animations */}
    <div className="absolute top-20 left-[10%] animate-float-1">
      <Atom className="w-12 h-12 text-primary/10" />
    </div>
    <div className="absolute top-40 right-[15%] animate-float-2">
      <CircuitBoard className="w-10 h-10 text-primary/15" />
    </div>
    <div className="absolute bottom-32 left-[20%] animate-float-3">
      <Network className="w-14 h-14 text-primary/10" />
    </div>
    <div className="absolute top-1/3 right-[25%] animate-float-1">
      <Satellite className="w-16 h-16 text-primary/5" />
    </div>
    
    {/* Additional floating elements */}
    <div className="absolute bottom-40 right-[30%] animate-float-2">
      <Signal className="w-10 h-10 text-primary/15" />
    </div>
    <div className="absolute top-[60%] left-[15%] animate-float-3">
      <Globe className="w-12 h-12 text-primary/10" />
    </div>

    {/* Gradient orbs */}
    <div className="absolute w-[500px] h-[500px] rounded-full bg-orange-600/5 blur-3xl -top-[250px] -left-[250px] animate-galaxy-spin" />
    <div className="absolute w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-3xl -bottom-[200px] -right-[200px] animate-galaxy-spin" style={{ animationDelay: '-20s' }} />
    <div className="absolute w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-3xl top-1/2 right-[10%] animate-galaxy-spin" style={{ animationDelay: '-40s' }} />
  </div>
);

export default ServiceBackground;