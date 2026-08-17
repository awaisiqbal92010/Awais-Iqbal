import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, KeyRound, AlertCircle, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function AdminLogin({ onClose }) {
  const { login } = usePortfolio();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (!res.success) {
      setError(res.error);
    } else {
      setError('');
    }
  };

  return (
    <motion.div
      className="admin-login-card"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      style={{ position: 'relative' }}
    >
      <button
        className="offer-close-btn"
        onClick={onClose}
        aria-label="Close Admin Modal"
      >
        <X size={18} />
      </button>

      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: 'rgba(255, 107, 0, 0.15)',
        border: '1px solid rgba(255, 107, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        color: '#ff6b00'
      }}>
        <Lock size={26} />
      </div>

      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: '2rem',
        textAlign: 'center',
        marginBottom: '6px',
        color: '#ffffff'
      }}>
        Admin Access
      </h2>
      <p style={{
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        textAlign: 'center',
        marginBottom: '28px'
      }}>
        Enter authorized credentials to manage portfolio content &amp; settings
      </p>

      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 14px',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '10px',
          color: '#ef4444',
          fontSize: '0.82rem',
          marginBottom: '20px'
        }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '18px' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            ADMIN EMAIL
          </label>
          <div style={{ position: 'relative', marginTop: '6px' }}>
            <input
              type="email"
              className="admin-input"
              placeholder="admin@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{ marginBottom: '26px' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            PASSWORD
          </label>
          <div style={{ position: 'relative', marginTop: '6px' }}>
            <input
              type="password"
              className="admin-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="admin-btn admin-btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
        >
          <KeyRound size={16} />
          <span>Secure Sign In</span>
        </button>
      </form>
    </motion.div>
  );
}
