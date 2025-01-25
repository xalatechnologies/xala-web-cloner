import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CoreProducts from '../components/CoreProducts';
import About from '../components/About';
import Contact from '../components/Contact';
import Clients from '../components/Clients';
import Technologies from '../components/Technologies';
import Teams from '../components/Teams';
import WorkProcess from '../components/WorkProcess';
import CaseStudies from '../components/CaseStudies';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-xala-primary">
      <Navbar />
      <Hero />
      <Clients />
      <CoreProducts />
      <Technologies />
      <WorkProcess />
      <CaseStudies />
      <Teams />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;