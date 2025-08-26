import React from 'react';
import Navbar from '../components/Navbar';
import CoreProducts from '../components/CoreProducts';
import Footer from '../components/Footer';

export default function ProdukterPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <CoreProducts />
      </div>
      <Footer />
    </>
  );
}