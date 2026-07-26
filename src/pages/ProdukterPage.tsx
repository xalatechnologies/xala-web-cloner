import React from 'react';
import Navbar from '../components/Navbar';
import CoreProducts from '../components/CoreProducts';
import Footer from '../components/Footer';

export default function ProdukterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main" className="pt-20 flex-1">
        <CoreProducts />
      </main>
      <Footer />
    </div>
  );
}