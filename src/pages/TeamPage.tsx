import React from 'react';
import Navbar from '../components/Navbar';
import Teams from '../components/Teams';
import Footer from '../components/Footer';

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        <Teams />
      </div>
      <Footer />
    </div>
  );
}