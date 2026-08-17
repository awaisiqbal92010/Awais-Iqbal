import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function ServicesManager() {
  const { services, addService, updateService, deleteService } = usePortfolio();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      description: '',
      tags: 'React, Next.js, TypeScript',
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleOpenEdit = (srv) => {
    setFormData({
      title: srv.title,
      description: srv.description,
      tags: srv.tags ? srv.tags.join(', ') : '',
    });
    setEditingId(srv.id);
    setIsAdding(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const srvPayload = {
      title: formData.title,
      description: formData.description,
      tags: tagArray,
    };

    if (isAdding) {
      addService(srvPayload);
      setIsAdding(false);
    } else if (editingId) {
      updateService(editingId, srvPayload);
      setEditingId(null);
    }
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete service "${title}"?`)) {
      deleteService(id);
    }
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.8rem', color: '#ffffff' }}>
            Services &amp; Skills Management
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Manage offerings, competencies, and technical domains listed on the Skills section
          </p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="admin-card" style={{ border: '1px solid rgba(255, 107, 0, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#ff6b00', fontWeight: '600' }}>
              {isAdding ? '⚡ Add New Service' : '✏️ Edit Service'}
            </h3>
            <button
              onClick={() => { setIsAdding(false); setEditingId(null); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>SERVICE TITLE</label>
              <input
                type="text"
                className="admin-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. AI-Powered Web Solutions"
                required
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>DESCRIPTION</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of service offerings..."
                required
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>TECHNOLOGY TAGS (comma separated)</label>
              <input
                type="text"
                className="admin-input"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="React, Next.js, Node.js, WebGL"
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="admin-btn admin-btn-primary">
                <Check size={16} />
                <span>Save Service</span>
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => { setIsAdding(false); setEditingId(null); }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Service Title</th>
              <th>Description</th>
              <th>Skills &amp; Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((srv) => (
              <tr key={srv.id}>
                <td style={{ fontWeight: '600', color: '#ffffff' }}>{srv.title}</td>
                <td style={{ color: 'var(--text-secondary)', maxWidth: '320px' }}>
                  {srv.description}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '240px' }}>
                    {srv.tags && srv.tags.map((tag, idx) => (
                      <span key={idx} className="admin-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenEdit(srv)}
                      style={{ background: 'none', border: 'none', color: '#ffab5e', cursor: 'pointer' }}
                      title="Edit"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(srv.id, srv.title)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
