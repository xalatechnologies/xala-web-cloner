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

  // Extract unique roles with their descriptions from members
  const roleMap = new Map<string, string | null>();
  members.forEach(member => {
    if (member.role && !roleMap.has(member.role)) {
      roleMap.set(member.role, member.description);
    }
  });

  // Limit to 6 cards maximum
  const uniqueRoles = Array.from(roleMap.entries()).slice(0, 6);

  const roleCards = uniqueRoles.slice(0, visibleRows * cols).map(([role, description], index) => (
    <TeamMemberCard
      key={`role-${index}`}
      role={role}
      description={description}
    />
  ));

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
        {roleCards}
      </div>
      
      {uniqueRoles.length > visibleRows * cols && (
        <div className="flex justify-center mt-8 sm:mt-12">
          <button
            onClick={() => setVisibleRows(prev => prev + 1)}
            className="group px-8 py-6 rounded-lg font-medium transition-all transform hover:scale-105
              shadow-lg shadow-primary/20 bg-primary text-primary-foreground"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamGrid;