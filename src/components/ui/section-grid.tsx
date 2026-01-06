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
        gridAutoRows: 'auto'
      }}
    >
      {children}
    </div>
  );
};

export default SectionGrid;