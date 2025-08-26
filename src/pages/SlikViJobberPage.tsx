import React from 'react';
import Navbar from '../components/Navbar';
import WorkProcess from '../components/WorkProcess';
import Footer from '../components/Footer';

export default function SlikViJobberPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <WorkProcess />
      </div>
      <Footer />
    </>
  );
}