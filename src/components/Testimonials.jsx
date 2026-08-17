import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Awais delivered beyond our expectations. His attention to detail and creative vision transformed our website into a work of art. The 3D elements and smooth animations blew us away.",
    name: 'Sarah Mitchell',
    title: 'CEO, BrandVault Agency',
    initials: 'SM',
  },
  {
    quote: "Working with Awais was an incredible experience. He understood our technical requirements perfectly and brought innovative design ideas that elevated our entire platform.",
    name: 'James Rodriguez',
    title: 'CTO, CloudSync Tech',
    initials: 'JR',
  },
  {
    quote: "Awais is a rare blend of technical expertise and creative flair. Our e-commerce conversion rate jumped 40% after his redesign. Absolutely world-class work.",
    name: 'Emily Chen',
    title: 'Marketing Director, LuxeStyle',
    initials: 'EC',
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="testimonials" id="testimonials" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Testimonials
          </div>
          <h2 className="section-title">
            What clients <span className="gradient-text">say about me</span>
          </h2>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="glass-card testimonial-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              whileHover={{ y: -5 }}
            >
              {/* Star rating */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', color: '#ff6b00' }}>
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={16} fill="#ff6b00" />
                ))}
              </div>

              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-author-name">{t.name}</div>
                  <div className="testimonial-author-title">{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
