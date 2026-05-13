'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Linkedin, Facebook, Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ background: 'var(--cs-bg-2)', borderTop: '1px solid var(--cs-border)' }}>
      {/* Top gradient band */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, #1282AE 0%, #1EC8A8 50%, #80CC30 100%)',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10" style={{ marginBottom: '3rem' }}>

          {/* Company Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Link href="/" style={{ display: 'inline-block' }}>
              <img
                src="/logo.png"
                alt="Spark Pro"
                style={{ height: '60px', width: 'auto' }}
              />
            </Link>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--cs-text-2)', maxWidth: '240px' }}>
              Integrated business solutions combining HR infrastructure, custom software development, and AI automation.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { href: 'https://www.linkedin.com/company/sparkpro/?viewAsMember=true', Icon: Linkedin },
                { href: 'https://www.facebook.com/share/1F4Q9hLkvK/', Icon: Facebook },
                { href: 'https://www.instagram.com/spark_pro_sp?igsh=a2xpemt4cnZ2YjIy', Icon: Instagram },
                { href: 'https://wa.me/917598686212', Icon: MessageCircle },
              ].map(({ href, Icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0.5rem',
                    background: 'var(--cs-ghost-bg)',
                    border: '1px solid var(--cs-ghost-border)',
                    color: 'var(--cs-text-2)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(18,130,174,0.12)';
                    e.currentTarget.style.borderColor = 'rgba(18,130,174,0.3)';
                    e.currentTarget.style.color = '#A78BFA';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(99,102,241,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--cs-ghost-bg)';
                    e.currentTarget.style.borderColor = 'var(--cs-ghost-border)';
                    e.currentTarget.style.color = 'var(--cs-text-2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontFamily: "'Mulish', sans-serif",
              fontWeight: 700,
              fontSize: '0.6875rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #4DC8E8, #1EC8A8, #80CC30)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.25rem',
            }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/services', label: 'Services' },
                { to: '/careers', label: 'Careers' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}><Link href={to} className="cs-footer-link">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 style={{
              fontFamily: "'Mulish', sans-serif",
              fontWeight: 700,
              fontSize: '0.6875rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #4DC8E8, #1EC8A8, #80CC30)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.25rem',
            }}>
              Services
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { to: '/services#hr-services', label: 'HR Services' },
                { to: '/services#it-services', label: 'IT Services' },
                { to: '/services#ai-services', label: 'AI Services' },
                { to: '/contact', label: 'Get Started' },
              ].map(({ to, label }) => (
                <li key={to}><Link href={to} className="cs-footer-link">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{
              fontFamily: "'Mulish', sans-serif",
              fontWeight: 700,
              fontSize: '0.6875rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #4DC8E8, #1EC8A8, #80CC30)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.25rem',
            }}>
              Contact
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { Icon: Mail, text: 'info@sparkpro.in' },
                { Icon: Phone, text: '+91-75986 86212' },
                { Icon: MapPin, text: 'Trichy, Tamilnadu - 620012' },
                { Icon: Clock, text: 'Mon–Sat, 9:30 AM – 6:30 PM' },
              ].map(({ Icon, text }, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--cs-text-2)' }}>
                  <Icon size={14} style={{ marginTop: '0.2rem', flexShrink: 0, color: '#1EC8A8' }} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--cs-border)',
          paddingTop: '1.5rem',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--cs-light)' }}>
            &copy; {new Date().getFullYear()} Spark Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
