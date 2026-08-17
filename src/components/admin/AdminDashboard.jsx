import React, { useState } from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  Briefcase,
  Layers,
  Mail,
  Tag,
  Settings,
  FileText,
  LogOut,
  X,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import ProjectsManager from './ProjectsManager';
import ExperienceManager from './ExperienceManager';
import ServicesManager from './ServicesManager';
import MessagesInbox from './MessagesInbox';
import OfferManager from './OfferManager';
import SiteSettings from './SiteSettings';
import CVManager from './CVManager';

export default function AdminDashboard({ onClose }) {
  const { logout, projects, experiences, services, messages, offerSettings } = usePortfolio();
  const [activeTab, setActiveTab] = useState('overview');

  const unreadCount = messages.filter(m => !m.read).length;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', marginBottom: '20px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '700',
            fontSize: '0.9rem'
          }}>
            AI
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#ffffff' }}>
              Awais Iqbal
            </div>
            <div style={{ fontSize: '0.72rem', color: '#ff8c38', fontFamily: 'var(--font-mono)' }}>
              ADMIN PANEL
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ flex: 1 }}>
          <button
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'cv' ? 'active' : ''}`}
            onClick={() => setActiveTab('cv')}
          >
            <FileText size={18} />
            <span>CV &amp; Resume Editor</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <FolderGit2 size={18} />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <Briefcase size={18} />
            <span>Experience ({experiences.length})</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Layers size={18} />
            <span>Services &amp; Skills</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <Mail size={18} />
            <span>Inbox</span>
            {unreadCount > 0 && (
              <span className="admin-counter-pill">{unreadCount}</span>
            )}
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'offers' ? 'active' : ''}`}
            onClick={() => setActiveTab('offers')}
          >
            <Tag size={18} />
            <span>Offer Banners</span>
            {offerSettings.enabled && (
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', marginLeft: 'auto' }} />
            )}
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} />
            <span>Site Settings</span>
          </button>
        </nav>

        {/* Bottom Actions */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <button
            className="admin-nav-item"
            style={{ color: '#ef4444' }}
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="admin-content-area">
        {/* Top bar with close modal */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <button
            className="offer-close-btn"
            onClick={onClose}
            aria-label="Close Admin Modal"
            style={{ position: 'static' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div className="admin-header">
              <div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '2.4rem', color: '#ffffff' }}>
                  Welcome back, Awais!
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Here is a high-level overview of your portfolio website statistics and incoming inquiries.
                </p>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              <div className="admin-card" style={{ borderLeft: '4px solid #ff6b00' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  TOTAL PROJECTS
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', marginTop: '6px' }}>
                  {projects.length}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#ffab5e', marginTop: '4px' }}>
                  Live in gallery
                </div>
              </div>

              <div className="admin-card" style={{ borderLeft: '4px solid #22c55e' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  CLIENT INQUIRIES
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', marginTop: '6px' }}>
                  {messages.length}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#22c55e', marginTop: '4px' }}>
                  {unreadCount} unread
                </div>
              </div>

              <div className="admin-card" style={{ borderLeft: '4px solid #ff8c38' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  SERVICES OFFERED
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', marginTop: '6px' }}>
                  {services.length}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#ff8c38', marginTop: '4px' }}>
                  Active domains
                </div>
              </div>

              <div className="admin-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  OFFER BANNER
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: '800', color: offerSettings.enabled ? '#22c55e' : 'var(--text-tertiary)', marginTop: '6px' }}>
                  {offerSettings.enabled ? 'ACTIVE' : 'OFF'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {offerSettings.discount}
                </div>
              </div>
            </div>

            {/* Recent Messages Quick View */}
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: '600' }}>
                  📬 Recent Inquiries
                </h3>
                <button
                  className="admin-btn"
                  style={{ background: 'none', color: '#ff6b00', padding: 0 }}
                  onClick={() => setActiveTab('messages')}
                >
                  View all in Inbox →
                </button>
              </div>

              {messages.slice(0, 3).map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', color: '#ffffff' }}>{msg.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{msg.subject || 'Portfolio Inquiry'}</div>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>{msg.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CV & RESUME EDITOR */}
        {activeTab === 'cv' && <CVManager />}

        {/* TAB 3: PROJECTS */}
        {activeTab === 'projects' && <ProjectsManager />}

        {/* TAB 4: EXPERIENCE */}
        {activeTab === 'experience' && <ExperienceManager />}

        {/* TAB 5: SERVICES */}
        {activeTab === 'services' && <ServicesManager />}

        {/* TAB 6: INBOX */}
        {activeTab === 'messages' && <MessagesInbox />}

        {/* TAB 7: OFFERS */}
        {activeTab === 'offers' && <OfferManager />}

        {/* TAB 8: SETTINGS */}
        {activeTab === 'settings' && <SiteSettings />}
      </div>
    </div>
  );
}
