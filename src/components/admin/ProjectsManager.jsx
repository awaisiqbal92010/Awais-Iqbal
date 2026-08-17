import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Check, X, Image } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export default function ProjectsManager() {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'E-Commerce',
    description: '',
    tech: '',
    image: '',
    liveUrl: '',
    githubUrl: '',
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'E-Commerce',
      description: '',
      tech: 'React, Next.js, Tailwind CSS',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      liveUrl: 'https://',
      githubUrl: 'https://github.com/',
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleOpenEdit = (project) => {
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      tech: project.tech ? project.tech.join(', ') : '',
      image: project.image || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
    });
    setEditingId(project.id);
    setIsAdding(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const techArray = formData.tech
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectPayload = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      tech: techArray,
      image: formData.image,
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl,
    };

    if (isAdding) {
      addProject(projectPayload);
      setIsAdding(false);
    } else if (editingId) {
      updateProject(editingId, projectPayload);
      setEditingId(null);
    }
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete project "${title}"?`)) {
      deleteProject(id);
    }
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.8rem', color: '#ffffff' }}>
            Projects Showcase Management
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Add, update, or remove projects displayed on the public gallery
          </p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Form modal or inline editor */}
      {(isAdding || editingId) && (
        <div className="admin-card" style={{ border: '1px solid rgba(255, 107, 0, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#ff6b00', fontWeight: '600' }}>
              {isAdding ? '🚀 Add New Project' : '✏️ Edit Project'}
            </h3>
            <button
              onClick={() => { setIsAdding(false); setEditingId(null); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>PROJECT TITLE</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Luxury Commerce Portal"
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>CATEGORY</label>
                <select
                  className="admin-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="SaaS Platform">SaaS Platform</option>
                  <option value="3D Web Experience">3D Web Experience</option>
                  <option value="Full-Stack">Full-Stack</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>DESCRIPTION</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed project summary..."
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>TECH STACK (comma separated)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.tech}
                  onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                  placeholder="React, Next.js, Stripe, Tailwind"
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>SCREENSHOT / IMAGE URL</label>
                <input
                  type="url"
                  className="admin-input"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>LIVE PREVIEW URL</label>
                <input
                  type="url"
                  className="admin-input"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://myproject.com"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>GITHUB REPOSITORY URL</label>
                <input
                  type="url"
                  className="admin-input"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="admin-btn admin-btn-primary">
                <Check size={16} />
                <span>{isAdding ? 'Save & Publish Project' : 'Save Changes'}</span>
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

      {/* Projects Table */}
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Title</th>
              <th>Category</th>
              <th>Tech Stack</th>
              <th>Links</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                </td>
                <td style={{ fontWeight: '600', color: '#ffffff' }}>{p.title}</td>
                <td>
                  <span className="admin-badge">{p.category}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '200px' }}>
                    {p.tech && p.tech.map((t, idx) => (
                      <span key={idx} style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                        {t}{idx < p.tech.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b00' }}>
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
                        <GithubIcon size={14} />
                      </a>
                    )}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenEdit(p)}
                      style={{ background: 'none', border: 'none', color: '#ffab5e', cursor: 'pointer' }}
                      title="Edit"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
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
