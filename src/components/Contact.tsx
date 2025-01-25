import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-[#8B5CF6]" />,
      title: "Phone",
      details: "+47 406 19 465"
    },
    {
      icon: <Mail className="w-6 h-6 text-[#D946EF]" />,
      title: "Email",
      details: "post@xala.no"
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#0EA5E9]" />,
      title: "Address",
      details: "Oslo, Norway"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-gradient-to-b from-xala-primary to-xala-secondary">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-float-1"></div>
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-[#D946EF]/10 rounded-full blur-3xl animate-float-2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#0EA5E9] text-transparent bg-clip-text mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-xala-text/80 text-lg max-w-2xl mx-auto">
            Ready to transform your ideas into reality? Get in touch with our team of experts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Column */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm border border-white/10 
                         hover:border-white/20 transition-all duration-700 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center space-x-6">
                  <div className="p-4 rounded-xl bg-white/5 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:bg-white/10">
                    {info.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-white mb-2">{info.title}</h3>
                    <p className="text-xala-text/80">{info.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form Column */}
          <div className="backdrop-blur-sm rounded-2xl p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#8B5CF6] transition-all duration-500 h-12"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#D946EF] transition-all duration-500 h-12"
                  />
                </div>
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Subject"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#0EA5E9] transition-all duration-500 h-12"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  rows={6}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#8B5CF6] transition-all duration-500 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium py-6 rounded-xl transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;