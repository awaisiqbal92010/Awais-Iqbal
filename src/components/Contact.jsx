import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { siteSettings, addMessage } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="contact-wrapper"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left */}
          <div className="contact-info">
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Let's build something <span className="gradient-text">extraordinary</span> together
            </h2>
            <p>
              Have an upcoming web project, eCommerce redesign, or want to collaborate? Send me a message and let's craft an industry-leading digital product.
            </p>

            <div className="contact-links">
              <a href={`mailto:${siteSettings.email || 'vcwithawais@gmail.com'}`} className="contact-link">
                <span className="link-icon">
                  <Mail size={18} />
                </span>
                <span>{siteSettings.email || 'vcwithawais@gmail.com'}</span>
              </a>
              <a href={`tel:${siteSettings.phone || '+923001234567'}`} className="contact-link">
                <span className="link-icon">
                  <Phone size={18} />
                </span>
                <span>{siteSettings.phone || '+92 300 123 4567'}</span>
              </a>
              <div className="contact-link">
                <span className="link-icon">
                  <MapPin size={18} />
                </span>
                <span>{siteSettings.location || 'Pakistan'}</span>
              </div>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="link-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </span>
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Right – Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            {submitted && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 18px',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                borderRadius: '12px',
                color: '#22c55e',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                <CheckCircle2 size={18} />
                <span>Message received! I will review your request and get back to you shortly.</span>
              </div>
            )}

            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject / Project Type (e.g. Next.js SaaS Website)"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Tell me about your project goals, timeline, and requirements..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-submit">
              <motion.button
                type="submit"
                className="btn-primary"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Send Message</span>
                <Send size={16} />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
