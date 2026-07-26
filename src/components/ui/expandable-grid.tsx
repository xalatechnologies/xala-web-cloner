import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './button';
import { ChevronDown } from 'lucide-react';

interface ExpandableGridProps {
  items: React.ReactNode[];
  initialRows?: number;
  cols?: number;
}

const ExpandableGrid = ({ items, initialRows = 1, cols = 3 }: ExpandableGridProps) => {
  const { t } = useTranslation();
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
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleItems.map((item, index) => (
          <div key={index} className="w-full">
            {item}
          </div>
        ))}
      </div>

      {visibleRows < totalRows && (
        <div className="flex justify-center mt-16">
          <Button
            onClick={handleShowMore}
            className="group px-8 py-6 rounded-xl font-semibold text-lg transition-all transform hover:scale-105
              shadow-lg shadow-primary/25 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <span className="flex items-center gap-3">
              {t('common.showMore', 'Show More')}
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExpandableGrid;