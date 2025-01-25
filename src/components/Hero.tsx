import { useEffect, useState } from 'react';
import { Brain, CircuitBoard, Cpu, Database, Network, Server } from 'lucide-react';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <CircuitBoard className="absolute w-16 h-16 text-[#9b87f5] animate-float-1" style={{ top: '15%', left: '10%' }} />
        <Cpu className="absolute w-12 h-12 text-[#F97316] animate-float-2" style={{ top: '40%', right: '15%' }} />
        <Database className="absolute w-14 h-14 text-[#0EA5E9] animate-float-3" style={{ bottom: '20%', left: '20%' }} />
        <Network className="absolute w-16 h-16 text-[#D946EF] animate-float-2" style={{ top: '25%', right: '25%' }} />
        <Server className="absolute w-14 h-14 text-[#8B5CF6] animate-float-1" style={{ bottom: '30%', right: '10%' }} />
        <Brain className="absolute w-16 h-16 text-[#F97316] animate-float-3" style={{ top: '35%', left: '30%' }} />
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
          Building Digital <span className="text-xala-accent">Excellence</span>
        </h1>
        <p className="text-xl sm:text-2xl text-xala-text mb-8 max-w-2xl mx-auto">
          We create innovative software solutions that drive business growth
        </p>
        <a
          href="#contact"
          className="inline-block bg-xala-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;