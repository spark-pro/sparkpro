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

const eyebrowStyle = { color: '#2B7FFF', fontFamily: 'Inter, sans-serif' };
const headingStyle = { fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' };
const bodyStyle = { color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' };
const cardStyle = { background: 'rgba(11,22,40,0.7)', border: '1px solid rgba(43,127,255,0.08)' };

const whatWeDo = [
  {
    title: 'Build HR systems and processes',
    body: 'Establish the policies, workflows, documentation, responsibilities, and people processes your business needs to operate consistently.',
  },
  {
    title: 'Enable managers and teams',
    body: 'Create clearer roles, strengthen manager responsibilities, and help transfer everyday people management from founders into structured management practices.',
  },
  {
    title: 'Operate and improve people operations',
    body: 'Support the implementation and day-to-day operation of HR processes, helping businesses make their people systems work in real working environments.',
  },
  {
    title: 'Prepare businesses for their next stage',
    body: 'Build people management capabilities that can adapt as teams expand, responsibilities change, and business operations become more complex.',
  },
];

const approach = [
  {
    step: '01',
    title: 'Understand',
    body: 'Assess the current people management structure, identify gaps, and understand the challenges facing founders, managers, and employees.',
  },
  {
    step: '02',
    title: 'Build',
    body: "Design and implement the relevant HR systems, processes, responsibilities, and management practices based on the business's needs.",
  },
  {
    step: '03',
    title: 'Embed',
    body: 'Work alongside the business to put those systems into practice, support managers, and establish consistent ways of working.',
  },
  {
    step: '04',
    title: 'Enable independence',
    body: 'Help the internal team take ownership of the systems, with continued support from Spark Pro when required.',
  },
];

const audiences = [
  {
    title: 'Startups',
    body: 'Build people systems early, establish clear responsibilities, and prepare for workforce growth.',
  },
  {
    title: 'SMEs',
    body: 'Bring structure to growing teams, reduce founder dependency, and establish consistent HR and management practices.',
  },
];

export default function About() {
  return (
    <div
      className="min-h-screen pt-32"
      style={{ background: 'linear-gradient(180deg, #020812 0%, #050A14 40%, #020812 100%)' }}
    >
      {/* 1. Hero */}
      <section className="max-w-5xl mx-auto px-6 pb-24 text-center">
        <RevealSection>
          <p className="text-sm font-semibold tracking-widest uppercase mb-6" style={eyebrowStyle}>
            About Spark Pro
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            style={headingStyle}
          >
            Build a business that doesn&apos;t depend on you{' '}
            <span style={{ color: '#2B7FFF' }}>for everything.</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-6" style={bodyStyle}>
            Growing a business is one challenge. Building the people systems to support that growth is
            another.
          </p>
          <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-6" style={bodyStyle}>
            Spark Pro helps startups and SMEs build structured HR systems, enable managers, and establish
            people operations that grow with their business — so founders can move beyond managing every
            people-related issue themselves.
          </p>
          <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10" style={bodyStyle}>
            We don&apos;t just recommend what your business needs. We help build it, put it into practice, and
            support your team in running it independently.
          </p>
          <p
            className="inline-block px-5 py-2.5 rounded-full text-sm font-semibold"
            style={{
              background: 'rgba(43,127,255,0.1)',
              border: '1px solid rgba(43,127,255,0.25)',
              color: '#60A5FA',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            People infrastructure built for business growth.
          </p>
        </RevealSection>
      </section>

      {/* 2. Why Spark Pro Exists */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <RevealSection>
          <div className="rounded-2xl p-10 md:p-14" style={cardStyle}>
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={eyebrowStyle}>
              Why Spark Pro Exists
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={headingStyle}>
              Growing businesses need more than HR services.
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-4" style={bodyStyle}>
              Spark Pro was born from a simple observation: working with startups and growing businesses
              revealed that recruitment and payroll alone were not enough to solve their people management
              challenges.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-4" style={bodyStyle}>
              Businesses could hire employees, process salaries, and establish basic HR practices — yet many
              still struggled to manage their growing teams.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-4" style={bodyStyle}>
              People-related decisions remained with founders. Managers lacked clear responsibilities.
              Processes depended on individuals rather than systems. And as the business grew, people
              management became increasingly difficult to sustain.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-4" style={bodyStyle}>
              The problem wasn&apos;t simply the absence of HR services. It was the absence of a connected
              people management system.
            </p>
            <p className="text-lg md:text-xl font-semibold leading-relaxed mb-4" style={{ color: '#E2E8F4', fontFamily: 'Inter, sans-serif' }}>
              That&apos;s the problem Spark Pro was created to solve.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={bodyStyle}>
              We believe businesses should be able to grow their workforce without making founders
              responsible for every hiring decision, employee issue, performance conversation, or
              people-related process.
            </p>
          </div>
        </RevealSection>
      </section>

      {/* 3. What We Do */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <RevealSection>
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={eyebrowStyle}>
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={headingStyle}>
            We build the people infrastructure behind growing businesses.
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-3 max-w-3xl" style={bodyStyle}>
            Spark Pro helps startups and SMEs establish the systems, processes, and management
            capabilities required to run their workforce effectively.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-10 max-w-3xl" style={bodyStyle}>
            Our work connects the essential elements of people management into one practical operating
            structure.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {whatWeDo.map((item) => (
              <div key={item.title} className="rounded-xl p-7" style={cardStyle}>
                <h3 className="text-lg font-semibold mb-3" style={headingStyle}>
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed" style={bodyStyle}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="text-base md:text-lg leading-relaxed mt-10 max-w-3xl" style={bodyStyle}>
            Our approach brings HR expertise, practical execution, management systems, and technology
            together — based on what each business actually needs.
          </p>
        </RevealSection>
      </section>

      {/* 4. Our Approach */}
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
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={eyebrowStyle}>
              Our Approach
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={headingStyle}>
              From founder-dependent to system-driven.
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-12 max-w-3xl" style={bodyStyle}>
              Every business has different people management challenges. That&apos;s why we don&apos;t begin
              with a fixed package of services. We begin by understanding how your business currently
              operates and where its people systems need to improve.
            </p>
            <div className="grid md:grid-cols-2 gap-10">
              {approach.map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: 'rgba(43,127,255,0.12)',
                      color: '#2B7FFF',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={headingStyle}>
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed" style={bodyStyle}>
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p
              className="text-lg md:text-xl font-semibold leading-relaxed mt-14 max-w-3xl"
              style={{ color: '#E2E8F4', fontFamily: 'Inter, sans-serif', borderLeft: '3px solid #2B7FFF', paddingLeft: '1.5rem' }}
            >
              The goal is not to make businesses permanently dependent on an external HR provider. It is to
              help them build the capabilities and systems to manage their people with greater clarity and
              independence.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* 5. Who We Work With */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <RevealSection>
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={eyebrowStyle}>
            Who We Work With
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={headingStyle}>
            Built for businesses growing beyond the founder.
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-10 max-w-3xl" style={bodyStyle}>
            Spark Pro works with startups and small and medium-sized businesses that want to establish
            stronger people management foundations as they grow.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {audiences.map((item) => (
              <div key={item.title} className="rounded-xl p-8" style={cardStyle}>
                <h3 className="text-xl font-semibold mb-3" style={headingStyle}>
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed" style={bodyStyle}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl" style={bodyStyle}>
            Whether a business is establishing its first HR function or improving an existing one, our focus
            remains the same: make people management practical, structured, and capable of supporting growth.
          </p>
        </RevealSection>
      </section>

      {/* 6. Our Vision */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <RevealSection>
          <div className="rounded-2xl p-10 md:p-14" style={cardStyle}>
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={eyebrowStyle}>
              Our Vision
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={headingStyle}>
              A future where business growth doesn&apos;t create{' '}
              <span style={{ color: '#2B7FFF' }}>people management chaos.</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-4" style={bodyStyle}>
              We envision a business environment where startups and SMEs can access the people
              infrastructure, management systems, and technology they need to grow into professionally
              managed organizations.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-4" style={bodyStyle}>
              Through HR expertise, practical implementation, and technology-enabled solutions, Spark Pro
              aims to help businesses build independent HR functions, capable managers, and scalable people
              operations.
            </p>
            <p className="text-lg md:text-xl font-semibold leading-relaxed" style={{ color: '#E2E8F4', fontFamily: 'Inter, sans-serif' }}>
              Because when people management works as a system, founders can focus on building the business
              — and teams can focus on moving it forward.
            </p>
          </div>
        </RevealSection>
      </section>

      {/* 7. Closing */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <RevealSection>
          <div
            className="rounded-2xl p-12 md:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(43,127,255,0.12) 0%, rgba(11,22,40,0.9) 100%)',
              border: '1px solid rgba(43,127,255,0.2)',
            }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-5" style={eyebrowStyle}>
              Spark Pro
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={headingStyle}>
              Your business is ready to grow. Are your people systems ready?
            </h2>
            <p className="text-base md:text-lg mb-10 max-w-xl mx-auto" style={bodyStyle}>
              Let&apos;s understand where your business stands today and identify the people systems it needs
              for its next stage of growth.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ background: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
            >
              Let&apos;s Build Your People Infrastructure
            </Link>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
