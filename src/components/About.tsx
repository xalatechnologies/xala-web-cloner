import { Brain, Rocket, Users, Code2 } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Innovation First",
      description: "Pioneering solutions that push the boundaries of what's possible in technology"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Future-Ready",
      description: "Building scalable systems that evolve with your business needs"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Client-Centric",
      description: "Your success is our priority - we transform ideas into impactful solutions"
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Technical Excellence",
      description: "Leveraging cutting-edge technologies to deliver robust solutions"
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-[#1a1f3d] to-xala-primary opacity-90" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2MiwgODQsIDI0MiwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9b87f5] via-[#D946EF] to-[#0EA5E9] text-transparent bg-clip-text">
            Shaping Tomorrow's Technology
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            We're not just building software; we're crafting digital experiences that define the future. 
            Our passion for innovation drives us to create solutions that empower businesses in the digital age.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#9b87f5]/50 
                         backdrop-blur-sm transition-all duration-500 hover:transform hover:-translate-y-1
                         hover:shadow-lg hover:shadow-[#9b87f5]/10"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#9b87f5]/20 to-transparent 
                              flex items-center justify-center text-[#9b87f5] group-hover:text-white
                              group-hover:from-[#9b87f5] group-hover:to-[#D946EF] transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-[#9b87f5] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Vision Statement */}
        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-[#9b87f5]/10 via-[#D946EF]/10 to-[#0EA5E9]/10 
                        border border-white/10 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              Our Vision
            </h3>
            <p className="text-lg text-white/80 leading-relaxed">
              To be at the forefront of technological innovation, creating solutions that not only meet today's challenges 
              but anticipate tomorrow's needs. We believe in technology that empowers, connects, and transforms businesses 
              for the digital future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;