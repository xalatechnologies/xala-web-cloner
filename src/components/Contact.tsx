import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-xala-accent" />,
      title: "Phone",
      details: "+47 406 19 465"
    },
    {
      icon: <Mail className="w-6 h-6 text-xala-accent" />,
      title: "Email",
      details: "post@xala.no"
    },
    {
      icon: <MapPin className="w-6 h-6 text-xala-accent" />,
      title: "Address",
      details: "Oslo, Norway"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-xala-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-xala-accent mb-4">Contact Us</h2>
          <p className="text-xala-text text-lg max-w-2xl mx-auto">
            Ready to start your next project? Get in touch with us to discuss how we can help.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="p-6 bg-xala-primary rounded-lg text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                {info.icon}
                <h3 className="text-xl font-semibold my-3 text-xala-accent">{info.title}</h3>
                <p className="text-xala-text">{info.details}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-xala-primary text-xala-text border border-xala-accent/20 focus:border-xala-accent outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-xala-primary text-xala-text border border-xala-accent/20 focus:border-xala-accent outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 rounded-lg bg-xala-primary text-xala-text border border-xala-accent/20 focus:border-xala-accent outline-none"
            />
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full p-3 rounded-lg bg-xala-primary text-xala-text border border-xala-accent/20 focus:border-xala-accent outline-none resize-none"
            ></textarea>
            <Button
              type="submit"
              className="w-full bg-xala-accent hover:bg-opacity-90 text-white font-medium py-3 rounded-lg transition-all"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;