import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Footer from '../components/Footer';

export default function OmOssPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        <About />
      </div>
      <Footer />
    </div>
  );
}