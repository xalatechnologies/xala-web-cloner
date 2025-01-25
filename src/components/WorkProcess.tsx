import { PhoneCall, Palette, Code2, TestTube2, Rocket, HeartHandshake } from "lucide-react";

const WorkProcess = () => {
  const processes = [
    {
      icon: <PhoneCall className="w-8 h-8" />,
      title: "Discovery Call",
      description: "Initial consultation to understand your vision and requirements",
      step: "01",
      delay: "0"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Design Process",
      description: "Creating intuitive and engaging user experiences",
      step: "02",
      delay: "200"
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Development",
      description: "Building robust and scalable solutions",
      step: "03",
      delay: "400"
    },
    {
      icon: <TestTube2 className="w-8 h-8" />,
      title: "Testing Process",
      description: "Ensuring quality and performance",
      step: "04",
      delay: "600"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Deployment",
      description: "Launching your solution to the world",
      step: "05",
      delay: "800"
    },
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      title: "Support",
      description: "Ongoing maintenance and assistance",
      step: "06",
      delay: "1000"
    }
  ];

  return (
    <section id="work-process" className="py-24 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5 animate-pulse"></div>

      {/* Floating orbs background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full filter blur-3xl animate-float-1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl animate-float-2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/30 rounded-full filter blur-3xl animate-float-3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Our Work Process Model
          </h2>
          <p className="text-xala-text/80 max-w-2xl mx-auto text-lg">
            A streamlined approach to delivering exceptional results
          </p>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {processes.map((process, index) => (
            <div
              key={index}
              className="relative group"
              style={{
                animation: 'fade-in 0.5s ease-out forwards',
                animationDelay: `${process.delay}ms`,
                opacity: 0
              }}
            >
              {/* Connecting lines */}
              {index < processes.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-xala-accent to-transparent transform -translate-y-1/2 z-10"></div>
              )}

              {/* Process card */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 
                            hover:border-xala-accent/50 transition-all duration-500 group-hover:transform group-hover:scale-105
                            group-hover:shadow-2xl group-hover:shadow-xala-accent/20">
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-xala-accent rounded-full flex items-center justify-center
                              transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">{process.step}</span>
                </div>

                {/* Icon with glow effect */}
                <div className="mb-6 text-xala-accent relative">
                  <div className="absolute inset-0 bg-xala-accent/20 filter blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                    {process.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-xala-accent mb-3">{process.title}</h3>
                <p className="text-xala-text/70">{process.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
