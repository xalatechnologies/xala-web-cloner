import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaseStudyCardProps {
  title: string;
  description: string | null;
  imageUrl: string | null;
  icon?: string | null;
  link?: string;
  slug?: string;
  metrics?: Array<{ id: string; name: string; value: string; category: string }>;
}

// Companies that need larger logos
const LARGER_LOGO = ['NOV', 'Altinn', 'Norwegian', 'Nordre Follo', 'Furst', 'SpareBank 1'];
const SMALLER_LOGO = ['Ruter', 'Telia'];

const CaseStudyCard = ({
  title,
  description,
  imageUrl,
  slug,
}: CaseStudyCardProps) => {
  const { t } = useTranslation();
  const sizeClass = LARGER_LOGO.includes(title)
    ? 'max-w-[96%] max-h-[96%]'
    : SMALLER_LOGO.includes(title)
    ? 'max-w-[70%] max-h-[70%]'
    : 'max-w-[80%] max-h-[80%]';

  const isLinked = Boolean(slug);

  const inner = (
    <div
      className={cn(
        'group h-full flex flex-col rounded-2xl border overflow-hidden transition-all duration-300',
        isLinked
          ? 'bg-card border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 cursor-pointer'
          : 'bg-card border-border opacity-90'
      )}
    >
      {/* Logo area */}
      <div className="relative h-44 overflow-hidden bg-white flex items-center justify-center">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className={cn(
              'object-contain transition-transform duration-500',
              sizeClass,
              isLinked && 'group-hover:scale-105'
            )}
          />
        )}
        {/* green gradient overlay on hover for linked cards */}
        {isLinked && (
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3
          className={cn(
            'text-lg font-semibold mb-3 transition-colors duration-200',
            isLinked ? 'text-primary group-hover:text-primary/80' : 'text-muted-foreground'
          )}
        >
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>

        {/* CTA row */}
        <div className="mt-5 pt-4 border-t border-border">
          {isLinked ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200">
              {t('caseStudy.readMore')}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          ) : (
            <span className="text-xs text-muted-foreground/50 font-medium uppercase tracking-wider">
              {t('caseStudy.comingSoon')}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (isLinked) {
    return (
      <Link to={`/caser/${slug}`} className="block h-full">
        {inner}
      </Link>
    );
  }

  return inner;
};

export default CaseStudyCard;
