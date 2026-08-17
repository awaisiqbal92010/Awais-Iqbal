import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { experiences } = usePortfolio();

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Experience</div>
          <h2 className="section-title">
            My Professional <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id || exp.role}
              className="glass-card timeline-item"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="timeline-date" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} />
                <span>{exp.date}</span>
              </div>
              <div className="timeline-role">{exp.role}</div>
              <div className="timeline-company" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Briefcase size={14} />
                <span>{exp.company}</span>
              </div>
              <p className="timeline-desc">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
