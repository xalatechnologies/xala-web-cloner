interface SectionGridProps {
  children: React.ReactNode;
  columns?: number;
  rows?: number;
}

const SectionGrid = ({ children, columns = 3, rows = 1 }: SectionGridProps) => {
  return (
    <div 
      className={`grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`}
      style={{
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
      }}
    >
      {children}
    </div>
  );
};

export default SectionGrid;