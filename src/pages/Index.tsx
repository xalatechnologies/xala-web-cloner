import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import CoreProducts from '../components/CoreProducts';
import About from '../components/About';
import Contact from '../components/Contact';
import Clients from '../components/Clients';
import Technologies from '../components/Technologies';
import Teams from '../components/Teams';
import WorkProcess from '../components/WorkProcess';
import CaseStudies from '../components/CaseStudies';

const Index = () => {
  return (
    <div className="min-h-screen bg-xala-primary">
      <Navbar />
      <Hero />
      <Services />
      <CoreProducts />
      <Clients />
      <Technologies />
      <WorkProcess />
      <CaseStudies />
      <Teams />
      <About />
      <Contact />
    </div>
  );
};

export default Index;