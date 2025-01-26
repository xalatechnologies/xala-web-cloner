interface ClientCardProps {
  name: string;
  logoUrl: string;
}

const ClientCard = ({ name, logoUrl }: ClientCardProps) => {
  return (
    <div 
      className="group relative h-24 flex items-center justify-center p-4 rounded-xl"
    >
      <div className="absolute inset-0 rounded-xl bg-xala-secondary border border-xala-accent/20" />
      
      <img
        src={logoUrl}
        alt={name}
        className="relative w-full h-full object-contain p-2 transition-all duration-500 group-hover:scale-110"
        style={{ 
          filter: 'brightness(0) invert(1)',
        }}
      />

      <div className="absolute bottom-1 left-0 w-full text-center opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
        <span className="text-sm text-white font-medium">
          {name}
        </span>
      </div>
    </div>
  );
};

export default ClientCard;