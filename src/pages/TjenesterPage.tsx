import React from 'react';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import FAQSection from '../components/faq/FAQSection';
import { FAQ_TOPICS } from '../components/faq/faqs';
import Footer from '../components/Footer';

export default function TjenesterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main" className="pt-20 flex-1">
        <Services />
        {/* Capability questions only. The four about engagement — cost,
            timeline, procurement, aftercare — moved to /slik-vi-jobber, which
            is the page people are on when they ask them. Disjoint sets keep
            each page's FAQPage schema describing what that page shows. */}
        <FAQSection only={FAQ_TOPICS.services} />
      </main>
      <Footer />
    </div>
  );
}