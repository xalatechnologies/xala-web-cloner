import TeamMemberCard from './TeamMemberCard';
import ExpandableGrid from '../ui/expandable-grid';
import type { Database } from '@/integrations/supabase/types';

type TeamMember = Database['public']['Tables']['team_members']['Row'];

interface TeamGridProps {
  members: TeamMember[];
}

const TeamGrid = ({ members }: TeamGridProps) => {
  const memberCards = members.map((member) => (
    <TeamMemberCard
      key={member.id}
      name={member.name}
      role={member.role}
      description={member.description}
      imageUrl={member.image_url}
      linkedinUrl={member.linkedin_url}
      email={member.email}
    />
  ));

  return (
    <ExpandableGrid 
      items={memberCards}
      initialRows={1}
    />
  );
};

export default TeamGrid;