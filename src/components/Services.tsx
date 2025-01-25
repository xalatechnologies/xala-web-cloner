import { Code, Shield, LineChart, Laptop } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code className="w-12 h-12 text-xala-accent mb-4" />,
      title: "Software Development",
      description: "Custom software solutions tailored to your business needs, from web applications to enterprise systems."
    },
    {
      icon: <Shield className="w-12 h-12 text-xala-accent mb-4" />,
      title: "Cloud Solutions",
      description: "Secure and scalable cloud infrastructure setup and management for optimal performance."
    },
    {
      icon: <LineChart className="w-12 h-12 text-xala-accent mb-4" />,
      title: "Digital Strategy",
      description: "Strategic consulting to help you navigate digital transformation and achieve your business goals."
    },
    {
      icon: <Laptop className="w-12 h-12 text-xala-accent mb-4" />,
      title: "Technical Consulting",
      description: "Expert guidance on technology choices and implementation strategies for your projects."
    }
  ];

  return (
    <section id="services" className="py-20 bg-xala-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-xala-accent mb-4">Our Services</h2>
          <p className="text-xala-text text-lg max-w-2xl mx-auto">
            We deliver comprehensive technology solutions to help your business succeed in the digital age
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-xala-primary rounded-lg hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                {service.icon}
                <h3 className="text-xl font-semibold mb-3 text-xala-accent">{service.title}</h3>
                <p className="text-xala-text">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;