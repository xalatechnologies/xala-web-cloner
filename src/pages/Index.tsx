import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Clients from '../components/Clients';
import Technologies from '../components/Technologies';
import Teams from '../components/Teams';

const Index = () => {
  return (
    <div className="min-h-screen bg-xala-primary">
      <Navbar />
      <Hero />
      <Services />
      <Clients />
      <Technologies />
      <Teams />
      <About />
      <Contact />
    </div>
  );
};

export default Index;