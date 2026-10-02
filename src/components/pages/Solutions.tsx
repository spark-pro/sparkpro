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

const SOLUTIONS = [
  {
    id: 'audit',
    tag: 'Diagnose',
    tagColor: '#2B7FFF',
    icon: '◎',
    title: 'HR Independence Audit',
    problem: "You don't know where your HR system is strong — or where it's quietly holding the business back.",
    whatsBuilt: [
      'Assessment across HR processes, compliance practices, and documentation quality',
      'Founder dependency mapping across all people decisions',
      'Manager capability evaluation and ownership gap analysis',
      'Compliance posture review against your growth stage requirements',
      'Gap analysis across 9 dimensions of HR maturity',
    ],
    outcomes: [
      'HR Independence Score (0–100)',
      'Structured Gap Report across 9 dimensions',
      'Priority Roadmap with recommended engagement model',
    ],
    cta: 'Start Your HR Health Check',
  },
  {
    id: 'foundation',
    tag: 'Build',
    tagColor: '#A78BFA',
    icon: '⬡',
    title: 'HR Foundation Build',
    problem: "Your business has grown but your HR infrastructure was designed for 10 people, not 50.",
    whatsBuilt: [
      'Policies: leave, attendance, code of conduct, POSH, IT & data, travel, and role-specific policies',
      'Processes: hiring, onboarding, probation, performance, exit — documented and usable',
      'HR calendar with all compliance, review, and operational cadences',
      'Employee lifecycle design from offer acceptance to exit',
      'Performance systems, manager framework, and grievance process',
      'Recruitment process architecture, payroll controls, and compliance documentation',
    ],
    outcomes: [
      'A complete HR foundation that works at your current stage and scales with growth',
      'Documentation your team can actually follow — not shelf-ware',
      'Compliance coverage appropriate to your headcount and industry',
    ],
    cta: 'Build Your HR Foundation',
  },
  {
    id: 'os',
    tag: 'Integrate',
    tagColor: '#22C55E',
    icon: '⬢',
    title: 'People Operating System',
    problem: "People, processes, and decisions operate in silos. Nothing connects. Nothing scales.",
    whatsBuilt: [
      'Integrated system connecting people data, processes, managers, and business decisions',
      'People governance framework — who owns what, and how decisions are made',
      'Performance infrastructure with clear accountability chains across every level',
      'Employee experience design from onboarding to growth conversations',
      'HR data structure: metrics, dashboards, and workforce analytics foundation',
      'Escalation architecture that stops people problems reaching the founder',
    ],
    outcomes: [
      'One coherent people system operating without constant founder oversight',
      'Measurable HR governance with defined ownership at every level',
      'A people infrastructure your business can grow into — not out of',
    ],
    cta: 'Build Your People OS',
  },
  {
    id: 'manager',
    tag: 'Enable',
    tagColor: '#F59E0B',
    icon: '◈',
    title: 'Manager Enablement System',
    problem: "Managers manage work. The founder still manages people. That equation doesn't scale.",
    whatsBuilt: [
      'Manager responsibilities framework — what is owned at each level',
      'Decision rights map: what managers can decide, what requires escalation',
      'Escalation framework that filters people issues before they reach leadership',
      'Performance ownership system with manager-led review cadences',
      'Employee issue handling protocols — grievances, performance, conduct',
      'Manager capability assessment and structured development pathway',
    ],
    outcomes: [
      'Managers who own people decisions — and know exactly how to handle them',
      'A structured escalation system that dramatically reduces founder intervention',
      'Clear accountability at team level for performance, conduct, and retention',
    ],
    cta: 'Enable Your Managers',
  },
  {
    id: 'performance',
    tag: 'Strengthen',
    tagColor: '#34D399',
    icon: '◉',
    title: 'Performance & Retention',
    problem: "Performance is subjective. Retention is reactive. Engagement is unmeasured.",
    whatsBuilt: [
      'KPI frameworks by role, team, and business unit',
      'Goal-setting methodology and OKR / target-setting cadence',
      'Performance review process: half-yearly, annual, and continuous feedback cycles',
      '360 feedback design and implementation',
      'Reward and recognition architecture — monetary and non-monetary',
      'Retention diagnostics, employee pulse, and structured engagement listening systems',
    ],
    outcomes: [
      'Clear performance standards that employees and managers understand and use',
      'Structured review process with documentation and outcome tracking',
      'A retention and engagement program linked to real business drivers',
    ],
    cta: 'Strengthen Performance',
  },
  {
    id: 'payroll',
    tag: 'Protect',
    tagColor: '#60A5FA',
    icon: '◆',
    title: 'Payroll & Compliance',
    problem: "Payroll is fragile. Compliance is a calendar of unknowns. A missed deadline becomes a legal risk.",
    whatsBuilt: [
      'End-to-end payroll process design and operational setup',
      'Attendance and leave system integration with payroll inputs',
      'Statutory compliance: PF, ESI, TDS, PT, Gratuity, LWF',
      'Compliance calendar with deadlines, filings, and accountabilities',
      'Payroll reconciliation, error-handling, and dispute resolution process',
      'Audit-ready documentation and payroll control frameworks',
    ],
    outcomes: [
      'Accurate, on-time payroll with zero missed compliance deadlines',
      'Full statutory coverage appropriate to your geography and headcount',
      'Audit-ready documentation and payroll control frameworks in place',
    ],
    cta: 'Fix Your Payroll & Compliance',
  },
  {
    id: 'partner',
    tag: 'Sustain',
    tagColor: '#F472B6',
    icon: '⬟',
    title: 'Continuous HR Partner',
    problem: "HR needs evolve as the business grows. A one-time intervention isn't enough to stay ahead.",
    whatsBuilt: [
      'Monthly HR advisory — people issues, decisions, and escalation support',
      'Quarterly business reviews with HR metrics and independence scoring',
      'Employee pulse surveys and engagement analysis',
      'HR metrics dashboard — turnover, time-to-fill, absenteeism, manager effectiveness',
      'Management support on performance, employee relations, and people decisions',
      'Continuous policy and process updates as regulations and business evolve',
    ],
    outcomes: [
      'An always-on HR function that strengthens as your business scales',
      'Proactive people risk management before issues become crises',
      'A strategic HR advisor who knows your business, your culture, and your team',
    ],
    cta: 'Become a Continuous Partner',
  },
];

export default function Solutions() {
  return (
    <main className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section
        className="relative pt-32 pb-24 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #050A14 0%, #080F1E 60%, #0B1628 100%)' }}
      >
        <div
          className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(43,127,255,0.07) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
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
                Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}
            >
              People infrastructure designed around{' '}
              <span style={{ background: 'linear-gradient(135deg, #2B7FFF 0%, #60A5FA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                your business stage.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg leading-relaxed mb-10 max-w-2xl"
              style={{ color: 'rgba(226,232,244,0.65)', fontFamily: "'Inter', sans-serif" }}
            >
              We don't start with a proposal. We start with a diagnosis. Every engagement begins by understanding where your HR system stands today — and what your business actually needs to grow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
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
                href="/how-we-work"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-medium transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: 'rgba(226,232,244,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                See How We Work
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 mt-12"
            >
              {SOLUTIONS.map((sol, i) => (
                <div key={sol.id} className="flex items-center gap-2">
                  {i > 0 && <span style={{ color: 'rgba(226,232,244,0.2)', fontSize: 10 }}>→</span>}
                  <span className="text-xs font-medium" style={{ color: 'rgba(226,232,244,0.35)', fontFamily: "'Inter', sans-serif" }}>{sol.tag}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SOLUTION CARDS ─── */}
      <section className="py-24" style={{ background: '#020812' }}>
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              All Solutions
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}>
              Build only what<br />your business needs.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(226,232,244,0.5)', fontFamily: "'Inter', sans-serif" }}>
              Seven solutions that can be deployed individually or as part of a connected people infrastructure. Each is built for your specific stage and context.
            </p>
          </RevealSection>

          <div className="space-y-6">
            {SOLUTIONS.map((sol, i) => (
              <RevealSection key={sol.id} delay={i * 0.05}>
                <div
                  className="rounded-2xl p-8 lg:p-10"
                  style={{
                    background: 'rgba(11,22,40,0.7)',
                    border: '1px solid rgba(43,127,255,0.10)',
                  }}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl" style={{ color: sol.tagColor }}>{sol.icon}</span>
                      <div>
                        <span
                          className="inline-block text-xs px-3 py-1 rounded-full font-medium mb-2"
                          style={{ background: `${sol.tagColor}15`, color: sol.tagColor, fontFamily: "'Inter', sans-serif" }}
                        >
                          {sol.tag}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {sol.title}
                        </h3>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="flex-shrink-0 self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: `${sol.tagColor}12`,
                        color: sol.tagColor,
                        border: `1px solid ${sol.tagColor}25`,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {sol.cta}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                  </div>

                  {/* Problem */}
                  <div
                    className="rounded-xl px-5 py-4 mb-6"
                    style={{ background: 'rgba(255,68,68,0.05)', border: '1px solid rgba(255,68,68,0.12)' }}
                  >
                    <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,100,100,0.6)', fontFamily: "'Inter', sans-serif" }}>The Problem</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,244,0.75)', fontFamily: "'Inter', sans-serif" }}>{sol.problem}</p>
                  </div>

                  {/* Grid: What's Built + Outcomes */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(226,232,244,0.3)', fontFamily: "'Inter', sans-serif" }}>What's Built</p>
                      <ul className="space-y-2.5">
                        {sol.whatsBuilt.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: sol.tagColor }} />
                            <span className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,244,0.6)', fontFamily: "'Inter', sans-serif" }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(226,232,244,0.3)', fontFamily: "'Inter', sans-serif" }}>Outcomes</p>
                      <ul className="space-y-2.5">
                        {sol.outcomes.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#22C55E' }} />
                            <span className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,244,0.7)', fontFamily: "'Inter', sans-serif" }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIAGNOSIS-FIRST SECTION ─── */}
      <section className="py-28 relative overflow-hidden" style={{ background: '#050A14' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(43,127,255,0.05) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Our Approach
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}>
                We start with diagnosis.{' '}
                <span style={{ background: 'linear-gradient(135deg, #2B7FFF 0%, #60A5FA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Always.
                </span>
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'rgba(226,232,244,0.6)', fontFamily: "'Inter', sans-serif" }}>
                Most HR consultants arrive with a proposal. We arrive with questions. Before recommending any solution, we map your current people system — its strengths, gaps, and points of founder dependency.
              </p>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(226,232,244,0.6)', fontFamily: "'Inter', sans-serif" }}>
                The HR Independence Audit is the starting point for every Spark Pro engagement. It ensures you build what your business actually needs — not what sounds good in a generic template.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-base font-semibold"
                style={{ background: '#2B7FFF', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: '0 0 25px rgba(43,127,255,0.3)' }}
              >
                Check Your HR Score — Free →
              </Link>
            </RevealSection>

            <RevealSection delay={0.15}>
              <div className="space-y-3">
                {[
                  { bad: 'Generic HR proposals', good: 'Diagnosis-led engagement design' },
                  { bad: 'Standard policy templates', good: 'Stage-specific policy builds' },
                  { bad: 'Activity-based HR work', good: 'System and infrastructure focus' },
                  { bad: 'One-time recommendations', good: 'Build, embed, and transfer model' },
                  { bad: 'Permanent consultant dependency', good: 'Transfer ownership to internal team' },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-2 gap-3">
                    <div
                      className="flex items-start gap-3 px-4 py-3 rounded-xl"
                      style={{ background: 'rgba(255,68,68,0.05)', border: '1px solid rgba(255,68,68,0.12)' }}
                    >
                      <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: '#FF6666' }}>✕</span>
                      <span className="text-sm" style={{ color: 'rgba(226,232,244,0.45)', fontFamily: "'Inter', sans-serif" }}>{item.bad}</span>
                    </div>
                    <div
                      className="flex items-start gap-3 px-4 py-3 rounded-xl"
                      style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}
                    >
                      <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: '#22C55E' }}>✓</span>
                      <span className="text-sm" style={{ color: 'rgba(226,232,244,0.7)', fontFamily: "'Inter', sans-serif" }}>{item.good}</span>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-32 relative overflow-hidden" style={{ background: '#020812' }}>
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
                Start Here
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Not sure which solution{' '}
                <span style={{ background: 'linear-gradient(135deg, #2B7FFF 0%, #60A5FA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  your business needs?
                </span>
              </h2>
              <p className="text-lg mb-10" style={{ color: 'rgba(226,232,244,0.55)', fontFamily: "'Inter', sans-serif" }}>
                Start with the HR Independence Audit. It maps your current people system, identifies the real gaps, and tells you exactly what to build — in priority order.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
                  style={{ background: '#2B7FFF', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: '0 0 30px rgba(43,127,255,0.4)' }}
                >
                  Check Your HR Score — Free →
                </Link>
                <Link
                  href="/how-we-work"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(226,232,244,0.8)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  See How We Work
                </Link>
              </div>
              <p className="mt-10 text-sm font-medium" style={{ color: 'rgba(43,127,255,0.5)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Every engagement starts with diagnosis. No generic proposals.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
