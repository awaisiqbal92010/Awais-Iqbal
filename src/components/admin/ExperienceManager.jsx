import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function ExperienceManager() {
  const { experiences, addExperience, updateExperience, deleteExperience } = usePortfolio();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    date: '',
    role: '',
    company: '',
    description: '',
  });

  const handleOpenAdd = () => {
    setFormData({
      date: '2024 — Present',
      role: '',
      company: '',
      description: '',
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleOpenEdit = (exp) => {
    setFormData({
      date: exp.date,
      role: exp.role,
      company: exp.company,
      description: exp.description,
    });
    setEditingId(exp.id);
    setIsAdding(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdding) {
      addExperience(formData);
      setIsAdding(false);
    } else if (editingId) {
      updateExperience(editingId, formData);
      setEditingId(null);
    }
  };

  const handleDelete = (id, role) => {
    if (window.confirm(`Delete experience entry "${role}"?`)) {
      deleteExperience(id);
    }
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.8rem', color: '#ffffff' }}>
            Career Experience Management
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Manage your work history timeline, roles, companies, and achievements
          </p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Add New Experience</span>
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="admin-card" style={{ border: '1px solid rgba(255, 107, 0, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#ff6b00', fontWeight: '600' }}>
              {isAdding ? '💼 Add Career Timeline Entry' : '✏️ Edit Career Entry'}
            </h3>
            <button
              onClick={() => { setIsAdding(false); setEditingId(null); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>TIMEFRAME</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="2024 — Present"
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>ROLE / TITLE</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Senior Website Specialist"
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>COMPANY / CLIENT</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Agency / Remote"
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>DESCRIPTION</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Key responsibilities and achievements..."
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="admin-btn admin-btn-primary">
                <Check size={16} />
                <span>Save Experience Entry</span>
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
              <th>Timeline</th>
              <th>Role</th>
              <th>Company</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp.id}>
                <td>
                  <span className="admin-badge">{exp.date}</span>
                </td>
                <td style={{ fontWeight: '600', color: '#ffffff' }}>{exp.role}</td>
                <td style={{ color: '#ff6b00' }}>{exp.company}</td>
                <td style={{ color: 'var(--text-secondary)', maxWidth: '340px' }}>
                  {exp.description}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenEdit(exp)}
                      style={{ background: 'none', border: 'none', color: '#ffab5e', cursor: 'pointer' }}
                      title="Edit"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id, exp.role)}
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
