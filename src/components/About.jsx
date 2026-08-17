import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Palette, Smartphone, CheckCircle2, Flame, Wrench } from 'lucide-react';

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const highlights = [
    { icon: <Rocket size={18} />, text: 'Performance-First' },
    { icon: <Palette size={18} />, text: 'Pixel-Perfect UI' },
    { icon: <Smartphone size={18} />, text: 'Fully Responsive' },
    { icon: <CheckCircle2 size={18} />, text: 'Clean Architecture' },
    { icon: <Flame size={18} />, text: 'SEO & Speed Optimized' },
    { icon: <Wrench size={18} />, text: 'Full-Stack Capability' },
  ];

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="about-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Left – Glass Card with Code */}
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', lineHeight: '2' }}
          >
            <div style={{ color: 'var(--text-tertiary)' }}>{'// about-me.js'}</div>
            <div>
              <span style={{ color: '#ff6b00' }}>const</span>{' '}
              <span style={{ color: '#ffab5e' }}>awais</span>{' '}
              <span style={{ color: 'var(--text-tertiary)' }}>=</span>{' '}
              <span style={{ color: '#ffffff' }}>{'{'}</span>
            </div>
            <div style={{ paddingLeft: '20px' }}>
              <span style={{ color: '#ff8c38' }}>name</span>:{' '}
              <span style={{ color: '#ffffff' }}>"Awais Iqbal"</span>,
            </div>
            <div style={{ paddingLeft: '20px' }}>
              <span style={{ color: '#ff8c38' }}>role</span>:{' '}
              <span style={{ color: '#ffffff' }}>"Website Development Specialist"</span>,
            </div>
            <div style={{ paddingLeft: '20px' }}>
              <span style={{ color: '#ff8c38' }}>passion</span>:{' '}
              <span style={{ color: '#ffffff' }}>"Modern, Interactive Web Experiences"</span>,
            </div>
            <div style={{ paddingLeft: '20px' }}>
              <span style={{ color: '#ff8c38' }}>stack</span>:{' '}
              <span style={{ color: '#ffab5e' }}>{'['}</span>
              <span style={{ color: '#ffffff' }}>"React"</span>,{' '}
              <span style={{ color: '#ffffff' }}>"Next.js"</span>,{' '}
              <span style={{ color: '#ffffff' }}>"Node.js"</span>,{' '}
              <span style={{ color: '#ffffff' }}>"Three.js"</span>
              <span style={{ color: '#ffab5e' }}>{']'}</span>,
            </div>
            <div style={{ paddingLeft: '20px' }}>
              <span style={{ color: '#ff8c38' }}>availableForWork</span>:{' '}
              <span style={{ color: '#22c55e' }}>true</span>,
            </div>
            <div>
              <span style={{ color: '#ffffff' }}>{'}'}</span>;
            </div>
          </motion.div>

          {/* Right – Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="section-label">About Me</div>
            <h2 className="section-title">
              Crafting digital experiences that <span className="gradient-text">deliver results</span>
            </h2>

            <p className="about-description">
              I'm Awais Iqbal, a dedicated Website Development Specialist focused on engineering
              visually striking, highly performant web applications. With a strong foundation in modern
              web architecture and modern UI principles, I build seamless digital experiences.
            </p>

            <p className="about-description">
              Whether developing high-converting marketing websites, complex SaaS dashboards, or
              interactive 3D web applications, I prioritize speed, accessibility, and pixel-perfection.
            </p>

            <div className="about-highlights">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.text}
                  className="about-highlight-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                >
                  <span className="icon">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
