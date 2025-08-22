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
  const getImagePositionClass = (name: string): string => {
    const n = name.toLowerCase();
    if (n.includes('elias')) {
      // Lower the focus further to add even more space above the head
      return 'object-[center_64%]';
    }
    if (n.includes('hamid')) {
      return 'object-[center_35%]';
    }
    if (n.includes('amin')) {
      return 'object-[center_38%]';
    }
    return 'object-[center_20%]';
  };

  const getScaleClasses = (name: string): { base: string; hover: string } => {
    const n = name.toLowerCase();
    if (n.includes('elias')) {
      // Reduce zoom slightly more for maximum padding while keeping presence
      return { base: 'scale-[1.08]', hover: 'group-hover:scale-[1.12]' };
    }
    if (n.includes('amin')) {
      // Balanced crop for Amin
      return { base: 'scale-[1.18]', hover: 'group-hover:scale-[1.22]' };
    }
    return { base: 'scale-[1.08]', hover: 'group-hover:scale-[1.12]' };
  };

  const positionClass = getImagePositionClass(name);
  const scaleClasses = getScaleClasses(name);
  const normalizedName = name.toLowerCase();
  const isElias = normalizedName.includes('elias');
  const effectiveSrc = isElias ? '/team/elias.png' : imageUrl;

  return (
    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card text-card-foreground border border-border p-3 sm:p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-lg dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 dark:border-white/20">
      <div className="relative w-full max-w-[280px] mx-auto aspect-square">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[95%] h-[95%] rounded-full overflow-hidden bg-muted dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent p-0.5">
            <img
              src={effectiveSrc}
              alt={name}
              className={`w-full h-full object-cover ${positionClass} transform transition-transform duration-500 ${scaleClasses.base} ${scaleClasses.hover} rounded-full`}
              loading="lazy"
              onError={() => { /* no fallback – single source of truth: /team/elias.png */ }}
            />
          </div>
        </div>
      </div>
      
      <div className="text-center mt-3 sm:mt-4">
        <h3 className="text-lg sm:text-xl font-bold text-primary mb-1">{name}</h3>
        <p className="text-sm sm:text-base text-muted-foreground font-semibold mb-2">{role}</p>
        {description && (
          <p className="text-sm sm:text-base text-muted-foreground line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
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
            className="p-1.5 rounded-full bg-muted hover:bg-primary/10 transition-colors duration-300"
            aria-label={`Open ${name}'s LinkedIn profile`}
          >
            <Linkedin className="w-4 h-4 text-primary" />
          </a>
        )}
        <a 
          href={`mailto:${email}`}
          className="p-1.5 rounded-full bg-muted hover:bg-primary/10 transition-colors duration-300"
          aria-label={`Send email to ${name}`}
        >
          <Mail className="w-4 h-4 text-primary" />
        </a>
      </div>
    </div>
  );
};

export default TeamMemberCard;