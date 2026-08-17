import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Server, Layout, Globe, Smartphone, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Icon Map fallback
const ICON_MAP = {
  Code2: <Code2 size={26} />,
  Server: <Server size={26} />,
  Layout: <Layout size={26} />,
  Globe: <Globe size={26} />,
  Smartphone: <Smartphone size={26} />,
  Sparkles: <Sparkles size={26} />,
};

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { services } = usePortfolio();

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Skills &amp; Expertise
          </div>
          <h2 className="section-title">
            Technologies &amp; Services I <span className="gradient-text">Master</span>
          </h2>
        </motion.div>

        <div className="skills-grid">
          {services.map((skill, i) => (
            <motion.div
              key={skill.id || skill.title}
              className="glass-card skill-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, boxShadow: '0 0 40px rgba(255, 107, 0, 0.15)' }}
            >
              <div className="skill-card-icon">
                {ICON_MAP[skill.icon] || <Code2 size={26} />}
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <div className="skill-tags">
                {skill.tags && skill.tags.map((tag, idx) => (
                  <span key={idx} className="skill-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
