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
    <div className="service-card group relative overflow-hidden">
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 
                      group-hover:from-primary/5 group-hover:via-transparent group-hover:to-primary/10 
                      transition-all duration-500 pointer-events-none" />

      <div className="flex flex-col h-full relative z-10">
        {/* Image section - shown if image is provided */}
        {image && (
          <div className="mb-5 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <img
              src={image}
              alt={title}
              className="service-card-image group-hover:scale-110"
              onError={handleImageError}
            />
          </div>
        )}

        <div className="flex items-center gap-4 mb-5">
          <div className="service-card-icon-container text-primary relative group-hover:scale-110 transition-transform duration-300">
            {/* Glow effect behind icon */}
            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {IconComponent && <IconComponent className="w-7 h-7 relative z-10" />}
          </div>
          {/*
            Rendered as text, not as HTML. The title comes from a data file and
            went through dangerouslySetInnerHTML purely to turn `&shy;` into a
            soft hyphen — the break hints are real U+00AD characters now, so
            React can render them directly and the injection surface is gone.

            h3, not h2: these sit under the section's own heading.
          */}
          <h3 className={`service-card-title ${isNorwegian ? 'no' : ''}`}>{processedTitle}</h3>
        </div>

        <p className="service-card-description">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;