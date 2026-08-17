import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const CATEGORIES = ['All', 'E-Commerce', 'SaaS Platform', '3D Web Experience', 'Full-Stack'];

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { projects } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory.toLowerCase().includes(p.category.toLowerCase()));

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Featured Portfolio
          </div>
          <h2 className="section-title">
            Featured Projects &amp; <span className="gradient-text">Showcases</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Explore a curated collection of live client applications, high-performance SaaS tools, and 3D web experiences.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="project-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`project-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                className="glass-card project-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
              >
                {/* Project Image Box */}
                <div
                  className="project-card-image-wrapper"
                  onClick={() => setSelectedProject(project)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'}
                    alt={project.title}
                    className="project-card-image"
                    loading="lazy"
                  />
                  <div className="project-card-overlay">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff6b00', fontWeight: '600', fontSize: '0.85rem' }}>
                      <Sparkles size={16} />
                      <span>Click to view details</span>
                    </div>
                  </div>
                </div>

                {/* Project Body */}
                <div className="project-card-body">
                  <div className="project-card-category">{project.category}</div>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>
                  
                  {/* Tech stack badges */}
                  <div className="project-card-tech">
                    {project.tech && project.tech.map((t, idx) => (
                      <span key={idx}>{t}</span>
                    ))}
                  </div>

                  {/* Actions (Live preview & GitHub) */}
                  <div className="project-card-actions">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-action btn-action-primary"
                      >
                        <span>Live Preview</span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-action btn-action-secondary"
                      >
                        <span>Code</span>
                        <GithubIcon size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="offer-modal-backdrop" onClick={() => setSelectedProject(null)}>
            <motion.div
              className="glass-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ maxWidth: '650px', width: '100%', padding: '32px', position: 'relative', background: '#121212' }}
            >
              <button
                className="offer-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '16px', marginBottom: '20px' }}
              />

              <div className="project-card-category">{selectedProject.category}</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '2rem', marginBottom: '12px' }}>
                {selectedProject.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
                {selectedProject.description}
              </p>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                  TECHNOLOGY STACK
                </div>
                <div className="project-card-tech">
                  {selectedProject.tech && selectedProject.tech.map((t, idx) => (
                    <span key={idx}>{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={16} />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <span>View Repository</span>
                    <GithubIcon size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
