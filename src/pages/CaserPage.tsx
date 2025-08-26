import React from 'react';
import Navbar from '../components/Navbar';
import CaseStudies from '../components/CaseStudies';
import Footer from '../components/Footer';

export default function CaserPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <CaseStudies />
      </div>
      <Footer />
    </>
  );
}