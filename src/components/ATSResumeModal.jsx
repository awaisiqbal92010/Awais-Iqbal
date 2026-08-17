import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ATSResumeModal({ isOpen, onClose }) {
  const { cvData, experiences, projects } = usePortfolio();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const cv = cvData || {};

  return (
    <AnimatePresence>
      <div className="offer-modal-backdrop" onClick={onClose} style={{ zIndex: 10000 }}>
        <motion.div
          className="glass-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            maxWidth: '850px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: '#ffffff',
            color: '#1a1a1a',
            borderRadius: '20px',
            padding: '40px',
            position: 'relative',
          }}
        >
          {/* Header Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '2px solid #e5e7eb', paddingBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff6b00', fontWeight: '700', fontSize: '0.9rem' }}>
              <FileText size={18} />
              <span>ATS-OPTIMIZED RESUME &amp; CREDENTIALS VIEW</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handlePrint}
                className="admin-btn admin-btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              >
                <Printer size={15} />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                style={{ background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer' }}
                aria-label="Close"
              >
                <X size={18} color="#374151" />
              </button>
            </div>
          </div>

          {/* Resume Body */}
          <div style={{ fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>
            {/* Header / Name */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#111827', margin: 0 }}>
                {cv.fullName || 'AWAIS IQBAL'}
              </h1>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ff6b00', marginTop: '4px' }}>
                {cv.jobTitle || 'Website Development Specialist | Senior Frontend Engineer'}
              </div>
              <div style={{ fontSize: '0.88rem', color: '#4b5563', marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span>📍 {cv.location || 'Pakistan (Open to Remote Worldwide)'}</span>
                <span>📧 {cv.email || 'vcwithawais@gmail.com'}</span>
                <span>📱 {cv.phone || '+92 300 123 4567'}</span>
                <span>🌐 {cv.website || 'awaisiqbal.dev'}</span>
              </div>
            </div>

            {/* Executive Summary */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', borderBottom: '2px solid #ff6b00', paddingBottom: '4px', marginBottom: '8px', textTransform: 'uppercase' }}>
                Professional Summary
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#374151', whiteSpace: 'pre-wrap' }}>
                {cv.summary || 'Results-driven Website Development Specialist with over 3+ years of experience engineering high-performance, accessible, and conversion-optimized web applications.'}
              </p>
            </div>

            {/* Core Competencies / Technical Skills */}
            {cv.competencies && cv.competencies.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', borderBottom: '2px solid #ff6b00', paddingBottom: '4px', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Technical Core Competencies
                </h2>
                <div style={{ fontSize: '0.88rem', color: '#374151', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {cv.competencies.map((comp, idx) => (
                    <div key={idx}>
                      <strong>{comp.label}:</strong> {comp.skills}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Professional Experience */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', borderBottom: '2px solid #ff6b00', paddingBottom: '4px', marginBottom: '12px', textTransform: 'uppercase' }}>
                Professional Work Experience
              </h2>
              {experiences.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.98rem', color: '#111827' }}>
                      {exp.role} — <span style={{ color: '#ff6b00' }}>{exp.company}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#6b7280' }}>
                      {exp.date}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#4b5563', marginTop: '4px' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Key Projects */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', borderBottom: '2px solid #ff6b00', paddingBottom: '4px', marginBottom: '12px', textTransform: 'uppercase' }}>
                Featured Production Projects
              </h2>
              {projects.slice(0, 3).map((p) => (
                <div key={p.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: '700', fontSize: '0.92rem', color: '#111827' }}>
                    {p.title} <span style={{ fontWeight: 'normal', color: '#6b7280', fontSize: '0.82rem' }}>({p.category})</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
                    {p.description}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#ff6b00', marginTop: '2px' }}>
                    Tech Stack: {p.tech && p.tech.join(', ')}
                  </div>
                </div>
              ))}
            </div>

            {/* Education & Certifications */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {cv.education && (
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', borderBottom: '2px solid #ff6b00', paddingBottom: '4px', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Education
                  </h2>
                  <div style={{ fontSize: '0.88rem', color: '#374151', whiteSpace: 'pre-wrap' }}>
                    {cv.education}
                  </div>
                </div>
              )}

              {cv.certifications && (
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111827', borderBottom: '2px solid #ff6b00', paddingBottom: '4px', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Certifications &amp; Licenses
                  </h2>
                  <div style={{ fontSize: '0.88rem', color: '#374151', whiteSpace: 'pre-wrap' }}>
                    {cv.certifications}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
