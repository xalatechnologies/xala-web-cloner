import React from 'react';
import Navbar from '../components/Navbar';
import Teams from '../components/Teams';
import Footer from '../components/Footer';

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Teams />
      </div>
      <Footer />
    </>
  );
}