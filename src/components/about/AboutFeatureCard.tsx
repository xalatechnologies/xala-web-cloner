interface AboutFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AboutFeatureCard = ({ icon, title, description }: AboutFeatureCardProps) => {
  return (
    <div 
      className="group h-full p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#9b87f5]/50 
                backdrop-blur-sm transition-all duration-500 hover:transform hover:-translate-y-1
                hover:shadow-lg hover:shadow-[#9b87f5]/10"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9b87f5]/20 to-transparent 
                      flex items-center justify-center text-[#9b87f5] group-hover:text-white
                      group-hover:from-[#9b87f5] group-hover:to-[#D946EF] transition-all duration-500">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-[#9b87f5] transition-colors">
            {title}
          </h3>
        </div>
        
        <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AboutFeatureCard;