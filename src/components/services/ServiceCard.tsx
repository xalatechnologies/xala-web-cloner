import { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { processServiceTitle } from '@/utils/text-hyphenation';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  image?: string; // Add optional image prop
  language?: string; // Add language prop to handle Norwegian titles
}

const ServiceCard = ({ icon, title, description, image, language = 'en' }: ServiceCardProps) => {
  const IconComponent = icon ? (LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon) : null;

  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
  };

  // Process title for Norwegian hyphenation
  const processedTitle = processServiceTitle(title, language);

  // Determine if we're using Norwegian
  const isNorwegian = language === 'no' || language === 'nb' || language === 'nn';

  return (
    <div className="service-card group">
      <div className="flex flex-col h-full">
        {/* Image section - shown if image is provided */}
        {image && (
          <div className="mb-5 rounded-xl overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="service-card-image group-hover:scale-110"
              onError={handleImageError}
            />
          </div>
        )}
        
        <div className="flex items-start gap-4 mb-5">
          <div className="service-card-icon-container text-primary">
            {IconComponent && <IconComponent className="w-7 h-7" />}
          </div>
          <h3 className={`service-card-title ${isNorwegian ? 'no' : ''}`} dangerouslySetInnerHTML={{ __html: processedTitle }}>
          </h3>
        </div>
        
        <p className="service-card-description">
          {description}
        </p>
        
        <div className="service-card-cta">
          <span className="service-card-cta-text group">
            Learn more
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;