import React from 'react';
import Navbar from '../components/Navbar';
import Technologies from '../components/Technologies';
import Footer from '../components/Footer';

export default function TeknologiPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        <Technologies />
      </div>
      <Footer />
    </div>
  );
}