import ProductCard from './ProductCard';
import SectionGrid from '../ui/section-grid';
import type { Tables } from '@/integrations/supabase/types';

interface ProductGridProps {
  products: Tables<'products'>[];
  columns: number;
  rows: number;
}

const ProductGrid = ({ products, columns, rows }: ProductGridProps) => {
  return (
    <SectionGrid columns={columns} rows={rows}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          image_url={product.image_url}
          icon={product.icon}
        />
      ))}
    </SectionGrid>
  );
};

export default ProductGrid;