import React from 'react';
import Navbar from '../components/Navbar';
import WorkProcess from '../components/WorkProcess';
import Footer from '../components/Footer';

export default function SlikViJobberPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        <WorkProcess />
      </div>
      <Footer />
    </div>
  );
}