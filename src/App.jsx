import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OfferBanner from './components/OfferBanner';
import AdminModal from './components/admin/AdminModal';
import ChatBot from './components/ChatBot';
import ATSResumeModal from './components/ATSResumeModal';

function PortfolioApp() {
  const { isResumeOpen, setIsResumeOpen } = usePortfolio();

  return (
    <>
      {/* Ambient Background Glow Orbs */}
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />

      {/* Main Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>

      {/* Promotional Offer Banner & Modal */}
      <OfferBanner />

      {/* Interactive 24/7 AI Portfolio Assistant Chatbot */}
      <ChatBot />

      {/* ATS-Optimized Resume / Credentials Modal */}
      <ATSResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Footer */}
      <Footer />

      {/* Hidden Secured Admin Panel */}
      <AdminModal />
    </>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
