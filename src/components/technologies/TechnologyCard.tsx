import { useTranslation } from 'react-i18next';

interface TechnologyCardProps {
  name: string;
  category: string;
  icon: string;
}

const TechnologyCard = ({ name, category, icon }: TechnologyCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="h-full p-4 sm:p-6 bg-card text-card-foreground rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group">
      <div className="flex flex-col items-center h-full text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 flex items-center justify-center">
          <img
            src={icon}
            alt={name}
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <h2 className="text-lg sm:text-xl mb-2">{name}</h2>
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
          {t(`categories.${category}`, category)}
        </span>
      </div>
    </div>
  );
};

export default TechnologyCard;