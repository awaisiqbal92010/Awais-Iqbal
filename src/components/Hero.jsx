import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';
import Background3D from './Background3D';
import myImage from '/myimage.png';
import { usePortfolio } from '../context/PortfolioContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }
  }
};

export default function Hero() {
  const { siteSettings } = usePortfolio();

  return (
    <section className="hero" id="hero">
      <Background3D />

      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left – Text */}
          <div className="hero-text">
            <motion.div className="hero-badge" variants={itemVariants}>
              <span className="pulse" />
              Available for Projects
            </motion.div>

            <motion.h1 className="hero-name" variants={itemVariants}>
              Awais <span className="gradient-text">Iqbal</span>
            </motion.h1>

            <motion.p className="hero-role" variants={itemVariants}>
              {siteSettings.heroTagline || 'Website Development Specialist'}
            </motion.p>

            <motion.p className="hero-description" variants={itemVariants}>
              {siteSettings.heroBio || 'I design & engineer high-performance, modern websites and web applications. Merging cutting-edge technologies with seamless user experiences.'}
            </motion.p>

            <motion.div className="hero-actions" variants={itemVariants}>
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>View My Work</span>
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-outline"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            <motion.div className="hero-stats" variants={itemVariants}>
              <div className="hero-stat">
                <div className="hero-stat-number">{siteSettings.yearsExperience || '3+'}</div>
                <div className="hero-stat-label">Years Experience</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">{siteSettings.projectsDelivered || '50+'}</div>
                <div className="hero-stat-label">Projects Delivered</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">{siteSettings.satisfiedClients || '30+'}</div>
                <div className="hero-stat-label">Satisfied Clients</div>
              </div>
            </motion.div>
          </div>

          {/* Right – Image */}
          <motion.div className="hero-image-wrapper" variants={imageVariants}>
            <div className="hero-image-container">
              <div className="hero-image-glow" />
              <div className="hero-image-ring" />
              <img
                src={myImage}
                alt="Awais Iqbal — Website Development Specialist"
                className="hero-image"
              />

              <motion.div
                className="hero-floating-badge top-right"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="badge-icon">
                  <Zap size={16} />
                </span>
                <span>React &amp; Next.js</span>
              </motion.div>

              <motion.div
                className="hero-floating-badge bottom-left"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <span className="badge-icon">
                  <Sparkles size={16} />
                </span>
                <span>UI/UX &amp; 3D Web</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
