import ProductCard from './ProductCard';
import type { Tables } from '@/integrations/supabase/types';

interface ProductGridProps {
  products: Tables<'products'>[];
  columns: number;
}

const ProductGrid = ({ products, columns }: ProductGridProps) => {
  return (
    <div 
      className="grid gap-8"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
        />
      ))}
    </div>
  );
};

export default ProductGrid;