'use client';

import { useRef } from 'react';
import { motion, useInView as fmUseInView } from 'framer-motion';
import Link from 'next/link';

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = fmUseInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className={className}>
      <motion.div
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

const philosophyPoints = [
  {
    title: 'Structure over chaos',
    description:
      'Growing businesses collapse under ambiguity. We build the frameworks, processes, and clarity that let your people operate without constant guidance.',
  },
  {
    title: 'Ownership over dependency',
    description:
      'Every decision should have a named owner — not a consultant on retainer. We design systems where your managers lead and your founders step back.',
  },
  {
    title: 'Systems over individuals',
    description:
      'When the right person leaves, the right system remains. We document, codify, and operationalise so knowledge stays inside the business.',
  },
  {
    title: 'Independence over permanent engagement',
    description:
      'Our goal is to make ourselves unnecessary. We measure success by how little you need us — not by how long we can extend the engagement.',
  },
];

const beliefs = [
  'People management should scale with the business.',
  'Every people decision should have a clear owner.',
  'HR effectiveness should be measurable.',
  'The goal is independence — not dependency.',
];

const nineLayers = [
  'Hiring Architecture',
  'Onboarding Systems',
  'Role Clarity & Structure',
  'Manager Capability',
  'Performance Management',
  'Compensation Design',
  'Retention Systems',
  'Compliance & Policy',
  'HR Operations & Technology',
];

const focusItems = [
  { label: 'Geography', value: 'Tamil Nadu — expanding across India' },
  { label: 'Industries', value: 'Industry-agnostic — we serve businesses regardless of sector' },
  { label: 'Company Size', value: '2 to 200 employees' },
  {
    label: 'Stage',
    value:
      'Startups building from scratch to established SMEs upgrading their people systems',
  },
];

export default function About() {
  return (
    <div
      className="min-h-screen pt-32"
      style={{ background: 'linear-gradient(180deg, #020812 0%, #050A14 40%, #020812 100%)' }}
    >
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pb-24 text-center">
        <RevealSection>
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-6"
            style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
          >
            About Spark Pro
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
          >
            We're building a different way
            <br />
            <span style={{ color: '#2B7FFF' }}>to build HR.</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' }}
          >
            Most HR support treats people management as a collection of isolated services. We think
            differently. Spark Pro builds the infrastructure that connects every layer of how your business
            manages people — so it all works together.
          </p>
        </RevealSection>
      </section>

      {/* Why Spark Pro Exists */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <RevealSection>
          <div
            className="rounded-2xl p-10 md:p-14"
            style={{
              background: 'rgba(11,22,40,0.7)',
              border: '1px solid rgba(43,127,255,0.08)',
            }}
          >
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
            >
              Why We Exist
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
            >
              HR support is fragmented. People infrastructure isn't.
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed mb-4"
              style={{ color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' }}
            >
              Most HR consultants solve one thing at a time — a policy here, a compliance audit there, a
              training session somewhere else. The result is a patchwork of isolated solutions that don't
              connect and don't compound.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' }}
            >
              Spark Pro builds the infrastructure that connects them. We design the underlying systems —
              hiring, onboarding, performance, compensation, manager capability — so that each layer reinforces
              the others. The result isn't a collection of HR projects. It's a functioning people system.
            </p>
          </div>
        </RevealSection>
      </section>

      {/* The Problem */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <RevealSection>
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
          >
            The Problem We're Solving
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-10"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
          >
            The founder still manages everything.
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                heading: 'Growing but founder-dependent',
                body: 'As headcount grows, the founder remains the de facto HR department. Every hire, every conflict, every performance issue still escalates to the top.',
              },
              {
                heading: 'No manager accountability',
                body: 'Managers exist on paper but escalate everything upward. There are no clear frameworks for decision-making, no ownership of people outcomes.',
              },
              {
                heading: 'Systems built in reaction',
                body: 'Policies get written after something goes wrong. Processes exist because they were always done that way. Nothing was designed — it accumulated.',
              },
              {
                heading: 'HR treated as overhead',
                body: 'People management is seen as a cost centre, not a capability. The business scales headcount but never scales the infrastructure to manage it.',
              },
            ].map((item) => (
              <div
                key={item.heading}
                className="rounded-xl p-7"
                style={{
                  background: 'rgba(11,22,40,0.7)',
                  border: '1px solid rgba(43,127,255,0.08)',
                }}
              >
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
                >
                  {item.heading}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* Our Philosophy */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <RevealSection>
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
          >
            Our Philosophy
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-12"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
          >
            Four principles that guide every engagement.
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {philosophyPoints.map((point, i) => (
              <div key={point.title} className="flex gap-5">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: 'rgba(43,127,255,0.12)',
                    color: '#2B7FFF',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
                  >
                    {point.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' }}
                  >
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* What We Believe */}
      <section
        className="py-24 mb-16"
        style={{
          background: 'rgba(11,22,40,0.4)',
          borderTop: '1px solid rgba(43,127,255,0.06)',
          borderBottom: '1px solid rgba(43,127,255,0.06)',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <RevealSection>
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-12 text-center"
              style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
            >
              What We Believe
            </p>
            <div className="space-y-10">
              {beliefs.map((belief, i) => (
                <blockquote
                  key={i}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug"
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    color: i % 2 === 0 ? '#E2E8F4' : 'rgba(226,232,244,0.55)',
                    borderLeft: '3px solid #2B7FFF',
                    paddingLeft: '1.5rem',
                  }}
                >
                  "{belief}"
                </blockquote>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* What Spark Pro Builds */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <RevealSection>
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
          >
            What We Build
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
          >
            A nine-layer people infrastructure framework.
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mb-10 max-w-3xl"
            style={{ color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' }}
          >
            Every engagement we run maps to a structured framework covering the nine foundational layers of a
            functioning people system. We audit, prioritise, and build — in the sequence that matters most for
            your stage of growth.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {nineLayers.map((layer, i) => (
              <div
                key={layer}
                className="rounded-xl px-5 py-4 flex items-center gap-4"
                style={{
                  background: 'rgba(11,22,40,0.7)',
                  border: '1px solid rgba(43,127,255,0.08)',
                }}
              >
                <span
                  className="text-xs font-bold tabular-nums"
                  style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: '#E2E8F4', fontFamily: 'Inter, sans-serif' }}
                >
                  {layer}
                </span>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* Our Focus */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <RevealSection>
          <div
            className="rounded-2xl p-10 md:p-14"
            style={{
              background: 'rgba(11,22,40,0.7)',
              border: '1px solid rgba(43,127,255,0.08)',
            }}
          >
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
            >
              Our Focus
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-10"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
            >
              Who we work with.
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {focusItems.map((item) => (
                <div key={item.label}>
                  <p
                    className="text-xs font-semibold tracking-widest uppercase mb-2"
                    style={{ color: 'rgba(226,232,244,0.4)', fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-base font-medium"
                    style={{ color: '#E2E8F4', fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-6 pb-28 text-center">
        <RevealSection>
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-6"
            style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
          >
            Our Mission
          </p>
          <p
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mx-auto max-w-4xl"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
          >
            Build the HR infrastructure that allows growing businesses to scale without people management
            becoming{' '}
            <span style={{ color: '#2B7FFF' }}>chaotic.</span>
          </p>
        </RevealSection>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <RevealSection>
          <div
            className="rounded-2xl p-12 md:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(43,127,255,0.12) 0%, rgba(11,22,40,0.9) 100%)',
              border: '1px solid rgba(43,127,255,0.2)',
            }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
            >
              Ready to build your people infrastructure?
            </h2>
            <p
              className="text-base md:text-lg mb-10 max-w-xl mx-auto"
              style={{ color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' }}
            >
              Start with an HR Independence Check — a structured review of where your people system stands
              and what needs to be built first.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ background: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
            >
              Request Your HR Independence Check
            </Link>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
