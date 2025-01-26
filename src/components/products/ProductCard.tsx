interface ProductCardProps {
  title: string;
  description: string;
}

const ProductCard = ({ title, description }: ProductCardProps) => {
  return (
    <div className="group p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#9b87f5]/50 
                  backdrop-blur-sm transition-all duration-500 hover:transform hover:-translate-y-1
                  hover:shadow-lg hover:shadow-[#9b87f5]/10">
      <h3 className="text-xl font-semibold text-white group-hover:text-[#9b87f5] transition-colors">
        {title}
      </h3>
      <p className="text-white/70 group-hover:text-white/90 transition-colors">
        {description}
      </p>
    </div>
  );
};

export default ProductCard;