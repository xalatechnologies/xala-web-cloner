import { Image, Package } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  icon?: string | null;
  image_url: string;
}

const ProductCard = ({ title, description, icon, image_url }: ProductCardProps) => {
  return (
    <div className="group h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/50 
                  transition-all duration-500 hover:transform hover:-translate-y-2
                  hover:shadow-xl hover:shadow-primary/15 relative overflow-hidden">
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 
                      group-hover:from-primary/5 group-hover:via-transparent group-hover:to-primary/10 
                      transition-all duration-500 pointer-events-none" />

      <div className="flex flex-col h-full relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative group-hover:scale-110 transition-transform duration-300">
            {/* Icon glow effect */}
            <div className="absolute inset-0 bg-primary/25 rounded-lg blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {icon ? (
              <Package className="w-8 h-8 text-primary relative z-10" />
            ) : (
              <Image className="w-8 h-8 text-primary relative z-10" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-primary">
            {title}
          </h3>
        </div>

        {image_url && (
          <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <img
              src={image_url}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}

        <p className="text-lg text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;