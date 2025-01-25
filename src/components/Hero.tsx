import { useEffect, useState } from 'react';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center gradient-bg">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
          Building Digital <span className="text-xala-accent">Excellence</span>
        </h1>
        <p className="text-xl sm:text-2xl text-xala-text mb-8 max-w-2xl mx-auto">
          We create innovative software solutions that drive business growth
        </p>
        <a
          href="#contact"
          className="inline-block bg-xala-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;