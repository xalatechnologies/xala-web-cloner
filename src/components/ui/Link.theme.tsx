import NextLink from 'react-router-dom'
// Simple anchor link wrapper for this Vite/React Router app
export function ThemedLink(props: React.ComponentProps<'a'>) {
  const { className = '', ...rest } = props
  return <a {...rest} className={`text-[#4F46E5] hover:underline visited:text-[#4F46E5]/90 ${className}`} />
}


