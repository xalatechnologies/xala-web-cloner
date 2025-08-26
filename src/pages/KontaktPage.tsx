import React from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </>
  );
}