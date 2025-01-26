import TeamMemberCard from './TeamMemberCard';
import type { Database } from '@/integrations/supabase/types';

type TeamMember = Database['public']['Tables']['team_members']['Row'];

interface TeamGridProps {
  members: TeamMember[];
  columns: number;
  rows: number;
}

const TeamGrid = ({ members, columns, rows }: TeamGridProps) => {
  return (
    <div 
      className="grid gap-8"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
      }}
    >
      {members.map((member) => (
        <TeamMemberCard
          key={member.id}
          name={member.name}
          role={member.role}
          description={member.description}
          imageUrl={member.image_url}
          linkedinUrl={member.linkedin_url}
          email={member.email}
        />
      ))}
    </div>
  );
};

export default TeamGrid;