export function ThemedCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_2px_12px_rgba(2,6,23,0.06)] p-6 ${className}`}>
      {children}
    </div>
  )
}


