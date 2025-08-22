import { Image, Package } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

interface ProductCardProps {
  title: string;
  description: string;
  icon?: string | null;
  image_url: string;
}

const ProductCard = ({ title, description, icon, image_url }: ProductCardProps) => {
  return (
    <div className="group h-full p-8 rounded-xl bg-card border border-border hover:border-primary/50 
                  transition-all duration-500 hover:transform hover:-translate-y-1
                  hover:shadow-lg hover:shadow-primary/10">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          {icon ? (
            <Package className="w-8 h-8 text-primary" />
          ) : (
            <Image className="w-8 h-8 text-primary" />
          )}
          <h3 className="text-2xl font-semibold text-primary">
            {title}
          </h3>
        </div>
        
        {image_url && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
            <img 
              src={image_url} 
              alt={title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <p className="text-lg text-muted-foreground transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;