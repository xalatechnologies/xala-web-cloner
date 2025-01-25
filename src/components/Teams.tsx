import { User, Linkedin, Mail } from "lucide-react";

const Teams = () => {
  const teamMembers = [
    {
      name: "Ibrahim Rahmani",
      role: "Senior Developer",
      description: "Full-stack Developer | Microsoft Certified | MSc in Information Systems with extensive experience in system development, software architecture, and implementing scalable solutions for complex business needs.",
      image: "/lovable-uploads/bcb33ba6-0562-4857-818f-e29b4f66b4de.png"
    },
    {
      name: "Wahid Rahmani",
      role: "Developer",
      description: "Master's in Informatics | Experienced Software Engineer with expertise in Machine Learning, Cloud Computing, IT Management, and developing innovative, scalable software solutions for diverse industries.",
      image: "/lovable-uploads/bcb33ba6-0562-4857-818f-e29b4f66b4de.png"
    },
    {
      name: "Hamid Rahmani",
      role: "Project Manager",
      description: "Experienced Project Manager | Master's degree in Computer Science with expertise in project management, system development, and digital transformation.",
      image: "/lovable-uploads/bcb33ba6-0562-4857-818f-e29b4f66b4de.png"
    },
    {
      name: "Muhammad Nadeem",
      role: "Fullstack Developer",
      description: "Master in Applied Computer Science | Full-stack Consultant with focus on C#, Web, React, and Data Analysis",
      image: "/lovable-uploads/bcb33ba6-0562-4857-818f-e29b4f66b4de.png"
    },
    {
      name: "Ibtissam Ezzaheri",
      role: "UI/UX Designer",
      description: "Experienced UI/UX Designer | Specialist in user experience and interface design, focused on creating intuitive, functional, and aesthetically pleasing solutions that enhance user engagement and efficiency.",
      image: "/lovable-uploads/bcb33ba6-0562-4857-818f-e29b4f66b4de.png"
    },
    {
      name: "Helena Grønvold",
      role: "Advisor",
      description: "Experienced Advisor | Specialist in strategic guidance and problem-solving, focused on providing tailored advice and solutions that help businesses achieve their goals and improve efficiency.",
      image: "/lovable-uploads/bcb33ba6-0562-4857-818f-e29b4f66b4de.png"
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
            Meet our exceptional team of innovators and problem solvers, dedicated to transforming ideas into powerful solutions.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 p-6 transition-all duration-300 hover:border-xala-accent/50 hover:shadow-lg hover:shadow-xala-accent/5"
            >
              <div className="relative aspect-square mb-6 overflow-hidden rounded-lg bg-gradient-to-br from-xala-secondary to-xala-primary">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-xala-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-xala-accent mb-2">{member.name}</h3>
                <p className="text-xala-text/90 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-xala-text/70 line-clamp-4 hover:line-clamp-none transition-all duration-300">
                  {member.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 rounded-full bg-xala-secondary/50 hover:bg-xala-accent/20 transition-colors duration-300">
                  <Linkedin className="w-5 h-5 text-xala-accent" />
                </button>
                <button className="p-2 rounded-full bg-xala-secondary/50 hover:bg-xala-accent/20 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-xala-accent" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;