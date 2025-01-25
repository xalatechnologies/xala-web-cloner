import { Code2, Brain, Layout, Palette, Server, Terminal } from 'lucide-react';

const Technologies = () => {
  const technologies = [
    {
      icon: <Code2 className="w-8 h-8 text-xala-accent mb-4" />,
      name: "Frontend Development",
      tools: ["React", "TypeScript", "Tailwind CSS"]
    },
    {
      icon: <Server className="w-8 h-8 text-xala-accent mb-4" />,
      name: "Backend Solutions",
      tools: ["Node.js", "RESTful APIs", "GraphQL"]
    },
    {
      icon: <Brain className="w-8 h-8 text-xala-accent mb-4" />,
      name: "AI Solutions",
      tools: ["GPT-4", "LangChain", "Eleven Labs"]
    },
    {
      icon: <Layout className="w-8 h-8 text-xala-accent mb-4" />,
      name: "UI/UX Design",
      tools: ["Figma", "Adobe XD", "Sketch"]
    },
    {
      icon: <Terminal className="w-8 h-8 text-xala-accent mb-4" />,
      name: "DevOps",
      tools: ["Docker", "Kubernetes", "CI/CD"]
    },
    {
      icon: <Palette className="w-8 h-8 text-xala-accent mb-4" />,
      name: "Design Systems",
      tools: ["Material UI", "Shadcn/UI", "Storybook"]
    }
  ];

  return (
    <section className="py-20 bg-xala-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Technologies & Tools
          </h2>
          <p className="text-xala-text text-lg max-w-2xl mx-auto">
            We leverage cutting-edge technologies and industry-standard tools to deliver exceptional solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="p-6 bg-xala-secondary rounded-xl border border-gray-800 hover:border-xala-accent/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                {tech.icon}
                <h3 className="text-xl font-semibold mb-4 text-xala-accent">{tech.name}</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {tech.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-3 py-1 bg-xala-primary rounded-full text-sm text-xala-text"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;