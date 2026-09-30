'use client';

import Link from 'next/link';

const solutions = [
  { label: 'HR Independence Audit', href: '/solutions' },
  { label: 'HR Foundation Build', href: '/solutions' },
  { label: 'People Operating System', href: '/solutions' },
  { label: 'Manager Enablement', href: '/solutions' },
  { label: 'Performance & Retention', href: '/solutions' },
  { label: 'Payroll & Compliance', href: '/solutions' },
  { label: 'Continuous HR Partner', href: '/solutions' },
];

const company = [
  { label: 'About', href: '/about' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'For Startups', href: '/for-startups' },
  { label: 'For SMEs', href: '/for-smes' },
  { label: 'Insights', href: '/insights' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#020812', borderTop: '1px solid rgba(43,127,255,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
<img src="/logo.png" alt="Spark Pro" style={{ height: 72, width: "auto" }} />
</Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'rgba(226,232,244,0.5)', fontFamily: "'Inter', sans-serif" }}>
              A people infrastructure company helping growing businesses build HR systems, processes and managers that allow the business to scale without becoming dependent on the founder.
            </p>
            <div className="inline-block px-4 py-2 rounded-lg text-xs font-medium" style={{ background: 'rgba(43,127,255,0.1)', color: '#60A5FA', border: '1px solid rgba(43,127,255,0.2)', fontFamily: "'Inter', sans-serif" }}>
              Build HR. Reduce Founder Dependency.
            </div>
          </div>

          {/* Solutions */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'rgba(226,232,244,0.4)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Solutions</p>
            <ul className="space-y-3">
              {solutions.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'rgba(226,232,244,0.55)', fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#E2E8F4'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgba(226,232,244,0.55)'}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'rgba(226,232,244,0.4)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Company</p>
            <ul className="space-y-3">
              {company.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'rgba(226,232,244,0.55)', fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#E2E8F4'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgba(226,232,244,0.55)'}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs" style={{ color: 'rgba(226,232,244,0.3)', fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} Spark Pro. People Infrastructure Company.
          </p>
          <p className="text-xs font-medium" style={{ color: 'rgba(43,127,255,0.6)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            HR systems built to outgrow the founder.
          </p>
        </div>
      </div>
    </footer>
  );
}
