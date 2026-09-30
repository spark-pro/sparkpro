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
    icon: '🗂️',
    title: 'Policies exist but nobody follows them',
    description:
      'The employee handbook was written two years ago and sits on a shared drive nobody visits. Decisions are still made case by case, based on who asks and how loudly.',
  },
  {
    icon: '🔀',
    title: 'Inconsistency is corroding trust',
    description:
      'When similar situations are handled differently by different managers, employees notice. What looks like a management problem is usually a systems problem in disguise.',
  },
  {
    icon: '📣',
    title: 'Managers escalate everything',
    description:
      'Your HR person or founder is still the real decision-maker on leave disputes, salary questions, and performance conversations. Managers have authority but not the tools to use it.',
  },
  {
    icon: '🏔️',
    title: 'The founder is still the real HR department',
    description:
      'Despite having HR headcount, the most sensitive people decisions still land on the founder\'s desk. This does not scale. It also signals to the organisation that HR is not trusted.',
  },
  {
    icon: '📉',
    title: 'Retention is unpredictable',
    description:
      'You find out people are unhappy when they resign. There is no structured listening mechanism, no career conversation cadence, and no data on flight risk until the damage is done.',
  },
];

const stages = [
  {
    number: '01',
    title: 'Diagnose',
    color: '#2B7FFF',
    description: 'Understand exactly where your HR infrastructure stands before building anything.',
    items: ['HR Health Check', 'Independence Score', 'Gap Analysis'],
  },
  {
    number: '02',
    title: 'Build',
    color: '#60A5FA',
    description: 'Construct the foundational systems your size and stage actually require.',
    items: ['Systems Design', 'Policy Architecture', 'Process Documentation'],
  },
  {
    number: '03',
    title: 'Strengthen',
    color: '#34D399',
    description: 'Develop the human layer that makes systems work in practice.',
    items: ['Manager Enablement', 'Performance Framework', 'Employee Experience'],
  },
  {
    number: '04',
    title: 'Scale',
    color: '#F59E0B',
    description: 'Build the infrastructure for the company you are becoming, not just the one you are.',
    items: ['Workforce Planning', 'Leadership Development', 'HR Function Design'],
  },
  {
    number: '05',
    title: 'Partner',
    color: '#A78BFA',
    description: 'Ongoing strategic HR support as a retained partner in your growth.',
    items: ['Continuous HR Support', 'Strategic Advisory', 'Quarterly Reviews'],
  },
];

const dimensions = [
  {
    name: 'Founder Dependency',
    description: 'How much people decision-making flows through the founder versus distributed across the organisation.',
  },
  {
    name: 'Process Maturity',
    description: 'Whether core HR processes are documented, consistently applied, and understood by those who own them.',
  },
  {
    name: 'Manager Ownership',
    description: 'The degree to which line managers operate independently and confidently on people matters.',
  },
  {
    name: 'Governance',
    description: 'Clarity of HR decision rights, escalation paths, and accountability across the organisation.',
  },
  {
    name: 'Employee Lifecycle',
    description: 'Quality and consistency of experience from pre-hire through exit, including onboarding and offboarding.',
  },
  {
    name: 'Performance',
    description: 'How effectively the organisation sets expectations, gives feedback, and differentiates performance.',
  },
  {
    name: 'Documentation',
    description: 'Whether policies, contracts, and handbooks are current, accessible, and aligned to actual practice.',
  },
  {
    name: 'Compliance',
    description: 'Exposure to statutory and regulatory risk across employment, payroll, and workplace obligations.',
  },
  {
    name: 'People Data',
    description: 'Availability of HR metrics — turnover, headcount, cost, engagement — that inform business decisions.',
  },
];

const interventions = [
  {
    title: 'HR Foundation Rebuild',
    tag: 'Systems',
    color: '#2B7FFF',
    description:
      'A comprehensive rebuild of core HR documentation, policies, and processes when informal systems have outgrown their usefulness. Typically a 6-8 week engagement.',
  },
  {
    title: 'Manager Enablement Program',
    tag: 'Capability',
    color: '#60A5FA',
    description:
      'Structured development for line managers covering performance conversations, feedback, delegation, and HR process ownership. Delivered in cohorts or 1:1.',
  },
  {
    title: 'Performance Reset',
    tag: 'Process',
    color: '#34D399',
    description:
      'A redesign of the performance management cycle — from goal-setting and check-ins to reviews and consequence management — built to be owned by managers, not HR.',
  },
  {
    title: 'Retention Program',
    tag: 'People',
    color: '#F59E0B',
    description:
      'A diagnostic and intervention program targeting the specific drivers of unwanted turnover in your organisation, including stay conversations and career frameworks.',
  },
  {
    title: 'Compliance Audit & Fix',
    tag: 'Risk',
    color: '#F87171',
    description:
      'A structured review of your employment contracts, statutory obligations, and HR practices against current legal requirements, followed by a remediation plan.',
  },
  {
    title: 'HR Function Development',
    tag: 'Function',
    color: '#A78BFA',
    description:
      'Design of an HR operating model fit for your next phase — including the right structure, roles, tooling, and accountabilities for a 50–200 person organisation.',
  },
];

const milestones = [
  {
    month: 'Month 1',
    label: 'Diagnose',
    activities: [
      'HR Health Check across all 9 dimensions',
      'Independence Score baseline',
      'Stakeholder interviews (founders, managers, HR)',
      'Gap Analysis and prioritisation workshop',
    ],
  },
  {
    month: 'Month 2–3',
    label: 'Design & Build',
    activities: [
      'Priority system and policy design',
      'Process documentation and tooling',
      'Manager briefing and rollout planning',
      'First wave deliverables reviewed and approved',
    ],
  },
  {
    month: 'Month 3–4',
    label: 'Embed',
    activities: [
      'Manager enablement sessions',
      'Employee communication and rollout',
      'HR team capability building',
      'Second wave deliverables completed',
    ],
  },
  {
    month: 'Month 5–6',
    label: 'Strengthen & Hand Over',
    activities: [
      'Performance framework activation',
      'Retention program launch',
      'HR ownership transition',
      'Progress review and next-phase planning',
    ],
  },
];

export default function ForSMEs() {
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
              For SMEs
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
          >
            Your business has grown.{' '}
            <span style={{ color: '#2B7FFF' }}>Your HR system should too.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl max-w-2xl mx-auto mb-10"
            style={{ color: 'rgba(226,232,244,0.6)' }}
          >
            For SMEs with 20–200 employees that have outgrown informal people management.
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
              Start With Your HR Health Check →
            </Link>
            <a
              href="#five-stages"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold border transition-all duration-200 hover:bg-white/5"
              style={{
                borderColor: 'rgba(43,127,255,0.3)',
                color: '#E2E8F4',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              See the Growth Journey
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
                The SME HR Problem
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(226,232,244,0.6)' }}>
                You have employees. Maybe an HR person. Policies somewhere on a shared drive. But
                the systems do not connect. Decisions are inconsistent. Managers escalate
                everything. The founder is still the real HR department.
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

      {/* Five-Stage Journey */}
      <section id="five-stages" className="py-24 px-6" style={{ backgroundColor: '#050A14' }}>
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                The Five-Stage SME Growth Journey
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(226,232,244,0.6)' }}>
                A structured progression from where you are to where your HR infrastructure needs
                to be — built on diagnosis, not assumption.
              </p>
            </div>
          </RevealSection>
          <div className="relative">
            {/* Vertical connector */}
            <div
              className="absolute left-[39px] top-16 bottom-16 w-0.5 hidden md:block"
              style={{
                background:
                  'linear-gradient(180deg, #2B7FFF 0%, #60A5FA 30%, #34D399 55%, #F59E0B 75%, #A78BFA 100%)',
              }}
            />
            <div className="space-y-6">
              {stages.map((stage, i) => (
                <RevealSection key={stage.number} delay={i * 0.1}>
                  <div className="flex gap-6 items-start">
                    <div
                      className="relative z-10 w-20 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0"
                      style={{
                        background: `${stage.color}18`,
                        border: `1px solid ${stage.color}40`,
                      }}
                    >
                      <span
                        className="text-xs font-bold tracking-wider"
                        style={{ color: stage.color, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        Stage
                      </span>
                      <span
                        className="text-2xl font-bold"
                        style={{ color: stage.color, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {stage.number}
                      </span>
                    </div>
                    <div
                      className="flex-1 p-6 rounded-2xl"
                      style={{
                        backgroundColor: 'rgba(11,22,40,0.7)',
                        border: `1px solid ${stage.color}15`,
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                        <h3
                          className="text-xl font-bold"
                          style={{
                            fontFamily: 'Plus Jakarta Sans, sans-serif',
                            color: stage.color,
                          }}
                        >
                          {stage.title}
                        </h3>
                      </div>
                      <p
                        className="text-sm mb-4 leading-relaxed"
                        style={{ color: 'rgba(226,232,244,0.6)' }}
                      >
                        {stage.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {stage.items.map((item) => (
                          <span
                            key={item}
                            className="text-xs font-medium px-3 py-1 rounded-full"
                            style={{
                              backgroundColor: `${stage.color}12`,
                              color: stage.color,
                              border: `1px solid ${stage.color}25`,
                              fontFamily: 'Plus Jakarta Sans, sans-serif',
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HR Independence Dimensions */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0B1628' }}>
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                What We Diagnose First
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(226,232,244,0.6)' }}>
                The HR Health Check scores your organisation across nine dimensions of HR
                independence — giving you a clear picture of where your infrastructure is strong
                and where it is carrying risk.
              </p>
            </div>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dimensions.map((dim, i) => (
              <RevealSection key={dim.name} delay={i * 0.06}>
                <div
                  className="rounded-2xl p-6 h-full group transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'rgba(11,22,40,0.7)',
                    border: '1px solid rgba(43,127,255,0.08)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        backgroundColor: 'rgba(43,127,255,0.15)',
                        color: '#2B7FFF',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3
                      className="font-bold"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    >
                      {dim.name}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,244,0.55)' }}>
                    {dim.description}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Common Interventions */}
      <section className="py-24 px-6" style={{ backgroundColor: '#050A14' }}>
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Common SME Interventions
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(226,232,244,0.6)' }}>
                Based on what the Health Check surfaces, Spark Pro deploys targeted programs —
                each designed as a standalone engagement or as part of a broader transformation.
              </p>
            </div>
          </RevealSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interventions.map((intervention, i) => (
              <RevealSection key={intervention.title} delay={i * 0.08}>
                <div
                  className="rounded-2xl p-7 h-full transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'rgba(11,22,40,0.7)',
                    border: `1px solid ${intervention.color}15`,
                  }}
                >
                  <div className="mb-4">
                    <span
                      className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
                      style={{
                        backgroundColor: `${intervention.color}15`,
                        color: intervention.color,
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                      }}
                    >
                      {intervention.tag}
                    </span>
                    <h3
                      className="text-lg font-bold"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    >
                      {intervention.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,244,0.6)' }}>
                    {intervention.description}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Typical Engagement Model */}
      <section className="py-24 px-6" style={{ backgroundColor: '#020812' }}>
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Typical SME Engagement
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(226,232,244,0.6)' }}>
                A 3–6 month structured engagement that takes you from diagnosis to a functioning,
                manager-owned HR infrastructure — with monthly milestones throughout.
              </p>
            </div>
          </RevealSection>
          <div className="grid sm:grid-cols-2 gap-6">
            {milestones.map((m, i) => (
              <RevealSection key={m.month} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-7 h-full"
                  style={{
                    backgroundColor: 'rgba(11,22,40,0.7)',
                    border: '1px solid rgba(43,127,255,0.08)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: 'rgba(43,127,255,0.12)',
                        color: '#60A5FA',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                      }}
                    >
                      {m.month}
                    </span>
                    <h3
                      className="text-lg font-bold"
                      style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#2B7FFF' }}
                    >
                      {m.label}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {m.activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-3">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: '#2B7FFF' }}
                        />
                        <span className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,244,0.7)' }}>
                          {activity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>
            ))}
          </div>
          <RevealSection delay={0.3}>
            <div
              className="mt-6 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              style={{
                backgroundColor: 'rgba(43,127,255,0.06)',
                border: '1px solid rgba(43,127,255,0.15)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
                style={{ backgroundColor: 'rgba(43,127,255,0.15)' }}
              >
                ℹ️
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,244,0.7)' }}>
                Every engagement begins with the HR Health Check. The findings determine which
                stages and interventions are prioritised — so you are never paying for work your
                organisation does not need at this point in its growth.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-32 px-6 text-center relative overflow-hidden"
        style={{ backgroundColor: '#0B1628' }}
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
              Start with your{' '}
              <span style={{ color: '#2B7FFF' }}>HR Health Check.</span>
            </h2>
            <p className="text-xl mb-10" style={{ color: 'rgba(226,232,244,0.6)' }}>
              A structured diagnostic across nine dimensions of HR independence. You will know
              exactly where you stand, what the gaps are, and what to fix first — before
              committing to anything.
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
              Start With Your HR Health Check →
            </Link>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
