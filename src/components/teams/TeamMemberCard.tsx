import { Linkedin, Mail } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  description?: string | null;
  imageUrl: string;
  linkedinUrl?: string | null;
  email: string;
}

const TeamMemberCard = ({ name, role, description, imageUrl, linkedinUrl, email }: TeamMemberProps) => {
  // Determine image position based on name
  const getImagePosition = (name: string) => {
    if (name.toLowerCase().includes('hamid')) {
      return 'center 35%';
    }
    return 'center 15%';
  };

  return (
    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-3 sm:p-4 transition-all duration-500 hover:border-xala-accent/50 hover:shadow-2xl hover:shadow-xala-accent/10">
      <div className="relative w-full max-w-[280px] mx-auto aspect-square">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[95%] h-[95%] rounded-full overflow-hidden bg-gradient-to-b from-white/5 to-transparent p-0.5">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105 rounded-full"
              loading="lazy"
              style={{
                objectPosition: getImagePosition(name)
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="text-center mt-3 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-bold text-xala-accent mb-1">{name}</h3>
        <p className="text-sm sm:text-base text-xala-text/90 font-semibold mb-2">{role}</p>
        {description && (
          <p className="text-sm sm:text-base text-xala-text/70 line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
            {description}
          </p>
        )}
      </div>

      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex space-x-1.5">
        {linkedinUrl && (
          <a 
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full bg-xala-secondary/50 hover:bg-xala-accent/20 transition-colors duration-300"
          >
            <Linkedin className="w-4 h-4 text-xala-accent" />
          </a>
        )}
        <a 
          href={`mailto:${email}`}
          className="p-1.5 rounded-full bg-xala-secondary/50 hover:bg-xala-accent/20 transition-colors duration-300"
        >
          <Mail className="w-4 h-4 text-xala-accent" />
        </a>
      </div>
    </div>
  );
};

export default TeamMemberCard;