'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight, Users, Code, Bot, Building2, Sparkles, Globe,
  CheckCircle, Zap, Shield, TrendingUp, Layers, Target, Star,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function Home() {
  const coreServices = [
    {
      id: 'hr',
      title: 'HR Services',
      description: 'Comprehensive HR infrastructure, talent acquisition, workforce enablement, compliance advisory, and HRMS implementation.',
      icon: Users,
      gradient: 'linear-gradient(135deg, #1282AE 0%, #0A917A 100%)',
      glow: 'rgba(18,130,174,0.18)',
    },
    {
      id: 'it',
      title: 'IT Services',
      description: 'Custom software development, web and mobile applications, cloud solutions, and enterprise system integration.',
      icon: Code,
      gradient: 'linear-gradient(135deg, #0A7FA0 0%, #1282AE 100%)',
      glow: 'rgba(78,138,26,0.18)',
    },
    {
      id: 'ai',
      title: 'AI Services',
      description: 'AI automation, intelligent workflow systems, chatbots, predictive analytics, and machine learning solutions.',
      icon: Bot,
      gradient: 'linear-gradient(135deg, #0A917A 0%, #4E8A1A 100%)',
      glow: 'rgba(10,145,122,0.18)',
    },
  ];

  const whyChooseUs = [
    { label: 'End-to-End Integrated Solutions', icon: Layers },
    { label: 'Technology-Driven Innovation', icon: Zap },
    { label: 'Scalable & Future-Ready Systems', icon: TrendingUp },
    { label: 'Industry Best Practices', icon: Star },
    { label: 'Transparent & Reliable Partnership', icon: Shield },
    { label: 'Custom-Built Solutions', icon: Target },
  ];

  const targetAudience = [
    { label: 'Startups & Emerging Businesses', desc: 'Zero to structured in record time' },
    { label: 'SMEs & Growing Enterprises', desc: 'Scale operations with confidence' },
    { label: 'Technology Companies', desc: 'Build smarter internal systems' },
    { label: 'Professional Service Firms', desc: 'Automate and modernize workflows' },
  ];

  return (
    <div style={{ background: 'var(--cs-bg)' }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        {/* Ambient glowing orbs */}
        <div className="cs-orb" style={{ width: '600px', height: '600px', top: '-15%', left: '-10%', background: 'radial-gradient(circle, rgba(18,130,174,0.12) 0%, transparent 70%)' }} />
        <div className="cs-orb" style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%', background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)' }} />
        <div className="cs-orb" style={{ width: '400px', height: '400px', top: '30%', right: '25%', background: 'radial-gradient(circle, rgba(10,145,122,0.08) 0%, transparent 70%)' }} />

        {/* Dot grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ paddingTop: '5rem', paddingBottom: '5rem', position: 'relative' }}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <motion.div variants={fadeUp}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.375rem 1rem',
                  borderRadius: '2rem',
                  background: 'rgba(18,130,174,0.08)',
                  border: '1px solid rgba(18,130,174,0.18)',
                  fontFamily: "'Mulish', sans-serif",
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#1EC8A8',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'linear-gradient(135deg,#1282AE,#4E8A1A)', flexShrink: 0 }} />
                  Integrated Business Solutions
                </div>
              </motion.div>

              <motion.h1 variants={fadeUp} style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: 'var(--cs-text)',
              }}>
                Build Smarter{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #4DC8E8 0%, #1EC8A8 40%, #80CC30 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Businesses</span>
                {' '}with HR, Technology & AI
              </motion.h1>

              <motion.p variants={fadeUp} style={{
                fontFamily: "'Mulish', sans-serif",
                fontSize: '1.0625rem',
                lineHeight: 1.8,
                color: 'var(--cs-text-2)',
                maxWidth: '520px',
              }}>
                Spark Pro delivers integrated business solutions combining HR infrastructure, custom software development, and AI automation. We help startups, SMEs, and growing businesses scale efficiently with end-to-end technology and people solutions.
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Link href="/services" className="cs-btn cs-btn-grad" style={{ paddingLeft: '1.75rem', paddingRight: '1.75rem' }}>
                  Explore Services
                  <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="cs-btn cs-btn-glass">
                  Talk to an Expert
                </Link>
              </motion.div>

              {/* Mini stats */}
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '2rem', paddingTop: '0.5rem' }}>
                {[
                  { val: '3-in-1', lbl: 'Integrated Solutions' },
                  { val: 'HR·IT·AI', lbl: 'Core Domains' },
                  { val: '100%', lbl: 'Custom Built' },
                ].map(({ val, lbl }, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: '1.25rem', background: 'linear-gradient(90deg,#4DC8E8,#80CC30)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{val}</div>
                    <div style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.75rem', color: '#7A90BC', fontWeight: 600 }}>{lbl}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
              style={{ position: 'relative' }}
            >
              {/* Gradient border frame */}
              <div style={{
                padding: '2px',
                borderRadius: '1.25rem',
                background: 'linear-gradient(135deg, rgba(18,130,174,0.35) 0%, rgba(10,145,122,0.22) 50%, rgba(78,138,26,0.28) 100%)',
                boxShadow: '0 0 60px rgba(18,130,174,0.15), 0 32px 80px rgba(0,0,0,0.6)',
              }}>
                <div style={{ borderRadius: '1.125rem', overflow: 'hidden', background: 'var(--cs-bg)' }}>
                  <img
                    src="https://images.unsplash.com/photo-1758873268663-5a362616b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzEyMDQ3Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Team collaboration"
                    style={{ display: 'block', width: '100%', aspectRatio: '4/3', objectFit: 'cover', opacity: 0.85 }}
                  />
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="cs-on-dark"
                style={{
                  position: 'absolute',
                  bottom: '-1.25rem',
                  left: '-1.25rem',
                  padding: '1rem 1.5rem',
                  background: 'rgba(8,13,24,0.95)',
                  border: '1px solid rgba(18,130,174,0.25)',
                  borderRadius: '0.875rem',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 0 32px rgba(18,130,174,0.12), 0 8px 32px rgba(0,0,0,0.5)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '0.5rem', background: 'linear-gradient(135deg,#1282AE,#4E8A1A)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(18,130,174,0.3)' }}>
                    <Sparkles size={18} style={{ color: '#fff' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '0.9375rem', color: 'var(--cs-text)' }}>AI-Powered</div>
                    <div style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.75rem', color: 'var(--cs-text-2)' }}>End-to-End Solutions</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section style={{ background: 'var(--cs-bg-2)', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="cs-orb" style={{ width: '400px', height: '400px', top: '0', right: '0', background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: '3.5rem' }}>
              <div className="cs-eyebrow">
                <span className="cs-label">What We Do</span>
              </div>
              <h2 style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                color: 'var(--cs-text)',
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                maxWidth: '640px',
              }}>
                End-to-end solutions that connect people, process &amp; technology
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Building2, label: 'Strategic HR Solutions', desc: 'Build compliant, structured HR systems from foundation to compliance.', num: '01', grad: 'linear-gradient(135deg, #1282AE, #0A917A)', glow: 'rgba(18,130,174,0.15)' },
                { icon: Code, label: 'Custom Software Development', desc: 'Tailored web and mobile applications to digitize your operations.', num: '02', grad: 'linear-gradient(135deg, #0A7FA0, #1282AE)', glow: 'rgba(78,138,26,0.15)' },
                { icon: Sparkles, label: 'AI & Automation', desc: 'Intelligent systems to streamline workflows and enhance productivity.', num: '03', grad: 'linear-gradient(135deg, #0A917A, #4E8A1A)', glow: 'rgba(139,92,246,0.25)' },
              ].map(({ icon: Icon, label, desc, num, grad, glow }) => (
                <motion.div key={num} variants={fadeUp} className="cs-card-grad" style={{ padding: '2rem', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1.25rem',
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 900,
                    fontSize: '3.5rem',
                    color: 'rgba(255,255,255,0.04)',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}>{num}</div>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '0.75rem',
                    background: grad,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    boxShadow: `0 4px 20px ${glow}`,
                  }}>
                    <Icon size={22} style={{ color: '#fff' }} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.1875rem',
                    color: 'var(--cs-text)',
                    marginBottom: '0.625rem',
                    lineHeight: 1.3,
                  }}>{label}</h3>
                  <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.9375rem', color: 'var(--cs-text-2)', lineHeight: 1.7 }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Core Services ── */}
      <section style={{ background: 'var(--cs-bg)', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="cs-orb" style={{ width: '500px', height: '500px', bottom: '-10%', left: '-5%', background: 'radial-gradient(circle, rgba(26,170,217,0.1) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div className="cs-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="cs-label">Core Services</span>
              </div>
              <h2 style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                color: 'var(--cs-text)',
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
              }}>
                Integrated solutions for{' '}
                <span style={{ background: 'linear-gradient(90deg, #4DC8E8, #80CC30)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  modern business growth
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {coreServices.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div key={service.id} variants={fadeUp} className="cs-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '0.75rem',
                      background: service.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 24px ${service.glow}`,
                    }}>
                      <Icon size={22} style={{ color: '#fff' }} />
                    </div>
                    <h3 style={{
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      color: 'var(--cs-text)',
                      lineHeight: 1.25,
                    }}>{service.title}</h3>
                    <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.9375rem', color: 'var(--cs-text-2)', lineHeight: 1.7 }}>
                      {service.description}
                    </p>
                    <Link
                      href={`/services#${service.id}-services`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        fontFamily: "'Mulish', sans-serif",
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        background: 'linear-gradient(90deg,#4DC8E8,#80CC30)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textDecoration: 'none',
                        marginTop: 'auto',
                      }}
                    >
                      Learn More <ArrowRight size={13} style={{ color: '#3DA8C8' }} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/services" className="cs-btn cs-btn-grad" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                View All Services
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={{ background: 'var(--cs-bg-2)', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="cs-orb" style={{ width: '600px', height: '600px', top: '-20%', right: '-10%', background: 'radial-gradient(circle, rgba(10,145,122,0.08) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <div className="cs-eyebrow">
                  <span className="cs-label">Why Choose Us</span>
                </div>
              </motion.div>
              <motion.h2 variants={fadeUp} style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                color: 'var(--cs-text)',
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                marginBottom: '1.25rem',
              }}>
                We don't just support HR functions
              </motion.h2>
              <motion.p variants={fadeUp} style={{
                fontFamily: "'Mulish', sans-serif",
                fontSize: '1.375rem',
                fontWeight: 700,
                background: 'linear-gradient(90deg, #4DC8E8 0%, #1EC8A8 40%, #80CC30 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.4,
                marginBottom: '1.25rem',
              }}>
                We build intelligent workforce ecosystems.
              </motion.p>
              <motion.p variants={fadeUp} style={{
                fontFamily: "'Mulish', sans-serif",
                fontSize: '1rem',
                color: 'var(--cs-text-2)',
                lineHeight: 1.8,
              }}>
                Our integrated approach combines strategy, technology, and automation to deliver lasting results that scale with your business ambitions.
              </motion.p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
              {whyChooseUs.map(({ label, icon: Icon }, i) => (
                <motion.div key={i} variants={fadeUp} className="cs-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '0.5rem',
                    background: 'linear-gradient(135deg, rgba(18,130,174,0.18), rgba(34,211,238,0.2))',
                    border: '1px solid rgba(18,130,174,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} style={{ color: '#1EC8A8' }} />
                  </div>
                  <span style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.875rem', color: 'var(--cs-text-2)', lineHeight: 1.5, fontWeight: 600 }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Who We Serve ── */}
      <section style={{ background: 'var(--cs-bg)', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="cs-orb" style={{ width: '400px', height: '400px', bottom: '0', right: '0', background: 'radial-gradient(circle, rgba(78,138,26,0.06) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div className="cs-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="cs-label">Who We Serve</span>
              </div>
              <h2 style={{
                fontFamily: "'Exo 2', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                color: 'var(--cs-text)',
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
              }}>
                Startups, SMEs &amp; Growing Businesses
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {targetAudience.map(({ label, desc }, i) => (
                <motion.div key={i} variants={fadeUp} className="cs-card-grad" style={{ padding: '1.75rem' }}>
                  <Globe size={20} style={{ color: '#3DA8C8', marginBottom: '1rem' }} />
                  <h3 style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    color: 'var(--cs-text)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.3,
                  }}>{label}</h3>
                  <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.875rem', color: 'var(--cs-text-2)', lineHeight: 1.65 }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cs-on-dark" style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        {/* Full gradient background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #0F0C2E 0%, #0C1840 30%, #061530 60%, #040C1E 100%)',
        }} />
        <div className="cs-orb" style={{ width: '700px', height: '700px', top: '-30%', left: '-15%', background: 'radial-gradient(circle, rgba(18,130,174,0.12) 0%, transparent 65%)' }} />
        <div className="cs-orb" style={{ width: '600px', height: '600px', bottom: '-30%', right: '-10%', background: 'radial-gradient(circle, rgba(78,138,26,0.1) 0%, transparent 65%)' }} />

        {/* Dot grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} style={{ marginBottom: '1.5rem' }}>
              <div className="cs-eyebrow" style={{ justifyContent: 'center' }}>
                <span className="cs-label">Get Started Today</span>
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} style={{
              fontFamily: "'Exo 2', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              marginBottom: '1.5rem',
              color: 'var(--cs-text)',
            }}>
              Ready to{' '}
              <span style={{
                background: 'linear-gradient(90deg, #4DC8E8 0%, #1EC8A8 40%, #80CC30 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Transform</span>
              {' '}Your Business?
            </motion.h2>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Mulish', sans-serif",
              fontSize: '1.0625rem',
              color: 'var(--cs-text-2)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
            }}>
              Partner with Spark Pro to build smarter, scalable, and future-ready business systems.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contact" className="cs-btn cs-btn-grad" style={{ fontSize: '1rem', paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
                Book a Free Consultation
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
