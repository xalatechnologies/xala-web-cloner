import { Github, Twitter, Linkedin } from 'lucide-react';

const socialLinks = [
  {
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com/xalatechnologies",
    color: "hover:text-[#8B5CF6]"
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    href: "https://twitter.com/xalatechnologies",
    color: "hover:text-[#D946EF]"
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/company/2558426",
    color: "hover:text-[#0EA5E9]"
  }
];

export const SocialLinks = () => {
  return (
    <div className="flex items-center justify-start space-x-4 pt-6">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 
                   hover:scale-110 hover:border-white/20 hover:bg-white/10 ${social.color}`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};