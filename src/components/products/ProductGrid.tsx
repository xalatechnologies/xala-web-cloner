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
  /** Route segment for /produkter/:slug. */
  slug?: string;
  status?: string;
  features?: string[];
  listed?: boolean;
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
      icon={product.icon}
      // The product's own page, not its external site. Two of the three sites
      // do not resolve, so a card linking outward sent people to a connection
      // error; the detail page describes every product, launched or not.
      to={product.slug ? `/produkter/${product.slug}` : undefined}
      comingSoon={product.status === 'coming-soon'}
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