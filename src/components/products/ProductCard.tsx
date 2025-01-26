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
    <div className="group p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#9b87f5]/50 
                  backdrop-blur-sm transition-all duration-500 hover:transform hover:-translate-y-1
                  hover:shadow-lg hover:shadow-[#9b87f5]/10 space-y-4">
      <div className="flex items-center gap-4 mb-4">
        {icon ? (
          <Package className="w-8 h-8 text-[#9b87f5]" />
        ) : (
          <Image className="w-8 h-8 text-[#9b87f5]" />
        )}
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
      
      <h3 className="text-xl font-semibold text-white group-hover:text-[#9b87f5] transition-colors">
        {title}
      </h3>
      <p className="text-white/70 group-hover:text-white/90 transition-colors">
        {description}
      </p>
    </div>
  );
};

export default ProductCard;