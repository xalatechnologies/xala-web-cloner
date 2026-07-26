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
      className="group h-full p-4 sm:p-6 rounded-xl bg-card border border-border hover:border-primary/50 
                transition-all duration-500 hover:transform hover:-translate-y-1
                hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[linear-gradient(135deg,hsla(var(--primary),0.12),transparent)] 
                      flex items-center justify-center text-primary transition-all duration-500">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-primary">
            {title}
          </h2>
        </div>
        
        <p className="text-sm sm:text-base text-muted-foreground transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AboutFeatureCard;