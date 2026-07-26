import ProductCard from './ProductCard';
import ExpandableGrid from '../ui/expandable-grid';

/** Matches an entry in src/data/products.json. */
export interface ProductItem {
  id: string;
  title: string;
  description: string;
  /** products.json has no image field today; kept optional for future data. */
  image_url?: string;
  icon?: string | null;
  url?: string;
  features?: string[];
}

interface ProductGridProps {
  products: ProductItem[];
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
      url={product.url}
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