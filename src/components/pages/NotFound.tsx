'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cs-bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Orbs */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', top: '-10%', left: '-10%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(43,127,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '400px', height: '400px', bottom: '-10%', right: '-5%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,84,214,0.07) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', padding: '2rem', position: 'relative' }}>
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(6rem, 18vw, 11rem)',
          lineHeight: 1,
          background: 'linear-gradient(90deg, #60A5FA 0%, #60A5FA 40%, #60A5FA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: 0.2,
          userSelect: 'none',
          letterSpacing: '-0.04em',
          marginBottom: '0.5rem',
        }}>
          404
        </div>
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
          marginBottom: '1rem',
          color: 'var(--cs-text)',
          letterSpacing: '-0.02em',
        }}>
          Page Not Found
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          color: 'var(--cs-text-2)',
          fontSize: '1.0625rem',
          lineHeight: 1.7,
          maxWidth: '28rem',
          margin: '0 auto 2.5rem',
        }}>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '0.875rem 1.75rem', borderRadius: '0.5rem',
              background: '#2B7FFF',
              color: '#FFFFFF', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.9375rem',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(43,127,255,0.25)',
              transition: 'box-shadow 0.25s, filter 0.25s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 6px 32px rgba(43,127,255,0.35)';
              e.currentTarget.style.filter = 'brightness(1.1)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(43,127,255,0.25)';
              e.currentTarget.style.filter = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Home size={17} />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '0.875rem 1.75rem', borderRadius: '0.5rem',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--cs-text)',
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.9375rem',
              cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(43,127,255,0.3)';
              e.currentTarget.style.background = 'rgba(43,127,255,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
          >
            <ArrowLeft size={17} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
