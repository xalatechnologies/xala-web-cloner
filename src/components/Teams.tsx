import { User, Linkedin, Mail } from "lucide-react";

const Teams = () => {
  const teamMembers = [
    {
      name: "Ibrahim Rahmani",
      role: "Senior Developer",
      description: "Full-stack Developer | Microsoft Certified | MSc in Information Systems with extensive experience in system development, software architecture, and implementing scalable solutions for complex business needs.",
      image: "/lovable-uploads/eb143cd9-14a3-4492-be53-8216b3d5a605.png",
      linkedin: "https://linkedin.com",
      email: "ibrahim@example.com"
    },
    {
      name: "Wahid Rahmani",
      role: "Developer",
      description: "Master's in Informatics | Experienced Software Engineer with expertise in Machine Learning, Cloud Computing, IT Management, and developing innovative, scalable software solutions for diverse industries.",
      image: "/lovable-uploads/bc788751-2e92-4ae8-b6a4-7a175fbc524c.png",
      linkedin: "https://linkedin.com",
      email: "wahid@example.com"
    },
    {
      name: "Hamid Rahmani",
      role: "Project Manager",
      description: "Experienced Project Manager | Master's degree in Computer Science with expertise in project management, system development, and digital transformation.",
      image: "/lovable-uploads/54dff2fe-2407-411e-9d96-afe8fbed9cbc.png",
      linkedin: "https://linkedin.com",
      email: "hamid@example.com"
    },
    {
      name: "Muhammad Nadeem",
      role: "Fullstack Developer",
      description: "Master in Applied Computer Science | Full-stack Consultant with focus on C#, Web, React, and Data Analysis",
      image: "/lovable-uploads/d980b78a-797e-4476-8ec9-594300df0ee9.png",
      linkedin: "https://linkedin.com",
      email: "muhammad@example.com"
    },
    {
      name: "Ibtissam Ezzaheri",
      role: "UI/UX Designer",
      description: "Experienced UI/UX Designer | Specialist in user experience and interface design, focused on creating intuitive, functional, and aesthetically pleasing solutions that enhance user engagement and efficiency.",
      image: "/lovable-uploads/94726c81-955d-46ad-9968-825b4e908817.png",
      linkedin: "https://linkedin.com",
      email: "ibtissam@example.com"
    },
    {
      name: "Helena Grønvold",
      role: "Advisor",
      description: "Experienced Advisor | Specialist in strategic guidance and problem-solving, focused on providing tailored advice and solutions that help businesses achieve their goals and improve efficiency.",
      image: "/lovable-uploads/c48882ae-197a-439d-9406-c6f62200e111.png",
      linkedin: "https://linkedin.com",
      email: "helena@example.com"
    }
  ];

  return (
    <section id="team" className="py-24 bg-xala-primary relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary opacity-60"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Updated section header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-xala-accent mb-6 tracking-tight">Meet Our Team</h2>
          <p className="text-xala-text/80 max-w-2xl mx-auto text-lg">
            Our exceptional team of innovators and problem solvers is dedicated to transforming ideas into powerful solutions.
          </p>
        </div>

        {/* Enhanced team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-8 transition-all duration-500 hover:border-xala-accent/50 hover:shadow-2xl hover:shadow-xala-accent/10"
            >
              <div className="relative aspect-square mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-xala-secondary to-xala-primary">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-xala-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-xala-accent mb-3">{member.name}</h3>
                <p className="text-xala-text/90 font-semibold mb-4 text-lg">{member.role}</p>
                <p className="text-sm text-xala-text/70 line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                  {member.description}
                </p>
              </div>

              <div className="absolute top-6 right-6 flex space-x-3">
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-xala-secondary/50 hover:bg-xala-accent/20 transition-colors duration-300"
                >
                  <Linkedin className="w-5 h-5 text-xala-accent" />
                </a>
                <a 
                  href={`mailto:${member.email}`}
                  className="p-2.5 rounded-full bg-xala-secondary/50 hover:bg-xala-accent/20 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 text-xala-accent" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;