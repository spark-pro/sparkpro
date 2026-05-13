'use client';

import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function Contact() {
  const contactItems = [
    { icon: Mail, label: 'Email', value: 'info@sparkpro.in', href: 'mailto:info@sparkpro.in', grad: 'linear-gradient(135deg,#1282AE,#0A917A)', glow: 'rgba(18,130,174,0.18)' },
    { icon: Phone, label: 'Phone', value: '+91-75986 86212', href: 'tel:+917598686212', grad: 'linear-gradient(135deg,#0A7FA0,#1282AE)', glow: 'rgba(78,138,26,0.18)' },
    { icon: MapPin, label: 'Office Address', value: 'Edamalai Patti Pudhur, Trichy, Tamilnadu - 620012.', href: undefined, grad: 'linear-gradient(135deg,#0A917A,#4E8A1A)', glow: 'rgba(10,145,122,0.18)' },
    { icon: Clock, label: 'Business Hours', value: 'Monday – Saturday\n9:30 AM – 6:30 PM', href: undefined, grad: 'linear-gradient(135deg,#0A7A68,#1282AE)', glow: 'rgba(10,145,122,0.18)' },
  ];

  return (
    <div style={{ background: 'var(--cs-bg)' }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '7rem 0 6rem' }}>
        <div className="cs-orb" style={{ width: '600px', height: '600px', top: '-20%', right: '-10%', background: 'radial-gradient(circle, rgba(18,130,174,0.1) 0%, transparent 70%)' }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative' }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <div className="cs-eyebrow">
                <span className="cs-label">Reach Out</span>
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              color: 'var(--cs-text)',
              maxWidth: '640px',
              marginBottom: '1.25rem',
            }}>
              Get{' '}
              <span style={{
                background: 'linear-gradient(90deg, #4DC8E8 0%, #1EC8A8 40%, #80CC30 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>in Touch</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Mulish', sans-serif",
              fontSize: '1.0625rem',
              color: 'var(--cs-text-2)',
              lineHeight: 1.8,
              maxWidth: '520px',
            }}>
              We are here to help you build scalable business systems with integrated HR, IT, and AI solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Content ── */}
      <section style={{ background: 'var(--cs-bg-2)', padding: '6rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div className="grid lg:grid-cols-2 gap-14 items-start">

              {/* Contact Info */}
              <div>
                <motion.div variants={fadeUp} style={{ marginBottom: '2.5rem' }}>
                  <div className="cs-eyebrow">
                    <span className="cs-label">Contact Information</span>
                  </div>
                  <h2 style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    color: 'var(--cs-text)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                  }}>
                    Let's start a conversation
                  </h2>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {contactItems.map(({ icon: Icon, label, value, href, grad, glow }, i) => (
                    <motion.div key={i} variants={fadeUp} className="cs-card" style={{
                      padding: '1.375rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1.125rem',
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '0.75rem',
                        background: grad,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: `0 4px 20px ${glow}`,
                      }}>
                        <Icon size={20} style={{ color: '#fff' }} />
                      </div>
                      <div>
                        <p style={{
                          fontFamily: "'Mulish', sans-serif",
                          fontWeight: 700,
                          fontSize: '0.6875rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#7A90BC',
                          marginBottom: '0.375rem',
                        }}>{label}</p>
                        {href ? (
                          <a href={href} style={{
                            fontFamily: "'Mulish', sans-serif",
                            fontSize: '1rem',
                            fontWeight: 600,
                            background: 'linear-gradient(90deg, #4DC8E8, #80CC30)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textDecoration: 'none',
                          }}>
                            {value}
                          </a>
                        ) : (
                          <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '1rem', color: 'var(--cs-text-2)', fontWeight: 500, whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                            {value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* WhatsApp */}
                <motion.div variants={fadeUp} style={{ marginTop: '1.5rem' }}>
                  <a
                    href="https://wa.me/917598686212"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                      padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                      background: 'linear-gradient(135deg, #128C7E, #25D366)',
                      color: '#FFFFFF', fontFamily: "'Mulish', sans-serif", fontWeight: 700,
                      fontSize: '0.9375rem', textDecoration: 'none',
                      boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                      transition: 'box-shadow 0.25s, filter 0.25s, transform 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.5)';
                      e.currentTarget.style.filter = 'brightness(1.1)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.3)';
                      e.currentTarget.style.filter = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </motion.div>
              </div>

              {/* Image */}
              <motion.div variants={fadeUp} className="hidden lg:block" style={{
                padding: '2px',
                borderRadius: '1.25rem',
                background: 'linear-gradient(135deg, rgba(18,130,174,0.3), rgba(78,138,26,0.18))',
                boxShadow: '0 0 60px rgba(18,130,174,0.1), 0 24px 64px rgba(0,0,0,0.5)',
              }}>
                <div style={{ borderRadius: '1.125rem', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1765438869297-6fa4b627906a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBzdHJhdGVneSUyMHBsYW5uaW5nfGVufDF8fHx8MTc3MTMwMjcwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Contact us"
                    style={{ display: 'block', width: '100%', height: '100%', minHeight: '480px', objectFit: 'cover', opacity: 0.8 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cs-on-dark" style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0F0C2E 0%, #0C1840 30%, #061530 60%, #040C1E 100%)' }} />
        <div className="cs-orb" style={{ width: '700px', height: '700px', top: '-30%', left: '-15%', background: 'radial-gradient(circle, rgba(18,130,174,0.12) 0%, transparent 65%)' }} />
        <div className="cs-orb" style={{ width: '500px', height: '500px', bottom: '-20%', right: '-5%', background: 'radial-gradient(circle, rgba(78,138,26,0.1) 0%, transparent 65%)' }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <div className="cs-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="cs-label">Build Together</span>
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              color: 'var(--cs-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
            }}>
              Let's Build Your{' '}
              <span style={{
                background: 'linear-gradient(90deg, #4DC8E8, #1EC8A8, #80CC30)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Business Future</span>{' '}Together
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Mulish', sans-serif", fontSize: '1.0625rem', color: 'var(--cs-text-2)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Whether you need HR infrastructure, custom software development, or AI automation, our team is ready to help you build scalable and innovative solutions.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <a href="mailto:info@sparkpro.in" className="cs-btn cs-btn-grad">
                <Mail size={16} /> Email Us
              </a>
              <a href="tel:+917598686212" className="cs-btn cs-btn-glass">
                <Phone size={16} /> Call Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
