import clsx from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function ThemedButton({ variant = 'primary', size = 'md', className, ...rest }: Props) {
  const base = 'rounded-xl font-medium transition-colors shadow-card focus:outline-none focus-visible:shadow-[0_0_0_4px_rgba(79,70,229,0.45)] disabled:opacity-50 disabled:cursor-not-allowed'
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-6 py-3 text-base'
  }
  const variants = {
    primary: 'bg-[#4F46E5] text-white hover:bg-[#4338CA]',
    secondary: 'bg-[#A47864] text-white hover:bg-[#8E6554]',
    ghost: 'bg-transparent text-[#4F46E5] hover:bg-[#4F46E5]/10',
    outline: 'bg-transparent text-[#0F172A] border border-[#E5E7EB] hover:bg-white'
  }
  return <button className={clsx(base, sizes[size], variants[variant], className)} {...rest} />
}


