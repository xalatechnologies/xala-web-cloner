import React from 'react';
import Navbar from '../components/Navbar';
import WorkProcess from '../components/WorkProcess';
import Footer from '../components/Footer';

export default function SlikViJobberPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main" className="pt-20 flex-1">
        <WorkProcess />
      </main>
      <Footer />
    </div>
  );
}