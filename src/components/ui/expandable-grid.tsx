import React, { useState } from 'react';
import { Button } from './button';
import { ChevronDown } from 'lucide-react';

interface ExpandableGridProps {
  items: React.ReactNode[];
  initialRows?: number;
  cols?: number;
}

const ExpandableGrid = ({ items, initialRows = 1, cols = 3 }: ExpandableGridProps) => {
  const itemsPerRow = {
    sm: 1,  // Mobile: 1 item per row
    md: 2,  // Tablet: 2 items per row
    lg: cols,  // Desktop: 3 items per row
  };

  const maxItemsPerRow = Math.max(...Object.values(itemsPerRow));
  const [visibleRows, setVisibleRows] = useState(initialRows);
  const totalRows = Math.ceil(items.length / maxItemsPerRow);
  const visibleItems = items.slice(0, visibleRows * maxItemsPerRow);

  const handleShowMore = () => {
    setVisibleRows(prev => Math.min(prev + 1, totalRows));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
        {visibleItems.map((item, index) => (
          <div key={index} className={`animate-fade-in w-full`}>
            {item}
          </div>
        ))}
      </div>

      {visibleRows < totalRows && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={handleShowMore}
            className="group px-8 py-6 rounded-lg font-medium transition-all transform hover:scale-105
              shadow-lg shadow-primary/20 bg-primary text-primary-foreground"
          >
            <span className="flex items-center gap-2">
              Show More
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExpandableGrid;