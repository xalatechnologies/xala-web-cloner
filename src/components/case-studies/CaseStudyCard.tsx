import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon?: string;
  link?: string;
  metrics?: Array<{ id: string; name: string; value: string; category: string; }>;
}

const CaseStudyCard = ({ title, description, imageUrl, icon, link, metrics }: CaseStudyCardProps) => {
  // Companies that need larger logos (20% larger than the default 80%)
  const needsLargerLogo = [
    'NOV', 
    'Altinn', 
    'Norwegian', 
    'Nordre Follo', 
    'Furst', 
    'SpareBank 1'
  ].includes(title);
  
  // Companies that should keep the original 70% size (Ruter and Telia)
  const keepOriginalSize = ['Ruter', 'Telia'].includes(title);

  // Determine the appropriate size classes
  let sizeClasses = "max-w-[80%] max-h-[80%]"; // Default size for most companies
  
  if (keepOriginalSize) {
    sizeClasses = "max-w-[70%] max-h-[70%]"; // Keep Ruter and Telia at original size
  } else if (needsLargerLogo) {
    sizeClasses = "max-w-[96%] max-h-[96%]"; // 20% larger than 80% (80% * 1.2 = 96%)
  }

  // Debugging: log which companies are getting which sizing
  if (process.env.NODE_ENV === 'development') {
    if (needsLargerLogo) {
      console.log(`[CaseStudyCard] ${title} - Larger logo applied (96%)`);
    } else if (keepOriginalSize) {
      console.log(`[CaseStudyCard] ${title} - Original size applied (70%)`);
    } else {
      console.log(`[CaseStudyCard] ${title} - Default size applied (80%)`);
    }
  }

  return (
    <Card 
      className="group h-full relative overflow-hidden bg-card text-card-foreground border border-border hover:border-primary/50 transition-all duration-300"
    >
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative h-40 overflow-hidden bg-white flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className={cn("object-contain", sizeClasses)}
          />
          <div className="absolute inset-0 hidden dark:block bg-gradient-to-t from-xala-primary/90 to-transparent opacity-20" />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-primary mb-3">
            {title}
          </h3>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStudyCard;