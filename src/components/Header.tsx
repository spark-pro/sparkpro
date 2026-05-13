'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(11,15,30,0.96)' : 'rgba(11,15,30,0.75)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      transition: 'background 0.3s ease, box-shadow 0.3s ease',
      boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
    }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.png"
              alt="Spark Pro"
              style={{ height: '64px', width: 'auto' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center" style={{ gap: '2.25rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`cs-nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem 1.375rem',
                borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #1282AE 0%, #0A917A 52%, #4E8A1A 100%)',
                color: '#FFFFFF',
                fontFamily: "'Mulish', sans-serif",
                fontWeight: 700,
                fontSize: '0.875rem',
                textDecoration: 'none',
                border: 'none',
                transition: 'box-shadow 0.25s, filter 0.25s, transform 0.2s',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                boxShadow: '0 4px 20px rgba(18,130,174,0.25)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 6px 28px rgba(18,130,174,0.35)';
                e.currentTarget.style.filter = 'brightness(1.1)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(18,130,174,0.25)';
                e.currentTarget.style.filter = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              cursor: 'pointer',
              color: '#E8EDFF',
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden cs-mobile-menu" style={{ padding: '1rem 0 1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    fontFamily: "'Mulish', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    color: isActive(link.path) ? '#E8EDFF' : '#A0B8D8',
                    background: isActive(link.path) ? 'rgba(18,130,174,0.1)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'block',
                  marginTop: '0.625rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  background: 'linear-gradient(135deg, #1282AE 0%, #0A917A 52%, #4E8A1A 100%)',
                  color: '#FFFFFF',
                  fontFamily: "'Mulish', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
