import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Testimonials', href: '#testimonials' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setIsResumeOpen } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        <a href="#" className="nav-logo">
          Awais<span>.</span>
        </a>

        <ul className={`nav-links ${mobileOpen ? 'active' : ''}`}>
          {navItems.map((item, i) => (
            <li key={item.label}>
              <motion.a
                href={item.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
              >
                {item.label}
              </motion.a>
            </li>
          ))}

          {/* ATS Resume View Button */}
          <li>
            <motion.button
              onClick={() => {
                setMobileOpen(false);
                setIsResumeOpen(true);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50px',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              whileHover={{ scale: 1.05, borderColor: 'var(--accent-1)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText size={13} color="#ff6b00" />
              <span>ATS Resume</span>
            </motion.button>
          </li>

          <li>
            <motion.a
              href="#contact"
              className="nav-cta"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Talk
            </motion.a>
          </li>
        </ul>

        <button
          className="nav-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </motion.nav>
  );
}
