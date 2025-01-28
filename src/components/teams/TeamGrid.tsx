import { useState } from 'react';
import TeamMemberCard from './TeamMemberCard';
import type { Database } from '@/integrations/supabase/types';

type TeamMember = Database['public']['Tables']['team_members']['Row'];

interface TeamGridProps {
  members: TeamMember[];
  initialRows?: number;
  cols?: number;
}

const TeamGrid = ({ members, initialRows = 1, cols = 3 }: TeamGridProps) => {
  const [visibleRows, setVisibleRows] = useState(initialRows);

  const memberCards = members.slice(0, visibleRows * cols).map((member) => (
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
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {memberCards}
      </div>
      
      {members.length > visibleRows * cols && (
        <div className="flex justify-center mt-8 sm:mt-12">
          <button
            onClick={() => setVisibleRows(prev => prev + 1)}
            className="group px-8 py-6 rounded-lg font-medium transition-all transform hover:scale-105
              shadow-lg shadow-xala-accent/20 bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7E69AB] 
              hover:from-[#8B5CF6] hover:via-[#7E69AB] hover:to-[#9b87f5] text-white"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamGrid;