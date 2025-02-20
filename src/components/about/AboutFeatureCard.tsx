import { Brain, Rocket, Users, Code2, LucideIcon } from 'lucide-react';

interface AboutFeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  rocket: Rocket,
  users: Users,
  code: Code2,
};

const AboutFeatureCard = ({ title, description, icon }: AboutFeatureCardProps) => {
  const Icon = iconMap[icon.toLowerCase()] || Brain;

  return (
    <div 
      className="group h-full p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#9b87f5]/50 
                backdrop-blur-sm transition-all duration-500 hover:transform hover:-translate-y-1
                hover:shadow-lg hover:shadow-[#9b87f5]/10"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#9b87f5]/20 to-transparent 
                      flex items-center justify-center text-[#9b87f5] group-hover:text-white
                      group-hover:from-[#9b87f5] group-hover:to-[#D946EF] transition-all duration-500">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#9b87f5] transition-colors">
            {title}
          </h3>
        </div>
        
        <p className="text-sm sm:text-base text-white/70 group-hover:text-white/90 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AboutFeatureCard;