'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView as fmUseInView, AnimatePresence } from 'framer-motion';

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = fmUseInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const STEPS = [
  {
    n: '01',
    label: 'Diagnose',
    tagColor: '#2B7FFF',
    bg: '#020812',
    description:
      "Before we recommend anything, we map your current people system. We interview founders, managers, and HR — then assess across 9 dimensions of HR maturity and founder dependency.",
    whatHappens: [
      'Structured interviews with founders, leadership, and key managers',
      'Review of existing policies, processes, org charts, and HR documentation',
      'Assessment of compliance posture: PF, ESI, TDS, statutory obligations',
      'Mapping of every people decision: who makes it, how, and how consistently',
      'Employee lifecycle audit — from offer to exit, across all touchpoints',
    ],
    outputs: [
      'HR Independence Score (0–100)',
      'Dimension-by-dimension Gap Report',
      'Priority Roadmap with sequenced interventions',
      'Recommended engagement model and scope',
    ],
  },
  {
    n: '02',
    label: 'Design',
    tagColor: '#A78BFA',
    bg: '#050A14',
    description:
      "Based on the diagnostic, we design the exact HR infrastructure your business needs at this stage. Not a generic template — a bespoke architecture built around your people, your culture, and your growth trajectory.",
    whatHappens: [
      'Architecture design for policies, processes, and governance frameworks',
      'Org design and role clarity mapping aligned to business structure',
      'Manager responsibility framework tailored to your reporting lines',
      'Performance and review system design based on your existing cadences',
      'HR calendar and compliance timeline design for your specific obligations',
    ],
    outputs: [
      'HR Architecture Blueprint',
      'Policy and process design specifications',
      'Manager framework design document',
      'Governance and decision rights map',
    ],
  },
  {
    n: '03',
    label: 'Build',
    tagColor: '#22C55E',
    bg: '#020812',
    description:
      "We build everything. Policies, process documentation, manager toolkits, HR calendars, compliance frameworks, performance systems — all written, structured, and ready to use. Not recommendations. Deliverables.",
    whatHappens: [
      'Writing and finalising all policies, employee handbooks, and codes of conduct',
      'Process documentation: hiring, onboarding, performance, exit, grievance',
      'Manager toolkits: decision guides, conversation frameworks, escalation protocols',
      'HR calendar, compliance schedule, and payroll control documentation',
      'Performance review templates, goal-setting frameworks, and feedback tools',
    ],
    outputs: [
      'Complete policy library (leave, attendance, conduct, POSH, IT, travel)',
      'Process playbooks for every stage of the employee lifecycle',
      'Manager enablement toolkit',
      'HR calendar and compliance framework',
    ],
  },
  {
    n: '04',
    label: 'Embed',
    tagColor: '#F59E0B',
    bg: '#050A14',
    description:
      "Building systems isn't enough. We operate alongside the business to ensure real adoption — working with managers on actual people situations, not theoretical ones. Embedding means we're in the room, not on a slide.",
    whatHappens: [
      'Onboarding managers and HR team to new systems, frameworks, and tools',
      'Supporting live people decisions: performance, conduct, grievances, exits',
      'Coaching managers through real situations with the new frameworks',
      'Running the first review cycles, goal-setting sessions, and pulse surveys',
      'Iterating on systems based on real-world feedback from people and managers',
    ],
    outputs: [
      'Adopted HR systems with active usage data',
      'Manager confidence and competence baseline',
      'First performance cycle completed under new framework',
      'Iteration notes and refinement log',
    ],
  },
  {
    n: '05',
    label: 'Transfer',
    tagColor: '#34D399',
    bg: '#020812',
    description:
      "We move ownership of people processes to internal managers and HR — deliberately, measurably, and at a pace that sticks. The goal isn't dependency on Spark Pro. The goal is a team that owns its people function.",
    whatHappens: [
      'Progressive handover of HR responsibilities to designated internal owners',
      'Decision-making authority transferred with documented protocols',
      'Manager capability certification against responsibility framework',
      'Internal HR team training and knowledge transfer sessions',
      'Escalation independence testing — measuring how much reaches leadership',
    ],
    outputs: [
      'Ownership transfer documentation and sign-off',
      'Manager capability assessment post-transfer',
      'Updated HR Independence Score (compared to baseline)',
      'Internal HR operating guide',
    ],
  },
  {
    n: '06',
    label: 'Measure',
    tagColor: '#60A5FA',
    bg: '#050A14',
    description:
      "We track HR independence, adoption, effectiveness, and business impact with real metrics — not vague progress reports. You'll know exactly where the people system stands, what's working, and what needs attention.",
    whatHappens: [
      'HR metrics review: turnover, time-to-fill, absenteeism, manager effectiveness',
      'HR Independence Score re-assessment against the original baseline',
      'Employee pulse survey analysis and engagement trend review',
      'Compliance audit: all statutory filings, payroll accuracy, documentation',
      'Manager performance review against people ownership responsibilities',
    ],
    outputs: [
      'HR Independence Score (updated)',
      'HR Metrics Dashboard with trend data',
      'Employee Engagement Report',
      'Compliance Health Check',
    ],
  },
  {
    n: '07',
    label: 'Improve',
    tagColor: '#F472B6',
    bg: '#020812',
    description:
      "People infrastructure is never finished. As the business grows, the system needs to grow with it. We continuously strengthen the people function — responding to new business stages, team sizes, and organisational challenges.",
    whatHappens: [
      'Quarterly strategic HR reviews aligned to business direction and growth',
      'Policy and process updates as the team grows and regulations change',
      'New capability building for managers as teams expand and roles evolve',
      'Proactive people risk identification before problems become crises',
      'Continuous HR Independence Score improvement across all dimensions',
    ],
    outputs: [
      'Quarterly HR Strategy Review Report',
      'Updated policies, processes, and manager frameworks',
      'Improvement roadmap for next quarter',
      'Running HR Independence trend line',
    ],
  },
];

const DIFFERENTIATORS = [
  {
    label: 'Problem-first',
    desc: "We diagnose before recommending. You'll never receive a generic HR proposal from Spark Pro. Every engagement starts with understanding your specific situation.",
    icon: '◎',
    color: '#2B7FFF',
  },
  {
    label: 'System-first',
    desc: "We build connected infrastructure — not isolated HR activities. Policies, processes, managers, data, and governance are designed to work together.",
    icon: '⬢',
    color: '#22C55E',
  },
  {
    label: 'Manager-owned',
    desc: "We transfer people responsibility to managers, not away from the founder toward a consultant. Spark Pro's success is measured by what managers own when we leave.",
    icon: '◈',
    color: '#F59E0B',
  },
  {
    label: 'Implementation-driven',
    desc: "We don't stop at recommendations. We build and embed the systems ourselves — writing policies, running review cycles, supporting live people decisions.",
    icon: '◉',
    color: '#34D399',
  },
  {
    label: 'Transfer-focused',
    desc: "We build for independence — not permanent dependency on Spark Pro. Every engagement is designed to leave your team stronger and more capable.",
    icon: '◆',
    color: '#60A5FA',
  },
  {
    label: 'Measurable',
    desc: "We track HR maturity and independence with quantifiable metrics. You'll always know where your people system stands and how far it's come.",
    icon: '⬟',
    color: '#F472B6',
  },
];

const ENGAGEMENT_STAGES = [
  {
    stage: 'Build',
    label: 'We build it with you.',
    desc: 'Spark Pro designs and builds the HR infrastructure — policies, processes, systems, and frameworks — from scratch or from a structured foundation. You focus on the business. We build the people system.',
    steps: ['Diagnose', 'Design', 'Build'],
    color: '#2B7FFF',
  },
  {
    stage: 'Operate',
    label: 'We operate it alongside you.',
    desc: "We embed into the business — supporting managers through real people situations, running review cycles, and ensuring the system is adopted, not just documented.",
    steps: ['Embed'],
    color: '#A78BFA',
  },
  {
    stage: 'Handover',
    label: 'We transfer ownership to your team.',
    desc: "Deliberately and measurably, we move people system ownership to internal managers and HR. We measure the transfer and certify that your team is operating independently.",
    steps: ['Transfer', 'Measure'],
    color: '#22C55E',
  },
  {
    stage: 'Partner',
    label: 'We become your strategic HR partner.',
    desc: "As the business grows, Spark Pro stays connected — advising, reviewing, and improving the people system on a continuous basis through monthly advisory and quarterly strategic reviews.",
    steps: ['Improve'],
    color: '#60A5FA',
  },
];

export default function HowWeWork() {
  return (
    <main className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section
        className="relative pt-32 pb-24 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #050A14 0%, #080F1E 60%, #0B1628 100%)' }}
      >
        <div
          className="absolute top-1/3 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(43,127,255,0.07) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(43,127,255,0.04) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{ background: 'rgba(43,127,255,0.1)', border: '1px solid rgba(43,127,255,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B7FFF] animate-pulse" />
              <span className="text-xs font-medium" style={{ color: '#60A5FA', fontFamily: "'Inter', sans-serif" }}>
                Methodology
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}
            >
              We don't just deliver HR.{' '}
              <span style={{ background: 'linear-gradient(135deg, #2B7FFF 0%, #60A5FA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                We transfer ownership.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg leading-relaxed mb-10 max-w-2xl"
              style={{ color: 'rgba(226,232,244,0.65)', fontFamily: "'Inter', sans-serif" }}
            >
              Every Spark Pro engagement follows the same seven-stage methodology — from diagnosis through to continuous improvement. The goal isn't to make you dependent on us. The goal is to make your people system work without depending on anyone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              {STEPS.map((step, i) => (
                <div key={step.n} className="flex items-center gap-3">
                  {i > 0 && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.25 }}>
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="#E2E8F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span
                    className="text-sm font-semibold"
                    style={{ color: step.tagColor, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold transition-all duration-200"
                style={{
                  background: '#2B7FFF',
                  color: '#ffffff',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: '0 0 30px rgba(43,127,255,0.35)',
                }}
              >
                Start with a Diagnosis
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-medium transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: 'rgba(226,232,244,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                See All Solutions
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 7-STEP METHODOLOGY ─── */}
      {STEPS.map((step, i) => (
        <section
          key={step.n}
          className="py-20 relative overflow-hidden"
          style={{ background: step.bg }}
        >
          {/* Subtle radial accent */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${step.tagColor}08 0%, transparent 70%)`,
              top: '50%',
              left: i % 2 === 0 ? '-100px' : 'auto',
              right: i % 2 !== 0 ? '-100px' : 'auto',
              transform: 'translateY(-50%)',
            }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Large step number */}
              <RevealSection className="lg:col-span-3">
                <div className="flex flex-col gap-4">
                  <span
                    className="font-bold leading-none"
                    style={{
                      fontSize: 'clamp(80px, 12vw, 140px)',
                      color: `${step.tagColor}18`,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    {step.n}
                  </span>
                  <span
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold w-fit"
                    style={{ background: `${step.tagColor}15`, color: step.tagColor, fontFamily: "'Inter', sans-serif", border: `1px solid ${step.tagColor}25` }}
                  >
                    Step {step.n}
                  </span>
                </div>
              </RevealSection>

              {/* Content */}
              <div className="lg:col-span-9">
                <RevealSection delay={0.1}>
                  <h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}
                  >
                    <span style={{ color: step.tagColor }}>{step.label}.</span>
                  </h2>
                  <p
                    className="text-lg leading-relaxed mb-8 max-w-2xl"
                    style={{ color: 'rgba(226,232,244,0.65)', fontFamily: "'Inter', sans-serif" }}
                  >
                    {step.description}
                  </p>
                </RevealSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RevealSection delay={0.2}>
                    <div
                      className="rounded-2xl p-6 h-full"
                      style={{ background: 'rgba(11,22,40,0.7)', border: '1px solid rgba(43,127,255,0.1)' }}
                    >
                      <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(226,232,244,0.3)', fontFamily: "'Inter', sans-serif" }}>
                        What happens in this stage
                      </p>
                      <ul className="space-y-3">
                        {step.whatHappens.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ background: step.tagColor }}
                            />
                            <span className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,244,0.6)', fontFamily: "'Inter', sans-serif" }}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </RevealSection>

                  <RevealSection delay={0.3}>
                    <div
                      className="rounded-2xl p-6 h-full"
                      style={{
                        background: `${step.tagColor}08`,
                        border: `1px solid ${step.tagColor}20`,
                      }}
                    >
                      <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(226,232,244,0.3)', fontFamily: "'Inter', sans-serif" }}>
                        Typical outputs
                      </p>
                      <ul className="space-y-3">
                        {step.outputs.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ background: '#22C55E' }}
                            />
                            <span className="text-sm leading-relaxed font-medium" style={{ color: 'rgba(226,232,244,0.8)', fontFamily: "'Inter', sans-serif" }}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </RevealSection>
                </div>
              </div>
            </div>
          </div>

          {/* Step connector line */}
          {i < STEPS.length - 1 && (
            <div className="max-w-7xl mx-auto px-6 mt-16">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${step.tagColor}30, transparent)` }} />
                <span className="text-xs" style={{ color: 'rgba(226,232,244,0.2)', fontFamily: "'Inter', sans-serif" }}>
                  {STEPS[i + 1].label} →
                </span>
              </div>
            </div>
          )}
        </section>
      ))}

      {/* ─── WHAT MAKES SPARK PRO DIFFERENT ─── */}
      <section className="py-28" style={{ background: '#050A14' }}>
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              The Difference
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}>
              What makes Spark Pro<br />
              <span style={{ background: 'linear-gradient(135deg, #2B7FFF 0%, #60A5FA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                different.
              </span>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DIFFERENTIATORS.map((item, i) => (
              <RevealSection key={item.label} delay={i * 0.07}>
                <div
                  className="p-7 rounded-2xl h-full"
                  style={{
                    background: 'rgba(11,22,40,0.7)',
                    border: '1px solid rgba(43,127,255,0.08)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center"
                    style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}
                  >
                    <span style={{ color: item.color, fontSize: 18 }}>{item.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {item.label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,244,0.5)', fontFamily: "'Inter', sans-serif" }}>
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BUILD → OPERATE → HANDOVER → PARTNER ─── */}
      <section className="py-28" style={{ background: '#020812' }}>
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-20">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Engagement Model
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}>
              Build. Operate.<br />Handover. Partner.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(226,232,244,0.5)', fontFamily: "'Inter', sans-serif" }}>
              The seven-step methodology maps to four phases of engagement. Every business starts at Diagnose — how far you go depends on what you need.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ENGAGEMENT_STAGES.map((stage, i) => (
              <RevealSection key={stage.stage} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-8 h-full flex flex-col"
                  style={{
                    background: 'rgba(11,22,40,0.7)',
                    border: `1px solid ${stage.color}20`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                      style={{ background: `${stage.color}15`, color: stage.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {stage.stage}
                    </div>
                    <div className="flex-1 h-px" style={{ background: `${stage.color}20` }} />
                    <div className="flex items-center gap-1.5">
                      {stage.steps.map((s) => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(43,127,255,0.1)', color: 'rgba(226,232,244,0.4)', fontFamily: "'Inter', sans-serif" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {stage.label}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(226,232,244,0.55)', fontFamily: "'Inter', sans-serif" }}>
                    {stage.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={0.3}>
            <div
              className="mt-10 rounded-2xl p-8 text-center"
              style={{ background: 'rgba(43,127,255,0.06)', border: '1px solid rgba(43,127,255,0.15)' }}
            >
              <p className="text-xl font-semibold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                The goal isn't to make your business dependent on Spark Pro.
              </p>
              <p className="text-xl font-semibold" style={{ color: '#60A5FA', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                The goal is to make your people system stronger without dependence on anyone.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-32 relative overflow-hidden" style={{ background: '#050A14' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(43,127,255,0.08) 0%, transparent 70%)' }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <RevealSection>
            <div
              className="rounded-3xl p-14"
              style={{
                background: 'rgba(11,22,40,0.8)',
                border: '1px solid rgba(43,127,255,0.2)',
                boxShadow: '0 0 80px rgba(43,127,255,0.08)',
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Ready to Start?
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Every engagement starts<br />
                <span style={{ background: 'linear-gradient(135deg, #2B7FFF 0%, #60A5FA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  with Diagnose.
                </span>
              </h2>
              <p className="text-lg mb-10" style={{ color: 'rgba(226,232,244,0.55)', fontFamily: "'Inter', sans-serif" }}>
                Let's map your current people system, score your HR independence, and identify exactly what needs to change — before recommending anything.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
                  style={{ background: '#2B7FFF', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: '0 0 30px rgba(43,127,255,0.4)' }}
                >
                  Start with the HR Independence Audit →
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(226,232,244,0.8)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  See All Solutions
                </Link>
              </div>
              <p className="mt-10 text-sm font-medium" style={{ color: 'rgba(43,127,255,0.5)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Diagnose → Design → Build → Embed → Transfer → Measure → Improve
              </p>
            </div>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
