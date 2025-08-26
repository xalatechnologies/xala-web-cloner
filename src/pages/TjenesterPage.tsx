import React from 'react';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Footer from '../components/Footer';

export default function TjenesterPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Services />
      </div>
      <Footer />
    </>
  );
}