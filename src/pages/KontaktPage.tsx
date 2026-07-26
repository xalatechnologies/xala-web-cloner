import React from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function KontaktPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main" className="pt-20 flex-1">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}