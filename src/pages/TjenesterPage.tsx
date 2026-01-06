import React from 'react';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Footer from '../components/Footer';

export default function TjenesterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        <Services />
      </div>
      <Footer />
    </div>
  );
}