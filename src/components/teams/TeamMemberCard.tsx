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
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-8 transition-all duration-500 hover:border-xala-accent/50 hover:shadow-2xl hover:shadow-xala-accent/10">
      <div className="relative h-[272px] w-[272px] mx-auto mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-xala-secondary to-xala-primary">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-xala-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-xala-accent mb-3">{name}</h3>
        <p className="text-xala-text/90 font-semibold mb-4 text-lg">{role}</p>
        {description && (
          <p className="text-sm text-xala-text/70 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
            {description}
          </p>
        )}
      </div>

      <div className="absolute top-6 right-6 flex space-x-3">
        {linkedinUrl && (
          <a 
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-xala-secondary/50 hover:bg-xala-accent/20 transition-colors duration-300"
          >
            <Linkedin className="w-5 h-5 text-xala-accent" />
          </a>
        )}
        <a 
          href={`mailto:${email}`}
          className="p-2.5 rounded-full bg-xala-secondary/50 hover:bg-xala-accent/20 transition-colors duration-300"
        >
          <Mail className="w-5 h-5 text-xala-accent" />
        </a>
      </div>
    </div>
  );
};

export default TeamMemberCard;