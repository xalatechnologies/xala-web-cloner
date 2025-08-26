import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Footer from '../components/Footer';

export default function OmOssPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <About />
      </div>
      <Footer />
    </>
  );
}