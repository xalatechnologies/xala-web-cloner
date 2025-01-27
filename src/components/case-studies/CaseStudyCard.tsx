import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface CaseStudyCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon?: string;
  link?: string;
  metrics?: any[];
}

const CaseStudyCard = ({ title, description, imageUrl, icon, link, metrics }: CaseStudyCardProps) => {
  return (
    <Card 
      className="group h-full relative overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm 
                 border border-white/10 hover:border-xala-accent/50 transition-all duration-300"
    >
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-xala-primary/90 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xala-accent">
            {icon && (
              <img 
                src={icon} 
                alt="" 
                className="w-6 h-6"
              />
            )}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-xala-accent mb-3">
              {title}
            </h3>
            <p className="text-xala-text/70 mb-4">
              {description}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xala-accent group/link cursor-pointer mt-auto">
            <span className="font-medium">Read More</span>
            <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStudyCard;