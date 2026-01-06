import React from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function KontaktPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}