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
  from = "from-blue-400",
  via = "via-purple-500",
  to = "to-pink-500",
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