import React from 'react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const phoneNumber = '923023761878';
  const message = encodeURIComponent("Hi Awais! I visited your portfolio and I'm interested in discussing a website development project.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      style={{
        position: 'fixed',
        bottom: '96px',
        right: '28px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#25D366',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 30px rgba(37, 211, 102, 0.45)',
        zIndex: 998,
        textDecoration: 'none',
        border: 'none',
        cursor: 'pointer',
      }}
      aria-label="Chat with Awais on WhatsApp"
      title="Chat with Awais on WhatsApp (+92 302 3761878)"
    >
      {/* Official WhatsApp SVG Icon */}
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.59c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z"/>
      </svg>

      {/* Online indicator dot */}
      <span
        style={{
          position: 'absolute',
          top: '2px',
          right: '2px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#ffffff',
          border: '2px solid #25D366',
        }}
      />
    </motion.a>
  );
}
