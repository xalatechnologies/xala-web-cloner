interface TeamMemberProps {
  role: string;
  description?: string | null;
}

const TeamMemberCard = ({ role, description }: TeamMemberProps) => {
  // Helper function to make description generic (remove personal names)
  const makeGenericDescription = (desc: string): string => {
    if (!desc) return '';
    // Remove common personal name patterns and make it generic
    return desc
      .replace(/\b(Ibrahim|Hamid|Wahid|Elias|Amin)\s+\w+/gi, 'Our team')
      .replace(/\b(He|His|She|Her)\s+/gi, 'We ')
      .replace(/\b(He|She)\s+is/gi, 'We are')
      .replace(/\b(He|She)\s+leads/gi, 'We lead')
      .replace(/\b(He|She)\s+specializes/gi, 'We specialize')
      .trim();
  };

  const genericDescription = description ? makeGenericDescription(description) : '';

  return (
    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card text-card-foreground border border-border p-8 sm:p-10 lg:p-12 transition-all duration-300 hover:border-primary/40 hover:shadow-lg dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 dark:border-white/20 min-h-[280px] sm:min-h-[320px] flex flex-col justify-center">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-4 sm:mb-6">
          {role}
        </h3>
        {genericDescription && (
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-2">
            {genericDescription}
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;