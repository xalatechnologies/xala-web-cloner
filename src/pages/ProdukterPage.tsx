import React from 'react';
import Navbar from '../components/Navbar';
import CoreProducts from '../components/CoreProducts';
import Footer from '../components/Footer';

export default function ProdukterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-1">
        <CoreProducts />
      </div>
      <Footer />
    </div>
  );
}