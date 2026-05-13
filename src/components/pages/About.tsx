'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Target, Eye, TrendingUp, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function About() {
  const approach = [
    { title: 'Discover', description: 'We analyze your business needs, challenges, and growth objectives to identify the right solutions.', icon: '🔍', num: '01' },
    { title: 'Design', description: 'We architect scalable systems and strategic frameworks tailored to your business goals.', icon: '🎯', num: '02' },
    { title: 'Build', description: 'We develop and implement custom solutions, from HR systems to software applications and AI automation.', icon: '🛠️', num: '03' },
    { title: 'Optimize', description: 'We continuously refine, monitor, and enhance systems to ensure long-term efficiency and scalability.', icon: '⚡', num: '04' },
  ];

  const whatMakesUsDifferent = [
    { title: 'Integrated Solutions', description: 'We don\'t offer isolated services. Our HR, IT, and AI solutions work together seamlessly.', icon: '🔗', grad: 'linear-gradient(135deg,#1282AE,#0A917A)', glow: 'rgba(18,130,174,0.18)' },
    { title: 'End-to-End Delivery', description: 'From strategy to implementation, we handle the complete journey.', icon: '🎯', grad: 'linear-gradient(135deg,#0A7FA0,#1282AE)', glow: 'rgba(78,138,26,0.18)' },
    { title: 'Technology-First Approach', description: 'We leverage the latest technology to build future-ready business systems.', icon: '💡', grad: 'linear-gradient(135deg,#0A917A,#4E8A1A)', glow: 'rgba(10,145,122,0.18)' },
    { title: 'Scalable & Sustainable', description: 'Our solutions are designed to grow with your business and support long-term success.', icon: '📈', grad: 'linear-gradient(135deg,#0A7A68,#1282AE)', glow: 'rgba(10,145,122,0.18)' },
  ];

  const values = [
    'Innovation & Excellence',
    'Transparency & Trust',
    'Client-Centric Partnership',
    'Scalability & Sustainability',
    'Quality & Reliability',
    'Future-Ready Approach',
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
                <span className="cs-label">About Spark Pro</span>
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              color: 'var(--cs-text)',
              maxWidth: '780px',
              marginBottom: '1.5rem',
            }}>
              Who{' '}
              <span style={{
                background: 'linear-gradient(90deg, #4DC8E8 0%, #1EC8A8 40%, #80CC30 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>We Are</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Mulish', sans-serif",
              fontSize: '1.0625rem',
              color: 'var(--cs-text-2)',
              lineHeight: 1.8,
              maxWidth: '620px',
            }}>
              Spark Pro is a business solutions company offering integrated services in HR, IT (software development), and AI automation. We help startups, SMEs, and growing businesses build scalable, innovative, and future-ready operations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section style={{ background: 'var(--cs-bg-2)', padding: '5rem 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 700,
              fontStyle: 'italic',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              lineHeight: 1.6,
              background: 'linear-gradient(90deg, #2E8FAA 0%, #E8EDFF 50%, #A5F3FC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              "We believe businesses need more than isolated solutions. They need integrated systems that connect people, processes, and technology — driving growth, efficiency, and lasting innovation."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section style={{ background: 'var(--cs-bg)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="cs-orb" style={{ width: '400px', height: '400px', top: '0', left: '0', background: 'radial-gradient(circle, rgba(26,170,217,0.1) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: '3rem' }}>
              <div className="cs-eyebrow">
                <span className="cs-label">Our Direction</span>
              </div>
              <h2 style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)',
                color: 'var(--cs-text)',
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
              }}>
                Vision &amp; Mission
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Eye, title: 'Our Vision', text: 'To become a trusted partner for businesses seeking integrated solutions that combine people systems, custom technology, and intelligent automation.', grad: 'linear-gradient(135deg,#1282AE,#0A917A)' },
                { icon: Target, title: 'Our Mission', text: 'To help businesses build scalable infrastructure through strategic HR systems, custom software development, and AI-driven automation that support sustainable growth.', grad: 'linear-gradient(135deg,#0A917A,#4E8A1A)' },
              ].map(({ icon: Icon, title, text, grad }, i) => (
                <motion.div key={i} variants={fadeUp} className="cs-card-grad" style={{ padding: '2.5rem' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '0.75rem', background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(18,130,174,0.22)' }}>
                    <Icon size={24} style={{ color: '#fff' }} />
                  </div>
                  <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '1.375rem', color: 'var(--cs-text)', marginBottom: '0.875rem' }}>{title}</h3>
                  <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '1rem', color: 'var(--cs-text-2)', lineHeight: 1.75 }}>{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What Makes Us Different ── */}
      <section style={{ background: 'var(--cs-bg-2)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="cs-orb" style={{ width: '500px', height: '500px', top: '0', right: '-10%', background: 'radial-gradient(circle, rgba(10,145,122,0.08) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div className="cs-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="cs-label">Our Edge</span>
              </div>
              <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', color: 'var(--cs-text)', letterSpacing: '-0.02em', lineHeight: 1.12 }}>
                What Makes Us Different
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {whatMakesUsDifferent.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="cs-card" style={{ padding: '1.875rem', textAlign: 'center' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '0.75rem', background: item.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', fontSize: '1.5rem', boxShadow: `0 4px 20px ${item.glow}` }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '1.125rem', color: 'var(--cs-text)', marginBottom: '0.625rem', lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.9rem', color: 'var(--cs-text-2)', lineHeight: 1.7 }}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section style={{ background: 'var(--cs-bg)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="cs-orb" style={{ width: '400px', height: '400px', bottom: '0', left: '0', background: 'radial-gradient(circle, rgba(78,138,26,0.06) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: '3rem' }}>
              <div className="cs-eyebrow">
                <span className="cs-label">How We Work</span>
              </div>
              <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', color: 'var(--cs-text)', letterSpacing: '-0.02em', lineHeight: 1.12 }}>
                Our Approach
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {approach.map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="cs-card-grad" style={{ padding: '2rem', position: 'relative' }}>
                  <div className="cs-step-num" style={{ marginBottom: '0.5rem' }}>{step.num}</div>
                  <div style={{ fontSize: '2rem', marginBottom: '0.875rem' }}>{step.icon}</div>
                  <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '1.25rem', color: 'var(--cs-text)', marginBottom: '0.625rem' }}>{step.title}</h3>
                  <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.9rem', color: 'var(--cs-text-2)', lineHeight: 1.7 }}>{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Image + Text ── */}
      <section style={{ background: 'var(--cs-bg-2)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div className="grid md:grid-cols-2 gap-14 items-center">
              <motion.div variants={fadeUp} style={{
                borderRadius: '1.25rem',
                overflow: 'hidden',
                padding: '2px',
                background: 'linear-gradient(135deg, rgba(18,130,174,0.3), rgba(78,138,26,0.18))',
                boxShadow: '0 0 60px rgba(18,130,174,0.1), 0 24px 64px rgba(0,0,0,0.5)',
              }}>
                <div style={{ borderRadius: '1.125rem', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1765438869297-6fa4b627906a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBzdHJhdGVneSUyMHBsYW5uaW5nfGVufDF8fHx8MTc3MTMwMjcwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Strategy planning"
                    style={{ display: 'block', width: '100%', aspectRatio: '4/3', objectFit: 'cover', opacity: 0.85 }}
                  />
                </div>
              </motion.div>
              <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="cs-eyebrow">
                  <span className="cs-label">Our Promise</span>
                </div>
                <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--cs-text)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  Building Future-Ready Business Systems
                </h2>
                <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '1rem', color: 'var(--cs-text-2)', lineHeight: 1.8 }}>
                  Our team combines expertise in HR strategy, software development, and AI innovation to deliver solutions that are both practical and transformative. We understand the challenges of growing businesses and build systems that scale with your ambitions.
                </p>
                <Link
                  href="/services"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    fontFamily: "'Mulish', sans-serif", fontWeight: 700, fontSize: '0.9375rem',
                    background: 'linear-gradient(90deg, #4DC8E8, #80CC30)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    textDecoration: 'none',
                  }}
                >
                  Explore Our Services <TrendingUp size={15} style={{ color: '#4DC8E8' }} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section style={{ background: 'var(--cs-bg)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="cs-orb" style={{ width: '600px', height: '600px', top: '-20%', right: '-10%', background: 'radial-gradient(circle, rgba(18,130,174,0.08) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div className="cs-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="cs-label">Core Values</span>
              </div>
              <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', color: 'var(--cs-text)', letterSpacing: '-0.02em', lineHeight: 1.12 }}>
                The principles that guide everything we do
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {values.map((value, i) => (
                <motion.div key={i} variants={fadeUp} className="cs-value-pill">
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '0.5rem',
                    background: 'linear-gradient(135deg, #1282AE, #4E8A1A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(18,130,174,0.18)',
                    fontSize: '0.875rem',
                  }}>
                    ✦
                  </div>
                  <span style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.9375rem', color: '#4DC8E8', fontWeight: 600 }}>{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--cs-bg-2)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="cs-orb" style={{ width: '500px', height: '500px', top: '-20%', left: '-10%', background: 'radial-gradient(circle, rgba(18,130,174,0.08) 0%, transparent 70%)' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <div className="cs-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="cs-label">Let's Talk</span>
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: 'var(--cs-text)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Ready to Transform Your Business?
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Mulish', sans-serif", fontSize: '1.0625rem', color: 'var(--cs-text-2)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Let's discuss how our integrated HR, IT, and AI solutions can help you build a scalable, efficient, and future-ready business.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contact" className="cs-btn cs-btn-grad" style={{ fontSize: '1rem', paddingLeft: '2.25rem', paddingRight: '2.25rem' }}>
                Schedule a Consultation
                <ArrowRight size={17} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
