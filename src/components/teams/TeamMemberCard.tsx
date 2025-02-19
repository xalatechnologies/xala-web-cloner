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
  return (
    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-3 sm:p-4 lg:p-6 transition-all duration-500 hover:border-xala-accent/50 hover:shadow-2xl hover:shadow-xala-accent/10">
      <div className="relative w-full aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-xala-secondary to-xala-primary">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            style={{
              objectPosition: 'center center',
              objectFit: 'contain',
              backgroundPosition: 'center center',
              backgroundSize: 'cover'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-xala-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="text-center mt-3 sm:mt-4">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-xala-accent mb-1 sm:mb-2">{name}</h3>
        <p className="text-sm sm:text-base lg:text-lg text-xala-text/90 font-semibold mb-2 sm:mb-3">{role}</p>
        {description && (
          <p className="text-xs sm:text-sm text-xala-text/70 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
            {description}
          </p>
        )}
      </div>

      <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 flex space-x-1.5 sm:space-x-2">
        {linkedinUrl && (
          <a 
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 rounded-full bg-xala-secondary/50 hover:bg-xala-accent/20 transition-colors duration-300"
          >
            <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-xala-accent" />
          </a>
        )}
        <a 
          href={`mailto:${email}`}
          className="p-1.5 sm:p-2 rounded-full bg-xala-secondary/50 hover:bg-xala-accent/20 transition-colors duration-300"
        >
          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-xala-accent" />
        </a>
      </div>
    </div>
  );
};

export default TeamMemberCard;