import React from 'react';
import Navbar from '../components/Navbar';
import Technologies from '../components/Technologies';
import Footer from '../components/Footer';

export default function TeknologiPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main" className="pt-20 flex-1">
        <Technologies />
      </main>
      <Footer />
    </div>
  );
}