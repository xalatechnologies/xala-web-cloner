import React, { useState } from 'react';
import { Button } from './button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpandableGridProps {
  items: React.ReactNode[];
  itemsPerRow?: number;
  initialRows?: number;
}

const ExpandableGrid = ({
  items,
  itemsPerRow = 3,
  initialRows = 1,
}: ExpandableGridProps) => {
  const [visibleRows, setVisibleRows] = useState(initialRows);
  const totalRows = Math.ceil(items.length / itemsPerRow);
  const visibleItems = items.slice(0, visibleRows * itemsPerRow);

  const handleShowMore = () => {
    setVisibleRows(prev => Math.min(prev + 1, totalRows));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className="opacity-0 animate-fade-in"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'forwards'
            }}
          >
            {item}
          </div>
        ))}
      </div>
      
      {visibleRows < totalRows && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={handleShowMore}
            className="group relative overflow-hidden bg-gradient-to-r from-xala-accent/80 to-purple-500/80 hover:from-xala-accent hover:to-purple-500 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Show More
              <ChevronDown className="w-5 h-5 group-hover:animate-bounce" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-xala-accent to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExpandableGrid;