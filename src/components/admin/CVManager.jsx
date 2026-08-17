import React, { useState } from 'react';
import { FileText, Check, Plus, Trash2, Eye, Award, GraduationCap, Briefcase } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function CVManager() {
  const { cvData, setCvData, setIsResumeOpen } = usePortfolio();
  const [formData, setFormData] = useState({ ...cvData });
  const [saved, setSaved] = useState(false);

  const handleCompetencyChange = (index, field, value) => {
    const updated = [...formData.competencies];
    updated[index][field] = value;
    setFormData({ ...formData, competencies: updated });
  };

  const handleAddCompetency = () => {
    setFormData({
      ...formData,
      competencies: [
        ...formData.competencies,
        { label: 'New Skill Domain', skills: 'Skill 1, Skill 2, Skill 3' }
      ]
    });
  };

  const handleDeleteCompetency = (index) => {
    const updated = formData.competencies.filter((_, idx) => idx !== index);
    setFormData({ ...formData, competencies: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCvData(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.8rem', color: '#ffffff' }}>
            ATS CV &amp; Resume Editor
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Write and customize your resume content displayed in the navbar's ATS Resume viewer
          </p>
        </div>
        <button
          type="button"
          className="admin-btn"
          style={{ background: 'rgba(255, 107, 0, 0.15)', color: '#ffab5e', border: '1px solid rgba(255, 107, 0, 0.3)' }}
          onClick={() => setIsResumeOpen(true)}
        >
          <Eye size={16} />
          <span>Preview ATS Resume</span>
        </button>
      </div>

      <div className="admin-card" style={{ maxWidth: '850px' }}>
        <form onSubmit={handleSubmit}>
          {/* Contact & Personal Information */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1rem', color: '#ff6b00', fontWeight: '600', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
              👤 Personal &amp; Contact Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>FULL NAME</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Awais Iqbal"
                  required
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>TARGET JOB TITLE</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  placeholder="Website Development Specialist | Senior Frontend Engineer"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>RESUME EMAIL</label>
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
                  placeholder="Pakistan (Open to Remote)"
                  required
                />
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1rem', color: '#ff6b00', fontWeight: '600', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
              📝 Professional Summary
            </h3>
            <textarea
              className="admin-textarea"
              rows={4}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="High-impact ATS summary with keywords like React, Next.js, WebGL, Full-Stack, Performance..."
              required
            />
          </div>

          {/* Technical Core Competencies */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
              <h3 style={{ fontSize: '1rem', color: '#ff6b00', fontWeight: '600', margin: 0 }}>
                ⚡ Technical Core Competencies (ATS Keyword Matrix)
              </h3>
              <button
                type="button"
                onClick={handleAddCompetency}
                className="admin-btn"
                style={{ background: 'rgba(255, 107, 0, 0.15)', color: '#ffab5e', padding: '4px 10px', fontSize: '0.75rem' }}
              >
                <Plus size={13} />
                <span>Add Skill Row</span>
              </button>
            </div>

            {formData.competencies.map((comp, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr 36px',
                  gap: '12px',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}
              >
                <input
                  type="text"
                  className="admin-input"
                  value={comp.label}
                  onChange={(e) => handleCompetencyChange(idx, 'label', e.target.value)}
                  placeholder="Domain Name"
                  required
                  style={{ marginTop: 0 }}
                />
                <input
                  type="text"
                  className="admin-input"
                  value={comp.skills}
                  onChange={(e) => handleCompetencyChange(idx, 'skills', e.target.value)}
                  placeholder="Comma separated skills & keywords..."
                  required
                  style={{ marginTop: 0 }}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteCompetency(idx)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Remove Row"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Education & Certifications */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', color: '#ff6b00', fontWeight: '600', marginBottom: '10px' }}>
                🎓 Education
              </h3>
              <textarea
                className="admin-textarea"
                rows={3}
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="Degrees, universities, relevant coursework..."
                required
              />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', color: '#ff6b00', fontWeight: '600', marginBottom: '10px' }}>
                🏆 Certifications &amp; Licenses
              </h3>
              <textarea
                className="admin-textarea"
                rows={3}
                value={formData.certifications}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                placeholder="Meta Frontend, AWS, React Specializations..."
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '12px 24px' }}>
              <Check size={16} />
              <span>Save &amp; Update Live CV</span>
            </button>
            {saved && (
              <span style={{ color: '#22c55e', fontSize: '0.88rem', fontWeight: '600' }}>
                ✓ CV successfully updated and synchronized with ATS Resume view!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
