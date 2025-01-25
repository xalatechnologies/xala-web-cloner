import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Clients from '../components/Clients';

const Index = () => {
  return (
    <div className="min-h-screen bg-xala-primary">
      <Navbar />
      <Hero />
      <Services />
      <Clients />
      <About />
      <Contact />
    </div>
  );
};

export default Index;