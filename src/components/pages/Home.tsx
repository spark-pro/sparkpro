'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView as fmUseInView, AnimatePresence } from 'framer-motion';
import FounderViz from '@/components/FounderViz';

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

const SYMPTOMS = [
  'Every hiring decision reaches the founder',
  'Employees come directly to the founder',
  'Managers escalate routine people issues',
  'Salary questions reach management',
  'Attendance problems require founder intervention',
  'Performance decisions lack consistency',
  'Policies exist but aren\'t followed',
  'HR processes depend on individual people',
  'Nobody clearly owns people decisions',
];

const LAYERS = [
  { n: '01', label: 'People Structure', desc: 'Org design, roles, spans of control, and reporting architecture that enables scale.' },
  { n: '02', label: 'People Processes', desc: 'Standardized workflows for hiring, onboarding, performance, exit, and every step between.' },
  { n: '03', label: 'People Governance', desc: 'Decision rights, escalation protocols, accountability frameworks, and HR policy.' },
  { n: '04', label: 'People Performance', desc: 'KPI frameworks, goal-setting cadence, review cycles, and performance improvement systems.' },
  { n: '05', label: 'Manager Systems', desc: 'Manager responsibility frameworks, decision rights, capability development, and people ownership.' },
  { n: '06', label: 'Employee Experience', desc: 'Lifecycle design from offer to exit — clarity, communication, recognition, and engagement.' },
  { n: '07', label: 'People Data', desc: 'HR metrics, dashboards, workforce analytics, and the data infrastructure behind decisions.' },
  { n: '08', label: 'People Capability', desc: 'Learning pathways, skill frameworks, and the systems to develop people at scale.' },
  { n: '09', label: 'Workforce Scaling', desc: 'Workforce planning, hiring pipelines, capacity modeling, and growth-stage HR readiness.' },
];

const LAYER_CONNECTIONS: Record<number, number[]> = {
  0: [1, 2, 4],
  1: [0, 2, 3, 5],
  2: [0, 1, 3, 6],
  3: [1, 2, 4, 5],
  4: [0, 3, 5],
  5: [1, 3, 4, 6],
  6: [2, 5, 7],
  7: [5, 6, 8],
  8: [0, 6, 7],
};

const SOLUTIONS = [
  {
    id: 'audit',
    label: 'HR Independence Audit',
    tag: 'Diagnose',
    problem: 'You don\'t know where your HR system is strong — and where it\'s holding the business back.',
    system: 'A structured assessment across 9 dimensions of HR maturity and founder dependency.',
    outcome: 'HR Independence Score + Gap Report + Priority Roadmap.',
    icon: '◎',
    href: '/solutions',
    color: '#2B7FFF',
  },
  {
    id: 'foundation',
    label: 'HR Foundation Build',
    tag: 'Build',
    problem: 'Your business is growing but your HR infrastructure was built for 10 people.',
    system: 'Policies, processes, roles, HR calendar, lifecycle systems, compliance documentation.',
    outcome: 'A complete HR foundation that works at your current stage and scales with growth.',
    icon: '⬡',
    href: '/solutions',
    color: '#A78BFA',
  },
  {
    id: 'os',
    label: 'People Operating System',
    tag: 'Integrate',
    problem: 'People, processes, and decisions operate in silos. Nothing connects.',
    system: 'An integrated operating system connecting people, managers, governance, and data.',
    outcome: 'One coherent people system that runs without constant founder oversight.',
    icon: '⬢',
    href: '/solutions',
    color: '#22C55E',
  },
  {
    id: 'manager',
    label: 'Manager Enablement System',
    tag: 'Enable',
    problem: 'Managers manage work. The founder still manages people.',
    system: 'Manager responsibility frameworks, decision rights, escalation architecture, capability development.',
    outcome: 'Managers who own people decisions — and know exactly how to handle them.',
    icon: '◈',
    href: '/solutions',
    color: '#F59E0B',
  },
  {
    id: 'performance',
    label: 'Performance & Retention',
    tag: 'Strengthen',
    problem: 'Performance is subjective. Retention is reactive. Engagement is unmeasured.',
    system: 'KPI frameworks, review cycles, recognition programs, engagement diagnostics.',
    outcome: 'Clear performance standards, stronger retention, and employees who understand expectations.',
    icon: '◉',
    href: '/solutions',
    color: '#34D399',
  },
  {
    id: 'payroll',
    label: 'Payroll & Compliance',
    tag: 'Protect',
    problem: 'Payroll is fragile. Compliance is a calendar of unknowns.',
    system: 'End-to-end payroll operations, statutory compliance (PF, ESI, TDS, PT), audit readiness.',
    outcome: 'Accurate, compliant payroll with full statutory coverage and zero missed deadlines.',
    icon: '◆',
    href: '/solutions',
    color: '#60A5FA',
  },
  {
    id: 'partner',
    label: 'Continuous HR Partner',
    tag: 'Sustain',
    problem: 'HR needs evolve as the business grows. A one-time intervention isn\'t enough.',
    system: 'Monthly advisory, quarterly reviews, employee pulse, HR metrics, management support.',
    outcome: 'An always-on HR function that strengthens as your business scales.',
    icon: '⬟',
    href: '/solutions',
    color: '#F472B6',
  },
];

const PROBLEMS = [
  { problem: 'Employees aren\'t performing', solution: 'Performance Reset', tag: 'Performance' },
  { problem: 'Employees keep leaving', solution: 'Retention & Engagement Program', tag: 'Retention' },
  { problem: 'We don\'t know if HR is working', solution: 'HR Health Check', tag: 'Audit' },
  { problem: 'Company growing but HR is messy', solution: 'HR Foundation Setup', tag: 'Foundation' },
  { problem: 'Managers don\'t manage people well', solution: 'Manager Enablement Program', tag: 'Managers' },
  { problem: 'Employees don\'t understand their roles', solution: 'Role & Responsibility Framework', tag: 'Structure' },
  { problem: 'Salary complaints are increasing', solution: 'Compensation & Benchmarking', tag: 'Compensation' },
  { problem: 'Employees are unhappy', solution: 'Employee Pulse & Engagement Study', tag: 'Experience' },
  { problem: 'We\'re restructuring the team', solution: 'People Transition Program', tag: 'Transition' },
  { problem: 'Growing from 20 to 100 employees', solution: 'People Scaling Program', tag: 'Scaling' },
  { problem: 'HR exists but systems are weak', solution: 'HR Function Development', tag: 'Development' },
];

const METHODOLOGY = [
  { n: '01', label: 'Diagnose', desc: 'Understand the current people system. Find the gaps, risks, and points of founder dependency.' },
  { n: '02', label: 'Design', desc: 'Design the HR infrastructure your business actually needs — not a generic template.' },
  { n: '03', label: 'Build', desc: 'Build the systems, processes, documentation and frameworks from scratch or from base.' },
  { n: '04', label: 'Embed', desc: 'Operate alongside the business and managers to ensure real adoption, not shelf documentation.' },
  { n: '05', label: 'Transfer', desc: 'Move ownership of people processes to internal managers and HR — deliberately, measurably.' },
  { n: '06', label: 'Measure', desc: 'Track HR independence, adoption, effectiveness and business impact with real metrics.' },
  { n: '07', label: 'Improve', desc: 'Continuously strengthen the people infrastructure as the company grows through stages.' },
];

const WHY_ITEMS = [
  { label: 'Problem-first', desc: 'We diagnose before recommending. You\'ll never receive a generic HR proposal.' },
  { label: 'System-first', desc: 'We build connected infrastructure — not isolated HR activities.' },
  { label: 'Manager-owned', desc: 'We move people responsibility to managers, not away from the founder toward a consultant.' },
  { label: 'Implementation-driven', desc: 'We don\'t stop at recommendations. We build and embed the systems ourselves.' },
  { label: 'Transfer-focused', desc: 'We build for independence — not permanent dependency on Spark Pro.' },
  { label: 'Measurable', desc: 'We track HR maturity and independence with quantifiable metrics, not vague progress reports.' },
];

export default function Home() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [activeProblem, setActiveProblem] = useState<number | null>(null);
  const [hoveredSolution, setHoveredSolution] = useState<string | null>(null);

  return (
    <main className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-grid"
        style={{ background: 'linear-gradient(160deg, #050A14 0%, #080F1E 60%, #0B1628 100%)' }}
      >
        {/* Background radial */}
        <div
          className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(43,127,255,0.07) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(43,127,255,0.04) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
                style={{ background: 'rgba(43,127,255,0.1)', border: '1px solid rgba(43,127,255,0.2)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2B7FFF] animate-pulse" />
                <span className="text-xs font-medium" style={{ color: '#60A5FA', fontFamily: "'Inter', sans-serif" }}>
                  People Infrastructure Company
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}
              >
                HR systems built to{' '}
                <span className="text-gradient">outgrow the founder.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-lg leading-relaxed mb-10 max-w-xl"
                style={{ color: 'rgba(226,232,244,0.65)', fontFamily: "'Inter', sans-serif" }}
              >
                Spark Pro helps growing businesses build the systems, processes and managers required to scale their workforce — without making the founder the centre of every people decision.
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
                  Check Your HR Score — Free
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
                  See How It Works
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6 mt-12"
              >
                {['Diagnose', 'Build', 'Embed', 'Transfer'].map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    {i > 0 && <span style={{ color: 'rgba(226,232,244,0.2)', fontSize: 10 }}>→</span>}
                    <span className="text-xs font-medium" style={{ color: 'rgba(226,232,244,0.4)', fontFamily: "'Inter', sans-serif" }}>{s}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Founder Viz */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                className="rounded-3xl p-8"
                style={{
                  background: 'rgba(11,22,40,0.6)',
                  border: '1px solid rgba(43,127,255,0.15)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-center" style={{ color: 'rgba(226,232,244,0.35)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  The Founder Dependency Problem → Structured Infrastructure
                </p>
                <FounderViz />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 02: THE PROBLEM ─── */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0A1F4D 0%, #0D2B6B 55%, #0A1F4D 100%)' }}
      >
        {/* Bright ambient glows */}
        <div
          className="absolute -top-24 left-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(96,165,250,0.35) 0%, transparent 70%)', transform: 'translateX(-50%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(43,127,255,0.3) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 relative">
          <RevealSection className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#7DD3FC', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              The Problem
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}>
              Is your founder still<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #7DD3FC 0%, #60A5FA 50%, #A5B4FC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                the HR department?
              </span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(240,247,255,0.88)', fontFamily: "'Inter', sans-serif" }}>
              Growing businesses often don't have an HR problem alone. They have a founder-dependent people system.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {SYMPTOMS.map((symptom, i) => (
              <RevealSection key={symptom} delay={i * 0.05}>
                <div
                  className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 group hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(147,197,253,0.35)',
                    boxShadow: '0 4px 24px rgba(10,31,77,0.35)',
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: '#FF6B6B', boxShadow: '0 0 12px rgba(255,107,107,0.9)' }}
                  />
                  <p className="text-sm leading-relaxed font-medium" style={{ color: 'rgba(255,255,255,0.95)', fontFamily: "'Inter', sans-serif" }}>
                    {symptom}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <div
              className="rounded-2xl p-10 text-center"
              style={{
                background: 'linear-gradient(135deg, #2B7FFF 0%, #1A6AFF 55%, #6366F1 100%)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 12px 60px rgba(43,127,255,0.45)',
              }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                That's not an HR system.
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#FDE68A' }}>
                That's HR dependency.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── SECTION 03: THE SHIFT ─── */}
      <section className="py-28 relative overflow-hidden" style={{ background: '#050A14' }}>
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-20">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              The Transformation
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}>
              From founder-dependent<br />to people infrastructure.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <RevealSection>
              <div
                className="rounded-3xl p-8 h-full"
                style={{ background: 'rgba(11,22,40,0.8)', border: '1px solid rgba(255,68,68,0.15)' }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#FF4444' }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#FF6666', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Before</span>
                </div>
                <div className="flex flex-col items-center gap-0">
                  {['Founder', 'Hiring', 'Employee Issues', 'Attendance', 'Performance', 'Payroll', 'Approvals', 'Escalations'].map((item, i) => (
                    <div key={item} className="flex flex-col items-center">
                      <div
                        className="px-6 py-3 rounded-xl text-sm font-medium text-center w-48"
                        style={{
                          background: i === 0 ? 'rgba(255,68,68,0.15)' : 'rgba(11,22,40,0.9)',
                          border: `1px solid ${i === 0 ? 'rgba(255,68,68,0.4)' : 'rgba(255,255,255,0.06)'}`,
                          color: i === 0 ? '#FF8888' : 'rgba(226,232,244,0.5)',
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {item}
                      </div>
                      {i < 7 && (
                        <div className="w-px h-5" style={{ background: 'rgba(255,68,68,0.3)' }} />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm mt-8" style={{ color: 'rgba(226,232,244,0.4)', fontFamily: "'Inter', sans-serif" }}>
                  Everything depends on one person.
                </p>
              </div>
            </RevealSection>

            {/* After */}
            <RevealSection delay={0.15}>
              <div
                className="rounded-3xl p-8 h-full"
                style={{ background: 'rgba(11,22,40,0.8)', border: '1px solid rgba(43,127,255,0.2)' }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#22C55E', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>After Spark Pro</span>
                </div>
                <div className="space-y-3">
                  {[
                    { role: 'Founder', owns: 'Business Direction', color: '#2B7FFF' },
                    { role: 'Managers', owns: 'People Ownership', color: '#22C55E' },
                    { role: 'HR Systems', owns: 'Processes + Governance', color: '#A78BFA' },
                    { role: 'Employees', owns: 'Clarity + Accountability', color: '#34D399' },
                    { role: 'Data', owns: 'Visibility + Decisions', color: '#60A5FA' },
                  ].map((item) => (
                    <div
                      key={item.role}
                      className="flex items-center justify-between p-4 rounded-xl"
                      style={{
                        background: `${item.color}10`,
                        border: `1px solid ${item.color}25`,
                      }}
                    >
                      <span className="text-sm font-semibold" style={{ color: item.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {item.role}
                      </span>
                      <span className="text-sm" style={{ color: 'rgba(226,232,244,0.6)', fontFamily: "'Inter', sans-serif" }}>
                        {item.owns}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm mt-8 font-medium" style={{ color: '#22C55E', fontFamily: "'Inter', sans-serif" }}>
                  A business that can grow without people management becoming chaotic.
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ─── SECTION 04: 9 LAYERS ─── */}
      <section className="py-28" style={{ background: '#020812' }}>
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              People Infrastructure Framework
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}>
              We build the HR system<br />behind your growth.
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(226,232,244,0.5)', fontFamily: "'Inter', sans-serif" }}>
              Nine interconnected layers of people infrastructure. Select any layer to explore its connections.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LAYERS.map((layer, i) => {
              const isActive = activeLayer === i;
              const isConnected = activeLayer !== null && LAYER_CONNECTIONS[activeLayer]?.includes(i);
              const isDimmed = activeLayer !== null && !isActive && !isConnected;

              return (
                <RevealSection key={layer.n} delay={i * 0.04}>
                  <motion.div
                    className="rounded-2xl p-6 cursor-pointer transition-all duration-300"
                    style={{
                      background: isActive
                        ? 'rgba(43,127,255,0.12)'
                        : isConnected
                        ? 'rgba(43,127,255,0.06)'
                        : 'rgba(11,22,40,0.7)',
                      border: isActive
                        ? '1px solid rgba(43,127,255,0.5)'
                        : isConnected
                        ? '1px solid rgba(43,127,255,0.25)'
                        : '1px solid rgba(43,127,255,0.08)',
                      opacity: isDimmed ? 0.35 : 1,
                      boxShadow: isActive ? '0 0 30px rgba(43,127,255,0.15)' : 'none',
                    }}
                    onClick={() => setActiveLayer(activeLayer === i ? null : i)}
                    whileHover={{ scale: isDimmed ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: isActive ? '#60A5FA' : 'rgba(43,127,255,0.4)', fontFamily: "'Inter', sans-serif" }}
                      >
                        {layer.n}
                      </span>
                      {isConnected && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(43,127,255,0.15)', color: '#60A5FA', fontFamily: "'Inter', sans-serif" }}>
                          connected
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold mb-2 text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {layer.label}
                    </h3>
                    <AnimatePresence>
                      {(isActive || isConnected) && (
                        <motion.p
                          className="text-sm"
                          style={{ color: 'rgba(226,232,244,0.6)', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {layer.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {!isActive && !isConnected && (
                      <p className="text-sm line-clamp-2" style={{ color: 'rgba(226,232,244,0.35)', fontFamily: "'Inter', sans-serif" }}>
                        {layer.desc}
                      </p>
                    )}
                  </motion.div>
                </RevealSection>
              );
            })}
          </div>

          {activeLayer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8"
            >
              <button
                onClick={() => setActiveLayer(null)}
                className="text-sm"
                style={{ color: 'rgba(226,232,244,0.3)', fontFamily: "'Inter', sans-serif" }}
              >
                Click any layer to deselect
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── SECTION 05: SOLUTIONS ─── */}
      <section className="py-28" style={{ background: '#050A14' }}>
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Solutions
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}>
              Build only what<br />your business needs.
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(226,232,244,0.5)', fontFamily: "'Inter', sans-serif" }}>
              We start with diagnosis, identify the real gaps, and implement the people systems required for your stage of growth.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {SOLUTIONS.slice(0, 6).map((sol, i) => (
              <RevealSection key={sol.id} delay={i * 0.07}>
                <div
                  className="rounded-2xl p-7 h-full cursor-default"
                  style={{
                    background: 'rgba(11,22,40,0.7)',
                    border: `1px solid ${hoveredSolution === sol.id ? sol.color + '35' : 'rgba(43,127,255,0.08)'}`,
                    transition: 'all 0.3s ease',
                    boxShadow: hoveredSolution === sol.id ? `0 0 30px ${sol.color}15` : 'none',
                  }}
                  onMouseEnter={() => setHoveredSolution(sol.id)}
                  onMouseLeave={() => setHoveredSolution(null)}
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-2xl" style={{ color: sol.color }}>{sol.icon}</span>
                    <span
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ background: `${sol.color}15`, color: sol.color, fontFamily: "'Inter', sans-serif" }}
                    >
                      {sol.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {sol.label}
                  </h3>

                  <AnimatePresence mode="wait">
                    {hoveredSolution === sol.id ? (
                      <motion.div
                        key="detail"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div>
                          <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: 'rgba(226,232,244,0.3)', fontFamily: "'Inter', sans-serif" }}>Problem</p>
                          <p className="text-sm" style={{ color: 'rgba(226,232,244,0.7)', fontFamily: "'Inter', sans-serif" }}>{sol.problem}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: 'rgba(226,232,244,0.3)', fontFamily: "'Inter', sans-serif" }}>Outcome</p>
                          <p className="text-sm" style={{ color: 'rgba(226,232,244,0.7)', fontFamily: "'Inter', sans-serif" }}>{sol.outcome}</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.p
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm leading-relaxed"
                        style={{ color: 'rgba(226,232,244,0.45)', fontFamily: "'Inter', sans-serif" }}
                      >
                        {sol.problem}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* 7th solution - full width */}
          <RevealSection delay={0.35}>
            <div
              className="rounded-2xl p-7"
              style={{
                background: 'rgba(11,22,40,0.7)',
                border: `1px solid ${hoveredSolution === 'partner' ? '#F472B635' : 'rgba(43,127,255,0.08)'}`,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={() => setHoveredSolution('partner')}
              onMouseLeave={() => setHoveredSolution(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-2xl" style={{ color: '#F472B6' }}>⬟</span>
                  <div>
                    <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: '#F472B615', color: '#F472B6', fontFamily: "'Inter', sans-serif" }}>Sustain</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Continuous HR Partner</h3>
                  <p className="text-sm" style={{ color: 'rgba(226,232,244,0.5)', fontFamily: "'Inter', sans-serif" }}>
                    Ongoing monthly advisory, quarterly reviews, employee pulse, HR metrics, and management support as your business grows.
                  </p>
                </div>
                <Link
                  href="/solutions"
                  className="flex-shrink-0 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: 'rgba(244,114,182,0.1)', color: '#F472B6', border: '1px solid rgba(244,114,182,0.2)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </RevealSection>

          <RevealSection className="text-center mt-10">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold transition-all"
              style={{
                background: '#2B7FFF',
                color: '#fff',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: '0 0 25px rgba(43,127,255,0.3)',
              }}
            >
              See All Solutions →
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ─── SECTION 06: PROBLEM SELECTOR ─── */}
      <section className="py-28" style={{ background: '#020812' }}>
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Business Challenges
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}>
              Which challenge<br />are you facing?
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              {PROBLEMS.map((p, i) => (
                <RevealSection key={p.problem} delay={i * 0.04}>
                  <button
                    className="w-full text-left p-5 rounded-2xl transition-all duration-200"
                    style={{
                      background: activeProblem === i ? 'rgba(43,127,255,0.1)' : 'rgba(11,22,40,0.6)',
                      border: activeProblem === i ? '1px solid rgba(43,127,255,0.35)' : '1px solid rgba(43,127,255,0.08)',
                    }}
                    onClick={() => setActiveProblem(activeProblem === i ? null : i)}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium" style={{ color: activeProblem === i ? '#E2E8F4' : 'rgba(226,232,244,0.6)', fontFamily: "'Inter', sans-serif" }}>
                        {p.problem}
                      </p>
                      <span className="text-xs px-2.5 py-1 rounded-full flex-shrink-0 ml-3" style={{ background: 'rgba(43,127,255,0.1)', color: '#60A5FA', fontFamily: "'Inter', sans-serif" }}>
                        {p.tag}
                      </span>
                    </div>
                  </button>
                </RevealSection>
              ))}
            </div>

            <div className="lg:sticky lg:top-32 h-fit">
              <AnimatePresence mode="wait">
                {activeProblem !== null ? (
                  <motion.div
                    key={activeProblem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-3xl p-10"
                    style={{
                      background: 'rgba(11,22,40,0.8)',
                      border: '1px solid rgba(43,127,255,0.2)',
                      boxShadow: '0 0 40px rgba(43,127,255,0.08)',
                    }}
                  >
                    <div className="mb-6">
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        The Problem
                      </span>
                      <h3 className="text-xl font-bold text-white mt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {PROBLEMS[activeProblem].problem}
                      </h3>
                    </div>
                    <div
                      className="h-px mb-6"
                      style={{ background: 'rgba(43,127,255,0.15)' }}
                    />
                    <div className="mb-6">
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#22C55E', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Spark Pro Response
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {PROBLEMS[activeProblem].solution}
                      </h3>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href="/contact"
                        className="px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                        style={{ background: '#2B7FFF', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Start Here
                      </Link>
                      <Link
                        href="/how-we-work"
                        className="px-5 py-3 rounded-xl text-sm font-medium"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(226,232,244,0.7)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: "'Inter', sans-serif" }}
                      >
                        See How It Works
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-3xl p-10 flex flex-col items-center justify-center"
                    style={{
                      background: 'rgba(11,22,40,0.5)',
                      border: '1px solid rgba(43,127,255,0.08)',
                      minHeight: 300,
                    }}
                  >
                    <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center" style={{ background: 'rgba(43,127,255,0.1)', border: '1px solid rgba(43,127,255,0.2)' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v6l4 2" stroke="#2B7FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="10" cy="10" r="8" stroke="#2B7FFF" strokeWidth="1.5" /></svg>
                    </div>
                    <p className="text-sm text-center" style={{ color: 'rgba(226,232,244,0.35)', fontFamily: "'Inter', sans-serif" }}>
                      Select a challenge on the left to see the Spark Pro response.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 07: METHODOLOGY ─── */}
      <section className="py-28 overflow-hidden" style={{ background: '#050A14' }}>
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-20">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Methodology
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}>
              We don't just deliver HR.<br />We transfer ownership.
            </h2>
          </RevealSection>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(43,127,255,0.3) 10%, rgba(43,127,255,0.3) 90%, transparent)' }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6">
              {METHODOLOGY.map((step, i) => (
                <RevealSection key={step.n} delay={i * 0.08}>
                  <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 relative z-10"
                      style={{
                        background: 'rgba(11,22,40,0.9)',
                        border: '1px solid rgba(43,127,255,0.25)',
                        boxShadow: '0 0 20px rgba(43,127,255,0.1)',
                      }}
                    >
                      <span className="text-sm font-bold" style={{ color: '#2B7FFF', fontFamily: "'Inter', sans-serif" }}>{step.n}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {step.label}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,244,0.45)', fontFamily: "'Inter', sans-serif" }}>
                      {step.desc}
                    </p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>

          <RevealSection className="text-center mt-16">
            <Link
              href="/how-we-work"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-medium"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(226,232,244,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              See the Full Methodology →
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* ─── SECTION 08: TRANSFORMATION JOURNEY ─── */}
      <section className="py-28" style={{ background: '#020812' }}>
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-20">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              The Journey
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}>
              Build. Operate.<br />Handover. Partner.
            </h2>
          </RevealSection>

          <div className="space-y-3">
            {[
              { stage: '01', label: 'Fragmented People Processes', desc: 'The business enters with inconsistent decisions, founder dependency, and ad-hoc people management.', state: 'Current State', color: '#FF4444' },
              { stage: '02', label: 'Diagnose the Gaps', desc: 'Spark Pro maps the current people system, identifies risks, and quantifies founder dependency with the HR Independence Assessment.', state: 'Diagnosis', color: '#F59E0B' },
              { stage: '03', label: 'Build the Infrastructure', desc: 'We design and build policies, processes, systems, and documentation — structured for your current stage and future scale.', state: 'Build', color: '#2B7FFF' },
              { stage: '04', label: 'Operate Alongside the Business', desc: 'Spark Pro embeds into the team, supporting managers and employees through the transition to structured people management.', state: 'Embed', color: '#A78BFA' },
              { stage: '05', label: 'Managers Begin Owning', desc: 'People responsibility transfers to managers progressively. Decision rights become clear. Escalations reduce dramatically.', state: 'Transfer', color: '#22C55E' },
              { stage: '06', label: 'Ownership Transferred', desc: 'Internal managers and HR own the people system. Spark Pro measures adoption, effectiveness, and HR independence score.', state: 'Measure', color: '#34D399' },
              { stage: '07', label: 'Long-Term HR Partnership', desc: 'Spark Pro becomes a strategic partner — advising, reviewing, and strengthening the people system as the business scales.', state: 'Partner', color: '#60A5FA' },
            ].map((item, i) => (
              <RevealSection key={item.stage} delay={i * 0.06}>
                <div
                  className="flex items-start gap-6 p-6 rounded-2xl"
                  style={{
                    background: 'rgba(11,22,40,0.6)',
                    border: '1px solid rgba(43,127,255,0.08)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                  >
                    <span className="text-xs font-bold" style={{ color: item.color, fontFamily: "'Inter', sans-serif" }}>{item.stage}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.label}</h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ background: `${item.color}12`, color: item.color, fontFamily: "'Inter', sans-serif" }}>{item.state}</span>
                    </div>
                    <p className="text-sm" style={{ color: 'rgba(226,232,244,0.5)', fontFamily: "'Inter', sans-serif" }}>{item.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
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

      {/* ─── SECTION 09: HR INDEPENDENCE INDEX ─── */}
      <section className="py-28 relative overflow-hidden" style={{ background: '#050A14' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                HR Independence Index
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}>
                How independent is your HR function?
              </h2>
              <p className="text-lg mb-8" style={{ color: 'rgba(226,232,244,0.55)', fontFamily: "'Inter', sans-serif" }}>
                Our HR Independence Audit assesses nine dimensions of your people system — and gives you a clear picture of where your business is today and what needs to change.
              </p>
              <div className="space-y-3 mb-10">
                {['Founder Dependency', 'Process Maturity', 'Manager Ownership', 'HR Governance', 'Employee Lifecycle', 'Performance Systems', 'Documentation', 'Compliance Readiness', 'People Data'].map((dim, dimIdx) => (
                  <div
                    key={dim}
                    className="flex items-center gap-4"
                  >
                    <span className="text-sm flex-1" style={{ color: 'rgba(226,232,244,0.6)', fontFamily: "'Inter', sans-serif" }}>{dim}</span>
                    <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(43,127,255,0.1)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${[52, 34, 61, 45, 38, 66, 41, 57, 48][dimIdx]}%`,
                          background: 'linear-gradient(90deg, #2B7FFF, #60A5FA)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs mb-6" style={{ color: 'rgba(226,232,244,0.3)', fontFamily: "'Inter', sans-serif" }}>
                Illustrative only — your actual score is based on our structured assessment.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-base font-semibold"
                style={{ background: '#2B7FFF', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: '0 0 25px rgba(43,127,255,0.3)' }}
              >
                Check Your HR Score — Free →
              </Link>
            </RevealSection>

            <RevealSection delay={0.2}>
              <div
                className="rounded-3xl p-10"
                style={{
                  background: 'rgba(11,22,40,0.7)',
                  border: '1px solid rgba(43,127,255,0.15)',
                }}
              >
                <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'rgba(226,232,244,0.3)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Output</p>
                <div className="flex flex-col items-center text-center mb-8">
                  <div
                    className="w-36 h-36 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: 'conic-gradient(#2B7FFF 0% 42%, rgba(43,127,255,0.1) 42% 100%)',
                      padding: 4,
                    }}
                  >
                    <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: '#050A14' }}>
                      <div className="text-center">
                        <span className="block text-4xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>42</span>
                        <span className="text-xs" style={{ color: '#2B7FFF', fontFamily: "'Inter', sans-serif" }}>/ 100</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>HR Independence Score</p>
                  <p className="text-sm" style={{ color: '#F59E0B', fontFamily: "'Inter', sans-serif" }}>Moderate Dependency — Structured build recommended</p>
                </div>

                <div className="space-y-3">
                  {['Gap Report', 'Priority Roadmap', 'Recommended Engagement Model'].map((output) => (
                    <div
                      key={output}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: 'rgba(43,127,255,0.07)', border: '1px solid rgba(43,127,255,0.12)' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#22C55E' }} />
                      <span className="text-sm" style={{ color: 'rgba(226,232,244,0.7)', fontFamily: "'Inter', sans-serif" }}>{output}</span>
                    </div>
                  ))}
                </div>

                <p className="text-center text-xs mt-6" style={{ color: 'rgba(226,232,244,0.25)', fontFamily: "'Inter', sans-serif" }}>
                  Illustrative score and output structure. Results are based on your actual assessment.
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ─── SECTION 10+11: FOR STARTUPS & SMES ─── */}
      <section className="py-28" style={{ background: '#020812' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealSection>
              <div
                className="rounded-3xl p-10 h-full flex flex-col"
                style={{ background: 'rgba(11,22,40,0.8)', border: '1px solid rgba(43,127,255,0.12)' }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(43,127,255,0.12)' }}>
                    <span className="text-sm">🚀</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#60A5FA', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Startups</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Build HR before growth makes it complicated.
                </h3>
                <p className="text-sm leading-relaxed mb-8 flex-1" style={{ color: 'rgba(226,232,244,0.5)', fontFamily: "'Inter', sans-serif" }}>
                  For startups, the right time to build HR systems is before the chaos compounds. Spark Pro helps you establish the foundation that lets you hire, manage, and grow without founder dependency from day one.
                </p>
                <Link
                  href="/for-startups"
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Build Your HR Foundation →
                </Link>
              </div>
            </RevealSection>

            <RevealSection delay={0.1}>
              <div
                className="rounded-3xl p-10 h-full flex flex-col"
                style={{ background: 'rgba(11,22,40,0.8)', border: '1px solid rgba(43,127,255,0.12)' }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(43,127,255,0.12)' }}>
                    <span className="text-sm">📈</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#60A5FA', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>SMEs</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Your business has grown. Your HR system should too.
                </h3>
                <p className="text-sm leading-relaxed mb-8 flex-1" style={{ color: 'rgba(226,232,244,0.5)', fontFamily: "'Inter', sans-serif" }}>
                  Growing businesses that already have employees and some HR activity need structured systems — not more policies. Spark Pro diagnoses what's missing and builds what your business actually needs at this stage.
                </p>
                <Link
                  href="/for-smes"
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Scale Your People System →
                </Link>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ─── SECTION 12: WHY SPARK PRO ─── */}
      <section className="py-28" style={{ background: '#050A14' }}>
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Why Spark Pro
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}>
              A different way<br />to build HR.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_ITEMS.map((item, i) => (
              <RevealSection key={item.label} delay={i * 0.07}>
                <div
                  className="p-7 rounded-2xl h-full"
                  style={{
                    background: 'rgba(11,22,40,0.6)',
                    border: '1px solid rgba(43,127,255,0.08)',
                  }}
                >
                  <div className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center" style={{ background: 'rgba(43,127,255,0.1)', border: '1px solid rgba(43,127,255,0.2)' }}>
                    <div className="w-2 h-2 rounded-sm" style={{ background: '#2B7FFF' }} />
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
                Ready to Start?
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Your business is growing.<br />
                <span className="text-gradient">Is your HR growing with it?</span>
              </h2>
              <p className="text-lg mb-10" style={{ color: 'rgba(226,232,244,0.55)', fontFamily: "'Inter', sans-serif" }}>
                Let's identify where your people system is holding the business back — and what needs to change.
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
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-medium"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(226,232,244,0.8)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Talk to Spark Pro
                </Link>
              </div>
              <p className="mt-10 text-sm font-medium" style={{ color: 'rgba(43,127,255,0.5)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Build HR. Reduce Founder Dependency.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
