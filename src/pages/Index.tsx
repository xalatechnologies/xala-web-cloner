import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-xala-primary">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
    </div>
  );
};

export default Index;