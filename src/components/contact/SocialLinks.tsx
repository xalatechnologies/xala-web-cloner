import { Github, Twitter, Linkedin } from 'lucide-react';

const socialLinks = [
  {
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com/xalatechnologies",
    color: "hover:text-primary"
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    href: "https://x.com/NorChaiin",
    color: "hover:text-primary"
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://www.linkedin.com/company/2558426",
    color: "hover:text-primary"
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
          className={`p-3 rounded-xl bg-card border border-border transition-all duration-300 dark:bg-white/5 dark:border-white/10 
                   hover:scale-110 hover:border-primary/30 hover:bg-muted ${social.color}`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};