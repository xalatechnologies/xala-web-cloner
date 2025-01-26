import TeamMemberCard from './TeamMemberCard';
import SectionGrid from '../ui/section-grid';
import type { Database } from '@/integrations/supabase/types';

type TeamMember = Database['public']['Tables']['team_members']['Row'];

interface TeamGridProps {
  members: TeamMember[];
  columns: number;
  rows: number;
}

const TeamGrid = ({ members, columns, rows }: TeamGridProps) => {
  return (
    <SectionGrid columns={columns} rows={rows}>
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
    </SectionGrid>
  );
};

export default TeamGrid;