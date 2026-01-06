import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
}

const GradientText = ({ 
  children, 
  className,
  from = "from-primary",
  via = "via-primary",
  to = "to-primary",
  animate = true,
}: GradientTextProps) => {
  return (
    <span
      className={cn(
        "bg-gradient-to-r text-transparent bg-clip-text",
        from,
        via,
        to,
        animate && "bg-[size:400%] animate-gradient-x",
        className
      )}
    >
      {children}
    </span>
  );
};

export default GradientText;