import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Sparkles, X, ArrowRight, Clock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function OfferBanner() {
  const { offerSettings, isOfferModalOpen, setIsOfferModalOpen } = usePortfolio();
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!offerSettings || !offerSettings.enabled) return null;

  const handleClaim = () => {
    setIsOfferModalOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Bottom-Right Offer Pill */}
      <motion.div
        className="offer-banner-pill"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.04 }}
        onClick={() => setIsOfferModalOpen(true)}
      >
        <span className="offer-pulse-tag">
          <Sparkles size={13} />
          {offerSettings.badgeText || 'SPECIAL OFFER'}
        </span>
        <span style={{ fontSize: '0.86rem', fontWeight: '600', color: '#ffffff' }}>
          {offerSettings.discount || '20% OFF'}
        </span>
        <ArrowRight size={14} color="#ff6b00" />
      </motion.div>

      {/* Interactive Offer Popup Modal */}
      <AnimatePresence>
        {isOfferModalOpen && (
          <div className="offer-modal-backdrop" onClick={() => setIsOfferModalOpen(false)}>
            <motion.div
              className="offer-modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <button
                className="offer-close-btn"
                onClick={() => setIsOfferModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'rgba(255, 107, 0, 0.15)',
                border: '1px solid rgba(255, 107, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: '#ff6b00'
              }}>
                <Tag size={28} />
              </div>

              <div className="section-label" style={{ justifyContent: 'center', marginBottom: '8px' }}>
                {offerSettings.badgeText || 'LIMITED TIME PROMOTION'}
              </div>

              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '2.2rem',
                lineHeight: '1.2',
                marginBottom: '14px',
                color: '#ffffff'
              }}>
                {offerSettings.headline || 'Special Discount on New Web Projects'}
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '24px' }}>
                {offerSettings.description || 'Lock in top-tier performance, custom 3D web design, and full SEO optimization at a special introductory price.'}
              </p>

              {/* Countdown Timer */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '14px',
                borderRadius: '16px',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ textAlign: 'center', minWidth: '45px' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#ff6b00', fontFamily: 'var(--font-mono)' }}>
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>HOURS</div>
                </div>
                <div style={{ fontSize: '1.2rem', color: 'var(--text-tertiary)', alignSelf: 'center' }}>:</div>
                <div style={{ textAlign: 'center', minWidth: '45px' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#ff6b00', fontFamily: 'var(--font-mono)' }}>
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>MINS</div>
                </div>
                <div style={{ fontSize: '1.2rem', color: 'var(--text-tertiary)', alignSelf: 'center' }}>:</div>
                <div style={{ textAlign: 'center', minWidth: '45px' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#ff6b00', fontFamily: 'var(--font-mono)' }}>
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>SECS</div>
                </div>
              </div>

              {/* Coupon Code Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                background: 'rgba(255, 107, 0, 0.1)',
                border: '1px dashed rgba(255, 107, 0, 0.5)',
                borderRadius: '10px',
                marginBottom: '24px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#ffab5e'
              }}>
                <span>Promo Code:</span>
                <strong style={{ color: '#ffffff' }}>{offerSettings.code || 'VIBE20'}</strong>
              </div>

              <div>
                <button
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={handleClaim}
                >
                  <span>{offerSettings.ctaText || 'Claim Offer Now'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
