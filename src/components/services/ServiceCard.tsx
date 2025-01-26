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
      className="group p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#9b87f5]/50 
                 backdrop-blur-sm transition-all duration-500 hover:transform hover:-translate-y-1
                 hover:shadow-lg hover:shadow-[#9b87f5]/10"
    >
      <div className="space-y-4">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#9b87f5]/20 to-transparent 
                    flex items-center justify-center text-[#9b87f5] group-hover:text-white
                    group-hover:from-[#9b87f5] group-hover:to-[#D946EF] transition-all duration-500">
          {IconComponent && <IconComponent className="w-8 h-8" />}
        </div>
        <h3 className="text-xl font-semibold text-white group-hover:text-[#9b87f5] transition-colors">
          {title}
        </h3>
        <p className="text-white/70 group-hover:text-white/90 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;