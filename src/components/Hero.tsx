import { useEffect, useState } from 'react';
import { Brain, CircuitBoard, Cpu, Database, Network, Server, ArrowRight, Cloud as CloudIcon, Code, BarChart as ChartIcon, Twitter, Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
    { href: 'https://github.com', label: 'GitHub', icon: Github },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    console.log('Scrolling to section:', sectionId, 'Element found:', !!section);
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary animate-gradient-x"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"></div>
      
      {/* Social Icons */}
      <div className="absolute top-8 right-8 z-20">
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-xala-accent/20 to-[#9b87f5]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:border-xala-accent/50 transition-all duration-300">
                  <IconComponent className="w-5 h-5 text-xala-accent" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Floating Icons with enhanced animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <CircuitBoard className="absolute w-12 h-12 text-[#9b87f5]/20 animate-float-1" style={{ top: '15%', left: '10%' }} />
        <Cpu className="absolute w-10 h-10 text-[#F97316]/20 animate-float-2" style={{ top: '40%', right: '15%' }} />
        <Database className="absolute w-14 h-14 text-[#0EA5E9]/20 animate-float-3" style={{ bottom: '20%', left: '20%' }} />
        <Network className="absolute w-16 h-16 text-[#D946EF]/20 animate-float-2" style={{ top: '25%', right: '25%' }} />
        <Server className="absolute w-12 h-12 text-[#8B5CF6]/20 animate-float-1" style={{ bottom: '30%', right: '10%' }} />
        <Brain className="absolute w-14 h-14 text-[#F97316]/20 animate-float-3" style={{ top: '35%', left: '30%' }} />
      </div>
      
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="space-y-8 text-center">
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
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-5xl mx-auto my-12">
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
                  <Brain className="w-8 h-8 text-xala-accent" />
                </div>
                <h3 className="text-lg font-semibold text-xala-accent">AI Solutions</h3>
                <p className="text-sm text-xala-text/80">Intelligent systems for smarter decisions</p>
              </div>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
                  <CloudIcon className="w-8 h-8 text-xala-accent" />
                </div>
                <h3 className="text-lg font-semibold text-xala-accent">Cloud Integration</h3>
                <p className="text-sm text-xala-text/80">Scalable cloud infrastructure solutions</p>
              </div>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
                  <Code className="w-8 h-8 text-xala-accent" />
                </div>
                <h3 className="text-lg font-semibold text-xala-accent">Custom Development</h3>
                <p className="text-sm text-xala-text/80">Tailored applications for your needs</p>
              </div>
            </div>
            <div className="group p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-xala-accent/50 transition-all duration-300">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-lg bg-xala-accent/10 group-hover:bg-xala-accent/20 transition-colors">
                  <ChartIcon className="w-8 h-8 text-xala-accent" />
                </div>
                <h3 className="text-lg font-semibold text-xala-accent">Data Analytics</h3>
                <p className="text-sm text-xala-text/80">Transform data into insights</p>
              </div>
            </div>
          </div>

          {/* Updated CTA buttons with smooth scroll */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={() => scrollToSection('contact')}
              className="group px-8 py-6 rounded-lg font-medium 
                       transition-all transform hover:scale-105
                       shadow-lg shadow-xala-accent/20
                       bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7E69AB]
                       hover:from-[#8B5CF6] hover:via-[#7E69AB] hover:to-[#9b87f5]
                       text-white"
            >
              Get in touch
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection('work-process')}
              variant="outline"
              className="group px-8 py-6 bg-white/5 text-white rounded-lg font-medium 
                       hover:bg-white/10 transition-all backdrop-blur-sm
                       border border-white/20"
            >
              Our Process
              <ArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Button>
            <Button
              onClick={() => scrollToSection('about')}
              variant="outline"
              className="group px-8 py-6 bg-white/5 text-white rounded-lg font-medium 
                       hover:bg-white/10 transition-all backdrop-blur-sm
                       border border-white/20"
            >
              About us
              <ArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;