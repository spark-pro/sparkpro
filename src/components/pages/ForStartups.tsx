'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView as fmUseInView } from 'framer-motion';

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = fmUseInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const painPoints = [
  {
    icon: '⚡',
    title: "Everything lives in the founder's head",
    description:
      'Compensation decisions, performance feedback, conflict resolution — it all flows through one person. This works at 5 people. It breaks at 15.',
  },
  {
    icon: '📋',
    title: 'No written policies mean inconsistent decisions',
    description:
      'When there are no rules, every situation becomes a negotiation. Employees compare notes. Perceived favouritism corrodes trust silently.',
  },
  {
    icon: '🔄',
    title: 'Onboarding is a different experience every time',
    description:
      'New hires cobble together their understanding of the role from whoever has five minutes to talk. Ramp time is longer than it should be and role clarity is hit-or-miss.',
  },
  {
    icon: '⚠️',
    title: 'Compliance obligations slip through the cracks',
    description:
      "Labour law, statutory filings, contract requirements — these don't care how busy you are. One oversight can surface as a serious liability months later.",
  },
  {
    icon: '🏃',
    title: 'You lose good people and do not know why',
    description:
      'Without structured feedback cycles or clear progression paths, high performers leave before you realise they were unhappy. Exit interviews reveal what retention systems would have prevented.',
  },
];

const deliverables = [
  {
    category: 'Documentation',
    color: '#2B7FFF',
    items: [
      {
        name: 'HR Policies from Scratch',
        detail:
          'Leave, conduct, grievance, remote work, expense, and more — written for your stage and context.',
      },
      {
        name: 'Employee Handbook',
        detail: 'A single source of truth that every new hire receives on day one.',
      },
      {
        name: 'Offer & Appointment Letter Templates',
        detail: 'Legally sound, professionally written templates you can deploy immediately.',
      },
    ],
  },
  {
    category: 'Processes',
    color: '#60A5FA',
    items: [
      {
        name: 'Onboarding Process',
        detail:
          'A structured 30-60-90 day framework that gives every new hire the same strong start.',
      },
      {
        name: 'Recruitment Process',
        detail:
          'Job brief templates, interview guides, scoring rubrics, and offer flow — end to end.',
      },
      {
        name: 'Manager Responsibility Framework',
        detail:
          'Clear expectations for what managers own, from performance conversations to escalation paths.',
      },
    ],
  },
  {
    category: 'Compliance & Systems',
    color: '#34D399',
    items: [
      {
        name: 'HR Compliance Calendar',
        detail:
          'Monthly and annual legal obligations mapped to owner, deadline, and consequence.',
      },
      {
        name: 'Payroll Setup',
        detail:
          'Structure, cadence, and process so payroll runs reliably without heroic effort every cycle.',
      },
    ],
  },
];

const foundationCategories = [
  {
    label: 'Documentation',
    color: '#2B7FFF',
    items: ['Employee Handbook', 'HR Policies (12 core areas)', 'Offer Letter Templates', 'Contract Templates'],
  },
  {
    label: 'Processes',
    color: '#60A5FA',
    items: ['Onboarding Flow', 'Recruitment Process', 'Performance Check-ins', 'Offboarding Process'],
  },
  {
    label: 'Compliance',
    color: '#34D399',
    items: ['Compliance Calendar', 'Statutory Obligations Register', 'Payroll Structure', 'Leave Policy & Tracker'],
  },
  {
    label: 'People Systems',
    color: '#F59E0B',
    items: ['Manager Framework', 'Role Clarity Templates', 'Probation Review Process', 'HR Escalation Map'],
  },
];

const whyNow = [
  {
    number: '01',
    heading: "It's cheaper to build than to fix",
    body: "Retrofitting HR into a 40-person company costs three times more than building it for a 15-person one. Informal habits calcify. People have expectations. Unwritten rules become invisible rules that are even harder to change.",
  },
  {
    number: '02',
    heading: 'It sets culture expectations from day one',
    body: "The standards you establish at 10 people are the standards your 50th hire walks into. HR systems are culture systems. The earlier they're in place, the less cultural drift you accumulate.",
  },
  {
    number: '03',
    heading: 'It enables faster, more confident hiring',
    body: "When you have a real onboarding process, real offer templates, and real policies, you can move quickly without second-guessing. You also signal to candidates that you're a company that has its act together.",
  },
];

const steps = [
  {
    step: '01',
    title: 'Discovery',
    duration: 'Week 1–2',
    description:
      'We interview founders and early team members, audit what exists, and map the specific gaps relevant to your size, sector, and growth trajectory.',
  },
  {
    step: '02',
    title: 'Design',
    duration: 'Week 2–3',
    description:
      'We draft policies, processes, and documentation aligned to your company culture and values — not generic templates from a compliance library.',
  },
  {
    step: '03',
    title: 'Build',
    duration: 'Week 3–6',
    description:
      'We produce all deliverables in your systems and formats, review with you iteratively, and refine based on your team\'s specific context and feedback.',
  },
  {
    step: '04',
    title: 'Handover',
    duration: 'Week 6–8',
    description:
      'We brief your leadership team, answer implementation questions, and leave you with a clear owner for each system — so momentum does not die after the engagement ends.',
  },
];

export default function ForStartups() {
  return (
    <div
      className="min-h-screen text-[#E2E8F4]"
      style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#020812' }}
    >
      {/* Hero */}
      <section
        className="pt-32 pb-24 px-6 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #050A14 0%, #020812 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(43,127,255,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="inline-block text-sm font-semibold tracking-widest uppercase mb-6 px-4 py-1.5 rounded-full border"
              style={{
                color: '#2B7FFF',
                borderColor: 'rgba(43,127,255,0.3)',
                backgroundColor: 'rgba(43,127,255,0.08)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              For Startups
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
          >
            Build HR before growth makes it{' '}
            <span style={{ color: '#2B7FFF' }}>complicated.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl max-w-2xl mx-auto mb-10"
            style={{ color: 'rgba(226,232,244,0.6)' }}
          >
            For startups with 2–50 employees, the right time to build HR systems is before the
            chaos compounds.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #2B7FFF 0%, #60A5FA 100%)',
                color: '#fff',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              Build Your HR Foundation →
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold border transition-all duration-200 hover:bg-white/5"
              style={{
                borderColor: 'rgba(43,127,255,0.3)',
                color: '#E2E8F4',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              See How It Works
            </a>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0B1628' }}>
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                The Startup HR Problem
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(226,232,244,0.6)' }}>
                When you are small, everything works. The founder handles everything. But as you
                grow from 5 to 15 to 30 employees, informal people management breaks down — faster
                than you expect.
              </p>
            </div>
          </RevealSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <RevealSection key={point.title} delay={i * 0.08}>
                <div
                  className="rounded-2xl p-6 h-full transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'rgba(11,22,40,0.7)',
                    border: '1px solid rgba(43,127,255,0.08)',
                  }}
                >
                  <div className="text-3xl mb-4">{point.icon}</div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,244,0.6)' }}>
                    {point.description}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-24 px-6" style={{ backgroundColor: '#050A14' }}>
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                What Spark Pro Builds for Startups
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(226,232,244,0.6)' }}>
                Eight specific deliverables. No fluff, no frameworks you will not use. Everything
                you need to run people management professionally from your current headcount to your
                next phase.
              </p>
            </div>
          </RevealSection>
          <div className="grid md:grid-cols-3 gap-8">
            {deliverables.map((cat, ci) => (
              <RevealSection key={cat.category} delay={ci * 0.1}>
                <div
                  className="rounded-2xl p-8 h-full"
                  style={{
                    backgroundColor: 'rgba(11,22,40,0.7)',
                    border: `1px solid ${cat.color}20`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-8 rounded-full" style={{ backgroundColor: cat.color }} />
                    <h3
                      className="text-xl font-bold"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: cat.color }}
                    >
                      {cat.category}
                    </h3>
                  </div>
                  <div className="space-y-5">
                    {cat.items.map((item) => (
                      <div key={item.name}>
                        <p
                          className="font-semibold mb-1"
                          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                        >
                          {item.name}
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: 'rgba(226,232,244,0.55)' }}
                        >
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Foundation Package */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0B1628' }}>
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                The Foundation Package
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(226,232,244,0.6)' }}>
                Everything included in a startup HR foundation build, organised so you can see
                exactly what you are getting and where it lives in your people infrastructure.
              </p>
            </div>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foundationCategories.map((cat, i) => (
              <RevealSection key={cat.label} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-6 h-full"
                  style={{
                    backgroundColor: 'rgba(11,22,40,0.7)',
                    border: `1px solid ${cat.color}22`,
                  }}
                >
                  <div
                    className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                    style={{
                      backgroundColor: `${cat.color}18`,
                      color: cat.color,
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}
                  >
                    {cat.label}
                  </div>
                  <ul className="space-y-3">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 text-xs" style={{ color: cat.color }}>
                          ▸
                        </span>
                        <span className="text-sm" style={{ color: 'rgba(226,232,244,0.8)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now */}
      <section className="py-24 px-6" style={{ backgroundColor: '#050A14' }}>
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Why Now?
              </h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(226,232,244,0.6)' }}>
                Three reasons early-stage is the best window to build HR infrastructure — and why
                most founders wait too long.
              </p>
            </div>
          </RevealSection>
          <div className="space-y-6">
            {whyNow.map((item, i) => (
              <RevealSection key={item.number} delay={i * 0.1}>
                <div
                  className="flex gap-8 items-start p-8 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    backgroundColor: 'rgba(11,22,40,0.7)',
                    border: '1px solid rgba(43,127,255,0.08)',
                  }}
                >
                  <div
                    className="text-4xl font-bold shrink-0 leading-none"
                    style={{
                      color: 'rgba(43,127,255,0.25)',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}
                  >
                    {item.number}
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    >
                      {item.heading}
                    </h3>
                    <p className="leading-relaxed" style={{ color: 'rgba(226,232,244,0.6)' }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6" style={{ backgroundColor: '#020812' }}>
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                How It Works for Startups
              </h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(226,232,244,0.6)' }}>
                A clear four-step engagement designed to fit around the reality of a busy founding
                team — with minimal disruption and maximum output.
              </p>
            </div>
          </RevealSection>
          <div className="relative">
            <div
              className="absolute left-8 top-12 bottom-12 w-px hidden md:block"
              style={{
                background:
                  'linear-gradient(180deg, #2B7FFF 0%, rgba(43,127,255,0.1) 100%)',
              }}
            />
            <div className="space-y-6">
              {steps.map((s, i) => (
                <RevealSection key={s.step} delay={i * 0.1}>
                  <div className="flex gap-8 items-start md:pl-4">
                    <div
                      className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center shrink-0 font-bold text-lg"
                      style={{
                        background: 'linear-gradient(135deg, #2B7FFF 0%, #60A5FA 100%)',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        color: '#fff',
                        boxShadow: '0 0 0 4px rgba(43,127,255,0.15)',
                      }}
                    >
                      {s.step}
                    </div>
                    <div
                      className="flex-1 p-6 rounded-2xl"
                      style={{
                        backgroundColor: 'rgba(11,22,40,0.7)',
                        border: '1px solid rgba(43,127,255,0.08)',
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                        <h3
                          className="text-xl font-bold"
                          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                        >
                          {s.title}
                        </h3>
                        <span
                          className="text-xs font-semibold px-3 py-1 rounded-full w-fit"
                          style={{
                            backgroundColor: 'rgba(43,127,255,0.12)',
                            color: '#60A5FA',
                            fontFamily: 'Plus Jakarta Sans, sans-serif',
                          }}
                        >
                          {s.duration}
                        </span>
                      </div>
                      <p className="leading-relaxed" style={{ color: 'rgba(226,232,244,0.6)' }}>
                        {s.description}
                      </p>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Placeholder */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0B1628' }}>
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <div className="text-center mb-12">
              <h2
                className="text-3xl font-bold mb-3"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                What Founders Say
              </h2>
              <p style={{ color: 'rgba(226,232,244,0.5)' }}>
                From founders who built HR foundations with Spark Pro
              </p>
            </div>
          </RevealSection>
          <div className="grid md:grid-cols-2 gap-6">
            {[0, 1].map((_, i) => (
              <RevealSection key={i} delay={i * 0.12}>
                <div
                  className="rounded-2xl p-8"
                  style={{
                    backgroundColor: 'rgba(11,22,40,0.7)',
                    border: '1px solid rgba(43,127,255,0.08)',
                  }}
                >
                  <div
                    className="text-5xl mb-4 leading-none"
                    style={{ color: 'rgba(43,127,255,0.3)', fontFamily: 'Georgia, serif' }}
                  >
                    "
                  </div>
                  <div
                    className="space-y-2 mb-8"
                    style={{ color: 'rgba(226,232,244,0.35)' }}
                  >
                    <div className="h-3 rounded-md bg-current w-full" />
                    <div className="h-3 rounded-md bg-current w-5/6" />
                    <div className="h-3 rounded-md bg-current w-4/5" />
                    <div className="h-3 rounded-md bg-current w-3/4" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full"
                      style={{ backgroundColor: 'rgba(43,127,255,0.15)' }}
                    />
                    <div className="space-y-2" style={{ color: 'rgba(226,232,244,0.25)' }}>
                      <div className="h-3 rounded-md bg-current w-24" />
                      <div className="h-3 rounded-md bg-current w-32" />
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-32 px-6 text-center relative overflow-hidden"
        style={{ backgroundColor: '#020812' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(43,127,255,0.1) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <RevealSection>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Ready to build your{' '}
              <span style={{ color: '#2B7FFF' }}>HR foundation?</span>
            </h2>
            <p className="text-xl mb-10" style={{ color: 'rgba(226,232,244,0.6)' }}>
              Start with a focused discovery conversation. We will map what you need and what you
              can skip — so you invest only in what your stage actually requires.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-5 rounded-xl text-lg font-bold transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #2B7FFF 0%, #60A5FA 100%)',
                color: '#fff',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                boxShadow: '0 8px 32px rgba(43,127,255,0.3)',
              }}
            >
              Build Your HR Foundation →
            </Link>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
