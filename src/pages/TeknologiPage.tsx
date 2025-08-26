import React from 'react';
import Navbar from '../components/Navbar';
import Technologies from '../components/Technologies';
import Footer from '../components/Footer';

export default function TeknologiPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Technologies />
      </div>
      <Footer />
    </>
  );
}