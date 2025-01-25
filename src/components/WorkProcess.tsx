import { Brain, CircuitBoard, Network, Server } from "lucide-react";

const WorkProcess = () => {
  const processes = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze requirements and optimize solutions",
      step: "01"
    },
    {
      icon: <CircuitBoard className="w-12 h-12" />,
      title: "Quantum Processing",
      description: "High-performance computing for complex problem-solving",
      step: "02"
    },
    {
      icon: <Network className="w-12 h-12" />,
      title: "Neural Integration",
      description: "Seamless integration of systems through neural networks",
      step: "03"
    },
    {
      icon: <Server className="w-12 h-12" />,
      title: "Cloud Deployment",
      description: "Automated deployment with intelligent scaling",
      step: "04"
    }
  ];

  return (
    <section className="py-20 bg-xala-primary relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary animate-gradient-x"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-xala-accent mb-4">Future-Forward Process</h2>
          <p className="text-xala-text/80 max-w-2xl mx-auto">
            Our revolutionary workflow combines cutting-edge AI with quantum computing to deliver unprecedented results
          </p>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processes.map((process, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm 
                         border border-white/10 hover:border-xala-accent/50 transition-all duration-300"
            >
              {/* Step number */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-xala-accent rounded-full flex items-center justify-center
                            transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold">{process.step}</span>
              </div>

              {/* Icon with animation */}
              <div className="mb-6 text-xala-accent transform group-hover:scale-110 transition-transform duration-300">
                {process.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-xala-accent mb-3">{process.title}</h3>
              <p className="text-xala-text/70">{process.description}</p>

              {/* Connecting lines for desktop */}
              {index < processes.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-xala-accent/30"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;