export function ThemedInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-[#E5E7EB] bg-white text-[#0F172A] placeholder:text-[#475569] focus-visible:shadow-[0_0_0_4px_rgba(79,70,229,0.45)] focus-visible:border-[#4F46E5] px-4 py-2.5 ${props.className ?? ''}`}
    />
  )
}


