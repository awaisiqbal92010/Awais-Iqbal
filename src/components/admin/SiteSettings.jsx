import React, { useState } from 'react';
import { Sliders, Check, RotateCcw, AlertTriangle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function SiteSettings() {
  const { siteSettings, setSiteSettings, resetToDefaults } = usePortfolio();
  const [formData, setFormData] = useState({ ...siteSettings });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSiteSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.8rem', color: '#ffffff' }}>
            Site Configuration &amp; Profile
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Manage hero headline, experience counters, bio copy, and contact info
          </p>
        </div>
      </div>

      <div className="admin-card" style={{ maxWidth: '750px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>HERO ROLE TAGLINE</label>
            <input
              type="text"
              className="admin-input"
              value={formData.heroTagline}
              onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
              placeholder="Website Development Specialist"
              required
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>HERO BIO COPY</label>
            <textarea
              className="admin-textarea"
              rows={3}
              value={formData.heroBio}
              onChange={(e) => setFormData({ ...formData, heroBio: e.target.value })}
              placeholder="Elevator pitch in the hero section..."
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>YEARS EXPERIENCE</label>
              <input
                type="text"
                className="admin-input"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                placeholder="3+"
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>PROJECTS DELIVERED</label>
              <input
                type="text"
                className="admin-input"
                value={formData.projectsDelivered}
                onChange={(e) => setFormData({ ...formData, projectsDelivered: e.target.value })}
                placeholder="50+"
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>SATISFIED CLIENTS</label>
              <input
                type="text"
                className="admin-input"
                value={formData.satisfiedClients}
                onChange={(e) => setFormData({ ...formData, satisfiedClients: e.target.value })}
                placeholder="30+"
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>CONTACT EMAIL</label>
              <input
                type="email"
                className="admin-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="vcwithawais@gmail.com"
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>PHONE NUMBER</label>
              <input
                type="text"
                className="admin-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+92 300 123 4567"
                required
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>LOCATION</label>
              <input
                type="text"
                className="admin-input"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Pakistan"
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              <Check size={16} />
              <span>Save Site Settings</span>
            </button>
            {saved && (
              <span style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: '600' }}>
                ✓ Profile settings updated!
              </span>
            )}
          </div>
        </form>

        {/* Factory Reset Section */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontWeight: '600', color: '#ef4444', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} />
              <span>Factory Reset Website Data</span>
            </div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
              Restore original projects, services, experiences, and settings.
            </div>
          </div>
          <button
            onClick={resetToDefaults}
            className="admin-btn admin-btn-danger"
          >
            <RotateCcw size={15} />
            <span>Reset to Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
}
