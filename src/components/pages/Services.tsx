'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Code, Bot, ArrowRight, CheckCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

interface ServiceBlockProps {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  intro: string;
  services: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  bg?: string;
  iconGrad: string;
  iconGlow: string;
  checkColor: string;
}

function ServiceBlock({ id, icon: Icon, title, subtitle, intro, services, image, imageAlt, reverse, bg, iconGrad, iconGlow, checkColor }: ServiceBlockProps) {
  return (
    <section id={id} style={{ background: bg || '#0B0F1E', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <div className={`grid md:grid-cols-2 gap-14 items-center ${reverse ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1' : ''}`}>

            {/* Content */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="cs-eyebrow">
                <span className="cs-label">{subtitle}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '0.875rem', background: iconGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 24px ${iconGlow}` }}>
                  <Icon size={26} style={{ color: '#fff' }} />
                </div>
                <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'var(--cs-text)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>{title}</h2>
              </div>
              <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '1rem', color: 'var(--cs-text-2)', lineHeight: 1.8 }}>{intro}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {services.map((service, i) => (
                  <motion.div key={i} variants={fadeUp} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.625rem 0',
                    borderBottom: i < services.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}>
                    <CheckCircle size={15} style={{ color: checkColor, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.9375rem', color: 'var(--cs-text-2)' }}>{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div variants={fadeUp} style={{
              padding: '2px',
              borderRadius: '1.25rem',
              background: iconGrad,
              boxShadow: `0 0 60px ${iconGlow}, 0 24px 64px rgba(0,0,0,0.5)`,
              opacity: 0.9,
            }}>
              <div style={{ borderRadius: '1.125rem', overflow: 'hidden' }}>
                <img src={image} alt={imageAlt} style={{ display: 'block', width: '100%', aspectRatio: '4/3', objectFit: 'cover', opacity: 0.85 }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Services() {
  const hrServices = [
    'HR Policy & Governance Frameworks',
    'Employment Documentation Architecture',
    'Talent Acquisition & Recruitment Systems',
    'Onboarding & Workforce Enablement',
    'HR Process Automation & Digitalization',
    'HRMS Implementation & Optimization',
    'Compliance Audits & Advisory',
    'Payroll & Compensation Structuring',
  ];

  const itServices = [
    'Custom Web Application Development',
    'Mobile App Development (iOS & Android)',
    'Enterprise Software Solutions',
    'Cloud-Based Platform Development',
    'API Development & System Integration',
    'Database Design & Management',
    'E-commerce & Marketplace Solutions',
    'Software Maintenance & Support',
  ];

  const aiServices = [
    'AI Chatbots & Virtual Assistants',
    'Process Automation & Workflow Intelligence',
    'Predictive Analytics & Business Intelligence',
    'Natural Language Processing Solutions',
    'Machine Learning Model Development',
    'Document Processing & OCR Automation',
    'Intelligent Data Extraction & Analysis',
    'AI-Powered Customer Service Systems',
  ];

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.substring(1));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

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
                <span className="cs-label">What We Offer</span>
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
              marginBottom: '1.25rem',
            }}>
              Our{' '}
              <span style={{
                background: 'linear-gradient(90deg, #4DC8E8 0%, #1EC8A8 40%, #80CC30 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Services</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Mulish', sans-serif",
              fontSize: '1.0625rem',
              color: 'var(--cs-text-2)',
              lineHeight: 1.8,
              maxWidth: '600px',
              marginBottom: '2rem',
            }}>
              Spark Pro delivers end-to-end solutions combining strategic HR infrastructure, custom software development, and AI automation — designed for startups, SMEs, and growing businesses.
            </motion.p>
            {/* Jump links */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {[
                { href: '#hr-services', label: 'HR Services', color: '#4DC8E8' },
                { href: '#it-services', label: 'IT Services', color: '#80CC30' },
                { href: '#ai-services', label: 'AI Services', color: '#4DC8E8' },
              ].map(({ href, label, color }) => (
                <a key={href} href={href} style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '2rem',
                  border: `1px solid ${color}33`,
                  background: `${color}11`,
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}66`; e.currentTarget.style.background = `${color}1A`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}33`; e.currentTarget.style.background = `${color}11`; }}
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Service Blocks ── */}
      <ServiceBlock
        id="hr-services"
        icon={Users}
        title="HR Services"
        subtitle="People Systems"
        intro="Build compliant, structured, and scalable HR systems from foundation to compliance. We provide end-to-end HR solutions that support your business growth and workforce development."
        services={hrServices}
        image="https://images.unsplash.com/photo-1758873268663-5a362616b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzEyMDQ3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
        imageAlt="HR Services"
        bg="#0B0F1E"
        iconGrad="linear-gradient(135deg, #1282AE, #0A917A)"
        iconGlow="rgba(18,130,174,0.22)"
        checkColor="#4DC8E8"
      />

      <ServiceBlock
        id="it-services"
        icon={Code}
        title="IT Services"
        subtitle="Technology Solutions"
        intro="Transform your business operations with custom software solutions. We build web applications, mobile apps, and enterprise systems tailored to your specific business needs."
        services={itServices}
        image="https://images.unsplash.com/photo-1762330464415-e971f55ae0b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIUiUyMHRlY2hub2xvZ3klMjBkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb258ZW58MXx8fHwxNzcxMzEwOTU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
        imageAlt="IT Services"
        reverse
        bg="#111827"
        iconGrad="linear-gradient(135deg, #0A7FA0, #1282AE)"
        iconGlow="rgba(78,138,26,0.2)"
        checkColor="#80CC30"
      />

      <ServiceBlock
        id="ai-services"
        icon={Bot}
        title="AI Services"
        subtitle="Intelligent Automation"
        intro="Leverage the power of AI to automate workflows, enhance decision-making, and streamline operations. Our AI solutions help businesses work smarter and faster."
        services={aiServices}
        image="https://images.unsplash.com/photo-1758611972613-3afe657c3249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3JrcGxhY2UlMjBjdWx0dXJlfGVufDF8fHx8MTc3MTMxMDk1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
        imageAlt="AI Services"
        bg="#0B0F1E"
        iconGrad="linear-gradient(135deg, #0A917A, #4E8A1A)"
        iconGlow="rgba(10,145,122,0.2)"
        checkColor="#4DC8E8"
      />

      {/* ── Closing CTA ── */}
      <section className="cs-on-dark" style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #0F0C2E 0%, #0C1840 30%, #061530 60%, #040C1E 100%)',
        }} />
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
                <span className="cs-label">Integrated Excellence</span>
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.875rem, 4vw, 3.25rem)',
              color: 'var(--cs-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              marginBottom: '1.25rem',
            }}>
              <span style={{ background: 'linear-gradient(90deg,#4DC8E8,#1EC8A8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Structured HR.</span>{' '}
              <span style={{ background: 'linear-gradient(90deg,#80CC30,#4DC8E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Custom Technology.</span>{' '}
              <span style={{ background: 'linear-gradient(90deg,#4DC8E8,#80CC30)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Intelligent Automation.</span>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "'Mulish', sans-serif", fontSize: '1rem', color: 'var(--cs-text-2)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Our services work together seamlessly to support your business growth and digital transformation journey.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contact" className="cs-btn cs-btn-grad" style={{ fontSize: '1rem', paddingLeft: '2.25rem', paddingRight: '2.25rem' }}>
                Start Your Transformation
                <ArrowRight size={17} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
