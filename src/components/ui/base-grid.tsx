import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BaseGridProps {
  items: ReactNode[];
  initialRows?: number;
  cols?: number;
}

export function BaseGrid({ items, initialRows = 1, cols = 3 }: BaseGridProps) {
  return (
    <div className={cn(
      "grid gap-8",
      "grid-cols-1",
      "md:grid-cols-2",
      `lg:grid-cols-${cols}`
    )}>
      {items.map((item, index) => (
        <div 
          key={index} 
          className="animate-fade-in" 
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}