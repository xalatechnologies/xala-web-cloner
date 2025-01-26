import React, { useState } from 'react';
import { Button } from './button';
import { ChevronDown } from 'lucide-react';

interface ExpandableGridProps {
  items: React.ReactNode[];
  initialRows?: number;
}

const ExpandableGrid = ({ items, initialRows = 1 }: ExpandableGridProps) => {
  const itemsPerRow = {
    sm: 1,  // Mobile: 1 item per row
    md: 2,  // Tablet: 2 items per row
    lg: 3,  // Desktop: 3 items per row
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleItems.map((item, index) => (
          <div key={index} className="animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
            {item}
          </div>
        ))}
      </div>

      {visibleRows < totalRows && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={handleShowMore}
            className="group relative overflow-hidden rounded-full px-8 py-2 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_20px_rgba(0,118,255,0.4)] bg-gradient-to-r from-blue-600 to-violet-600 text-white"
          >
            <span className="relative z-10 flex items-center gap-2">
              Show More <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </span>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 transition-opacity group-hover:opacity-100" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExpandableGrid;