interface SectionGridProps {
  children: React.ReactNode;
  columns?: number;
  rows?: number;
}

const SectionGrid = ({ children, columns = 3, rows = 1 }: SectionGridProps) => {
  return (
    <div 
      className="grid gap-8"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        '@media (max-width: 768px)': {
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'
        },
        '@media (min-width: 769px) and (max-width: 1024px)': {
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
        }
      }}
    >
      {children}
    </div>
  );
};

export default SectionGrid;