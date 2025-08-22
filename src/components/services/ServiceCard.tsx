import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  const IconComponent = icon ? (LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon) : null;

  return (
    <div 
      className="group h-full p-4 sm:p-6 lg:p-8 rounded-xl bg-card border border-border hover:border-primary/50 
                 transition-all duration-500 hover:transform hover:-translate-y-1
                 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="w-12 h-12 rounded-lg bg-[linear-gradient(135deg,hsla(var(--primary),0.12),transparent)] 
                      flex items-center justify-center text-primary transition-all duration-500">
            {IconComponent && <IconComponent className="w-6 h-6" />}
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-primary">
            {title}
          </h3>
        </div>
        
        <p className="text-base sm:text-lg text-muted-foreground transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;