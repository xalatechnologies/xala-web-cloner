import ProductCard from './ProductCard';
import type { Tables } from '@/integrations/supabase/types';

interface ProductGridProps {
  products: Tables<'products'>[];
  columns: number;
  rows?: number;
}

const ProductGrid = ({ products, columns, rows = 1 }: ProductGridProps) => {
  return (
    <div 
      className="grid gap-8"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          icon={product.icon}
          image_url={product.image_url}
        />
      ))}
    </div>
  );
};

export default ProductGrid;