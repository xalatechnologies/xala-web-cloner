import ProductCard from './ProductCard';
import ExpandableGrid from '../ui/expandable-grid';
import type { Tables } from '@/integrations/supabase/types';

interface ProductGridProps {
  products: Tables<'products'>[];
  initialRows?: number;
  cols?: number;
}

const ProductGrid = ({ products, initialRows = 1, cols = 3 }: ProductGridProps) => {
  const productCards = products.map((product) => (
    <ProductCard
      key={product.id}
      title={product.title}
      description={product.description}
      image_url={product.image_url}
      icon={product.icon}
    />
  ));

  return (
    <ExpandableGrid 
      items={productCards}
      initialRows={initialRows}
      cols={cols}
    />
  );
};

export default ProductGrid;