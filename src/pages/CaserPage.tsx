import React from 'react';
import Navbar from '../components/Navbar';
import CaseStudies from '../components/CaseStudies';
import Footer from '../components/Footer';

export default function CaserPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        <CaseStudies />
      </div>
      <Footer />
    </div>
  );
}