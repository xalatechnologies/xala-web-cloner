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
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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