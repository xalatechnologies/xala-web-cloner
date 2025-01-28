import { Brain } from 'lucide-react';

const Logo = () => (
  <a href="#home" className="flex items-center gap-3 group">
    <div className="relative">
      <Brain 
        size={48} 
        className="text-xala-accent rotate-3 transition-all duration-300 group-hover:rotate-6" 
        strokeWidth={1.5} 
      />
      <Brain 
        size={48} 
        className="absolute top-0 left-0 text-[#D946EF] rotate-[-3deg] opacity-50 transition-all duration-300 group-hover:rotate-[-6deg]" 
        strokeWidth={1.5} 
      />
      <Brain 
        size={48} 
        className="absolute top-0 left-0 text-white/10 rotate-[6deg] transition-all duration-300 group-hover:rotate-[9deg]" 
        strokeWidth={1.5} 
      />
    </div>
    <span className="text-3xl font-bold bg-gradient-to-r from-xala-accent via-[#9b87f5] to-[#D946EF] bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_200%] group-hover:animate-gradient-x">
      Xala
    </span>
  </a>
);

export default Logo;