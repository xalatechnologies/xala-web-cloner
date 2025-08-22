type Tone = 'success' | 'warning' | 'info' | 'danger'
const map: Record<Tone, string> = {
  success: 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/30',
  warning: 'bg-[#F4D06F]/10 text-[#7A5A00] border-[#F4D06F]/40',
  info: 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/30',
  danger: 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30'
}
export function ThemedAlert({ tone='info', title, children }:{ tone?:Tone; title?:string; children?:React.ReactNode }) {
  return (
    <div className={`border rounded-xl p-4 ${map[tone]}`}>
      {title && <div className="font-semibold">{title}</div>}
      {children && <div className="mt-1 text-[#0F172A]">{children}</div>}
    </div>
  )
}


