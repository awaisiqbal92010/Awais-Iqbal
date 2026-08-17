import React from 'react';
import { Mail, Trash2, CheckCircle2, Reply, Calendar, User } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function MessagesInbox() {
  const { messages, markMessageRead, deleteMessage } = usePortfolio();

  const handleDelete = (id, sender) => {
    if (window.confirm(`Delete inquiry from "${sender}"?`)) {
      deleteMessage(id);
    }
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.8rem', color: '#ffffff' }}>
            Contact Inquiries &amp; Leads
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Direct messages submitted through the website contact form
          </p>
        </div>
        <div className="admin-badge" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
          {messages.filter(m => !m.read).length} Unread / {messages.length} Total
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <Mail size={36} color="var(--text-tertiary)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No messages yet</h3>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            When clients fill out the contact form on your portfolio, their inquiries will appear here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="admin-card"
              style={{
                borderLeft: msg.read ? '1px solid var(--border-subtle)' : '4px solid #ff6b00',
                background: msg.read ? 'rgba(25, 25, 25, 0.4)' : 'rgba(25, 25, 25, 0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '700', fontSize: '1rem', color: '#ffffff' }}>
                      {msg.name}
                    </span>
                    {!msg.read && (
                      <span style={{ fontSize: '0.65rem', background: '#ff6b00', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                        NEW
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#ffab5e', fontFamily: 'var(--font-mono)' }}>
                    {msg.email}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} />
                    {msg.date}
                  </span>
                  {!msg.read && (
                    <button
                      onClick={() => markMessageRead(msg.id)}
                      className="admin-btn admin-btn-primary"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    >
                      <CheckCircle2 size={13} />
                      <span>Mark Read</span>
                    </button>
                  )}
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                    className="admin-btn"
                    style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'white', padding: '6px 12px', fontSize: '0.75rem' }}
                  >
                    <Reply size={13} />
                    <span>Reply</span>
                  </a>
                  <button
                    onClick={() => handleDelete(msg.id, msg.name)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                    title="Delete Message"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {msg.subject && (
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ffab5e', marginBottom: '8px' }}>
                  Subject: {msg.subject}
                </div>
              )}

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
