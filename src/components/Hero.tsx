import { useEffect, useState } from 'react';
import { Brain, CircuitBoard, Cpu, Database, Network, Server, ArrowRight, Cloud as CloudIcon, BarChart as ChartIcon } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 sm:py-32">
      {/* Enhanced gradient background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary animate-gradient-x"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"></div>
      
      {/* Floating Icons with enhanced animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <CircuitBoard className="absolute w-12 h-12 text-[#9b87f5]/20 animate-float-1" style={{ top: '15%', left: '10%' }} />
        <Cpu className="absolute w-10 h-10 text-[#F97316]/20 animate-float-2" style={{ top: '40%', right: '15%' }} />
        <Database className="absolute w-14 h-14 text-[#0EA5E9]/20 animate-float-3" style={{ bottom: '20%', left: '20%' }} />
        <Network className="absolute w-16 h-16 text-[#D946EF]/20 animate-float-2" style={{ top: '25%', right: '25%' }} />
        <Server className="absolute w-12 h-12 text-[#8B5CF6]/20 animate-float-1" style={{ bottom: '30%', right: '10%' }} />
        <Brain className="absolute w-14 h-14 text-[#F97316]/20 animate-float-3" style={{ top: '35%', left: '30%' }} />
      </div>

      {/* Main content with enhanced visual hierarchy */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="space-y-8 text-center">
          {/* Enhanced badge/label */}
          <div className="inline-block">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-xala-accent">
              Welcome to the Future of Technology
              <span className="ml-2 text-white/50">✨</span>
            </span>
          </div>

          {/* Enhanced heading with gradient text */}
          <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight">
            Building Digital{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-xala-accent via-[#9b87f5] to-[#D946EF] text-transparent bg-clip-text">
                Excellence
              </span>
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-xala-accent/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </span>
          </h1>

          {/* Enhanced description with better typography */}
          <p className="text-xl sm:text-2xl text-xala-text/90 max-w-3xl mx-auto leading-relaxed font-light">
            We create innovative software solutions that drive business growth and transform ideas into reality. 
            Leveraging cutting-edge technology to build tomorrow's digital landscape.
          </p>
          
          {/* Enhanced feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto my-12">
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
                  <Brain className="w-8 h-8 text-xala-accent" />
                </div>
                <h3 className="text-lg font-semibold text-xala-accent">AI-Powered Solutions</h3>
                <p className="text-sm text-xala-text/80">Harness the power of artificial intelligence for smarter business decisions</p>
              </div>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
                  <CloudIcon className="w-8 h-8 text-xala-accent" />
                </div>
                <h3 className="text-lg font-semibold text-xala-accent">Cloud Integration</h3>
                <p className="text-sm text-xala-text/80">Seamless cloud solutions for scalable and secure operations</p>
              </div>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
                  <ChartIcon className="w-8 h-8 text-xala-accent" />
                </div>
                <h3 className="text-lg font-semibold text-xala-accent">Data Analytics</h3>
                <p className="text-sm text-xala-text/80">Transform raw data into actionable business insights</p>
              </div>
            </div>
          </div>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              asChild
              className="group px-8 py-6 bg-xala-accent text-white rounded-lg font-medium 
                       hover:bg-opacity-90 transition-all transform hover:scale-105
                       shadow-lg shadow-xala-accent/20"
            >
              <a href="#contact">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="group px-8 py-6 bg-white/5 text-white rounded-lg font-medium 
                       hover:bg-white/10 transition-all backdrop-blur-sm
                       border border-white/20"
            >
              <a href="#services">
                Learn More
                <ArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;