import React from 'react';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import FAQSection from '../components/faq/FAQSection';
import Footer from '../components/Footer';

export default function TjenesterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        <Services />
        {/* Service questions are the highest-intent thing people search for,
            so the FAQ (and its FAQPage schema) lives here. */}
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
}