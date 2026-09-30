'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'For Startups', href: '/for-startups' },
  { label: 'For SMEs', href: '/for-smes' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/careers' ? pathname.startsWith('/careers') : pathname === href);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="mx-auto max-w-7xl rounded-2xl transition-all duration-500"
          style={{
            background: scrolled
              ? 'rgba(5, 10, 20, 0.85)'
              : 'rgba(5, 10, 20, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(43, 127, 255, 0.12)',
            boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
<img src="/logo.png" alt="Spark Pro" style={{ height: 64, width: "auto" }} />
</Link>

            {/* Desktop Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: isActive(l.href) ? '#60A5FA' : 'rgba(226,232,244,0.7)',
                    background: isActive(l.href) ? 'rgba(43,127,255,0.1)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(l.href)) {
                      (e.target as HTMLElement).style.color = '#E2E8F4';
                      (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(l.href)) {
                      (e.target as HTMLElement).style.color = 'rgba(226,232,244,0.7)';
                      (e.target as HTMLElement).style.background = 'transparent';
                    }
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  background: '#2B7FFF',
                  color: '#ffffff',
                  boxShadow: '0 0 20px rgba(43,127,255,0.3)',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = '#1A6AFF';
                  (e.target as HTMLElement).style.boxShadow = '0 0 30px rgba(43,127,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = '#2B7FFF';
                  (e.target as HTMLElement).style.boxShadow = '0 0 20px rgba(43,127,255,0.3)';
                }}
              >
                Check Your HR Independence
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-0.5 bg-white rounded-full"
                style={{ width: 22 }}
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block h-0.5 bg-white rounded-full"
                style={{ width: 22 }}
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 bg-white rounded-full"
                style={{ width: 22 }}
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-navy-950" style={{ background: 'rgba(2,8,18,0.98)', backdropFilter: 'blur(20px)' }} />
            <motion.div
              className="relative z-10 flex flex-col justify-center px-8 h-full"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ delay: 0.05 }}
            >
              <Link href="/" className="flex items-center gap-3 mb-12">
<img src="/logo.png" alt="Spark Pro" style={{ height: 64, width: "auto" }} />
</Link>
              <nav className="flex flex-col gap-2">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={l.href}
                      className="block py-4 text-2xl font-semibold text-white border-b border-white/5"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Link
                  href="/contact"
                  className="block w-full text-center py-4 rounded-xl text-base font-semibold text-white"
                  style={{ background: '#2B7FFF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Check Your HR Independence
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
