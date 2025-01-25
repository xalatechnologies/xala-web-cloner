import { CheckCircle } from 'lucide-react';

const About = () => {
  const features = [
    "10+ years of industry experience",
    "Dedicated team of experts",
    "Cutting-edge technology solutions",
    "Client-focused approach"
  ];

  return (
    <section id="about" className="py-20 bg-xala-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-xala-accent mb-4">About Xala Technologies</h2>
            <p className="text-xala-text text-lg">
              We are a forward-thinking technology company dedicated to helping businesses navigate the digital landscape. Our mission is to deliver innovative solutions that drive growth and efficiency.
            </p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-xala-accent" />
                  <span className="text-xala-text">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-xala-secondary p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-xala-accent/20 to-transparent rounded-lg"></div>
              <div className="relative flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-xala-accent mb-4">Our Vision</h3>
                  <p className="text-xala-text">
                    To be the leading provider of innovative technology solutions, empowering businesses to thrive in the digital age.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;