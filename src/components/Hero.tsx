import { useEffect, useState } from 'react';
import { Brain, CircuitBoard, Cpu, Database, Network, Server, ArrowRight, Cloud as CloudIcon, BarChart as ChartIcon } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-20 sm:py-32">
      {/* Enhanced gradient background with curved lines */}
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary animate-gradient-x">
        <div className="absolute inset-0 opacity-20">
          {/* Curved lines background */}
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,400 Q300,300 600,400 T1200,400" fill="none" stroke="currentColor" strokeWidth="1" className="text-xala-accent/20" />
            <path d="M0,600 Q300,500 600,600 T1200,600" fill="none" stroke="currentColor" strokeWidth="1" className="text-xala-accent/20" />
            <path d="M0,800 Q300,700 600,800 T1200,800" fill="none" stroke="currentColor" strokeWidth="1" className="text-xala-accent/20" />
          </svg>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className={`space-y-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm font-medium text-xala-accent">
                Welcome to the Future of Technology
                <span className="ml-2 text-white/50">✨</span>
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Real Solutions,{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-xala-accent via-[#9b87f5] to-[#D946EF] text-transparent bg-clip-text">
                  Artificial Intelligence
                </span>
              </span>
            </h1>

            <p className="text-xl text-xala-text/90 max-w-2xl leading-relaxed">
              Transform your business with cutting-edge AI solutions. Leverage the power of artificial intelligence to drive innovation and growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                className="group bg-xala-accent hover:bg-xala-accent/90 text-white rounded-full 
                         transform transition-all hover:scale-105 shadow-lg shadow-xala-accent/20"
              >
                Try Demo Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group rounded-full border-white/20 hover:bg-white/10"
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
            </div>
          </div>

          {/* Right column - Floating elements */}
          <div className="relative hidden lg:block h-[600px]">
            {/* Central glowing orb */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-64 h-64 rounded-full bg-xala-accent/5 backdrop-blur-xl animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-24 h-24 text-xala-accent/50" />
                </div>
              </div>
            </div>

            {/* Floating icons with connection lines */}
            <CircuitBoard className="absolute w-12 h-12 text-xala-accent/40 animate-float-1" style={{ top: '15%', left: '10%' }} />
            <Cpu className="absolute w-10 h-10 text-xala-accent/40 animate-float-2" style={{ top: '40%', right: '15%' }} />
            <Database className="absolute w-14 h-14 text-xala-accent/40 animate-float-3" style={{ bottom: '20%', left: '20%' }} />
            <Network className="absolute w-16 h-16 text-xala-accent/40 animate-float-2" style={{ top: '25%', right: '25%' }} />
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {[
            {
              icon: <Brain className="w-8 h-8" />,
              title: "AI-Powered Solutions",
              description: "Harness the power of artificial intelligence for smarter business decisions"
            },
            {
              icon: <CloudIcon className="w-8 h-8" />,
              title: "Cloud Integration",
              description: "Seamless cloud solutions for scalable and secure operations"
            },
            {
              icon: <ChartIcon className="w-8 h-8" />,
              title: "Data Analytics",
              description: "Transform raw data into actionable business insights"
            }
          ].map((feature, index) => (
            <div key={index} className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-xala-accent">{feature.title}</h3>
                <p className="text-sm text-xala-text/80 text-center">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;