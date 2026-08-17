import React, { useState } from 'react';
import { Tag, Check, Eye } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function OfferManager() {
  const { offerSettings, setOfferSettings, setIsOfferModalOpen } = usePortfolio();
  const [formData, setFormData] = useState({ ...offerSettings });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOfferSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.8rem', color: '#ffffff' }}>
            Promotional &amp; Offer Banners
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Configure the floating promo pill, popup modal, discount codes, and special announcements
          </p>
        </div>
        <button
          className="admin-btn"
          style={{ background: 'rgba(255, 107, 0, 0.15)', color: '#ffab5e', border: '1px solid rgba(255, 107, 0, 0.3)' }}
          onClick={() => setIsOfferModalOpen(true)}
        >
          <Eye size={16} />
          <span>Preview Popup Modal</span>
        </button>
      </div>

      <div className="admin-card" style={{ maxWidth: '750px' }}>
        <form onSubmit={handleSubmit}>
          {/* Banner Enable Toggle */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '20px',
            marginBottom: '24px',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            <div>
              <div style={{ fontWeight: '600', color: '#ffffff', fontSize: '1rem' }}>
                Enable Promotional Offer Popup
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                When active, visitors see a floating promotion badge and interactive countdown offer modal.
              </div>
            </div>
            <label className="admin-toggle-switch">
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              />
              <span className="admin-slider" />
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>BADGE / TAG TEXT</label>
              <input
                type="text"
                className="admin-input"
                value={formData.badgeText}
                onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                placeholder="LIMITED TIME OFFER"
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>DISCOUNT RATE / PILL TEXT</label>
              <input
                type="text"
                className="admin-input"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="20% OFF"
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>OFFER HEADLINE</label>
            <input
              type="text"
              className="admin-input"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              placeholder="Special 20% Discount on New Projects"
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>OFFER DESCRIPTION</label>
            <textarea
              className="admin-textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of terms and benefits..."
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>PROMO CODE</label>
              <input
                type="text"
                className="admin-input"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="VIBE20"
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>BUTTON CTA TEXT</label>
              <input
                type="text"
                className="admin-input"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                placeholder="Claim Your Offer"
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              <Check size={16} />
              <span>Save Offer Settings</span>
            </button>
            {saved && (
              <span style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: '600' }}>
                ✓ Settings updated successfully!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
