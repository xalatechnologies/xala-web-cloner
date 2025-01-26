import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';

interface TechnologyCardProps {
  icon: string;
  title: string;
  description?: string;
  tools?: { id: string; name: string }[];
}

const TechnologyCard = ({ icon, title, description, tools }: TechnologyCardProps) => {
  const IconComponent = icon ? (Icons[icon as keyof typeof Icons] as LucideIcon) : null;

  return (
    <div className="p-6 bg-xala-secondary rounded-xl border border-gray-800 hover:border-xala-accent/50 transition-all duration-300 h-full flex flex-col">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          {IconComponent && <IconComponent className="w-8 h-8 text-xala-accent" />}
          <h3 className="text-xl font-semibold text-xala-accent">{title}</h3>
        </div>
        {description && (
          <p className="text-xala-text mb-6">{description}</p>
        )}
        {tools && tools.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {tools.map((tool) => (
              <span
                key={tool.id}
                className="px-3 py-1 bg-xala-primary rounded-full text-sm text-xala-text"
              >
                {tool.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnologyCard;