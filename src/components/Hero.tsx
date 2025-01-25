import { useEffect, useState } from 'react';
import { Brain, CircuitBoard, Cpu, Database, Network, Server } from 'lucide-react';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with enhanced gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary animate-gradient-x"></div>
      
      {/* Floating Icons with reduced opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <CircuitBoard className="absolute w-16 h-16 text-[#9b87f5]/40 animate-float-1" style={{ top: '15%', left: '10%' }} />
        <Cpu className="absolute w-12 h-12 text-[#F97316]/40 animate-float-2" style={{ top: '40%', right: '15%' }} />
        <Database className="absolute w-14 h-14 text-[#0EA5E9]/40 animate-float-3" style={{ bottom: '20%', left: '20%' }} />
        <Network className="absolute w-16 h-16 text-[#D946EF]/40 animate-float-2" style={{ top: '25%', right: '25%' }} />
        <Server className="absolute w-14 h-14 text-[#8B5CF6]/40 animate-float-1" style={{ bottom: '30%', right: '10%' }} />
        <Brain className="absolute w-16 h-16 text-[#F97316]/40 animate-float-3" style={{ top: '35%', left: '30%' }} />
      </div>

      {/* Content with enhanced visual hierarchy */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="space-y-8">
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
            Building Digital{' '}
            <span className="bg-gradient-to-r from-xala-accent to-[#D946EF] text-transparent bg-clip-text">
              Excellence
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-xala-text/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            We create innovative software solutions that drive business growth and transform ideas into reality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-xala-accent text-white rounded-lg font-medium 
                       hover:bg-opacity-90 transition-all transform hover:scale-105
                       shadow-lg shadow-xala-accent/20"
            >
              Get Started
            </a>
            <a
              href="#services"
              className="px-8 py-4 bg-white/10 text-white rounded-lg font-medium 
                       hover:bg-white/20 transition-all backdrop-blur-sm
                       border border-white/20"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;