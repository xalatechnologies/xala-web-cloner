import { User } from "lucide-react";

const Teams = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      description: "Visionary leader with 15+ years in tech innovation"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      description: "Expert in AI and cloud architecture"
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Designer",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      description: "Creative mind behind our user experiences"
    },
    {
      name: "David Kim",
      role: "Senior Developer",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      description: "Full-stack expert specializing in scalable solutions"
    }
  ];

  return (
    <section id="team" className="py-20 bg-xala-primary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary opacity-50"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-xala-accent mb-4">Our Team</h2>
          <p className="text-xala-text/80 max-w-2xl mx-auto">
            Meet the innovative minds behind our success. Together, we're pushing the boundaries of what's possible.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 p-6 transition-all duration-300 hover:border-xala-accent/50"
            >
              <div className="relative aspect-square mb-6 overflow-hidden rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-xala-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-xala-accent mb-2">{member.name}</h3>
                <p className="text-xala-text/90 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-xala-text/70">{member.description}</p>
              </div>

              <div className="absolute top-4 right-4">
                <User className="w-6 h-6 text-xala-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;