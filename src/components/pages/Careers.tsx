'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Briefcase, TrendingUp, Users, Heart, ChevronRight, Loader2 } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  location: string;
  experience: string;
  salary_range: string | null;
  created_at: string;
}

export function Careers() {
  const [jobs, setJobs]       = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/jobs')
      .then(r => r.json())
      .then(d => setJobs(d.jobs || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const locations = [...new Set(jobs.map(j => j.location))];

  return (
    <div style={{ background: 'var(--cs-bg)', minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '7rem 1.5rem 5rem', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
            width: '600px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(18,130,174,0.15) 0%, transparent 70%)',
          }} />
        </div>

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem', borderRadius: '100px',
            background: 'rgba(18,130,174,0.1)', border: '1px solid rgba(18,130,174,0.25)',
            marginBottom: '1.5rem',
          }}>
            <Users size={13} style={{ color: '#4DC8E8' }} />
            <span style={{ fontSize: '0.75rem', fontFamily: "'Mulish', sans-serif", fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4DC8E8' }}>
              Join Our Team
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Exo 2', sans-serif", fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1,
            marginBottom: '1.25rem', color: 'var(--cs-text)',
          }}>
            Build the Future with{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1282AE 0%, #1EC8A8 50%, #80CC30 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Spark Pro
            </span>
          </h1>

          <p style={{
            fontFamily: "'Mulish', sans-serif", fontSize: '1.0625rem', lineHeight: 1.8,
            color: 'var(--cs-text-2)', maxWidth: '560px', margin: '0 auto 2.5rem',
          }}>
            Join a team that&#39;s reshaping how businesses operate — through HR innovation, cutting-edge software, and intelligent automation.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
            {[
              { icon: Briefcase,  label: 'Open Positions', value: `${jobs.length}` },
              { icon: MapPin,     label: 'Locations',      value: `${locations.length}` },
              { icon: Heart,      label: 'Great Culture',  value: '100%' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                  <Icon size={14} style={{ color: '#1EC8A8' }} />
                  <span style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '1.5rem', color: 'var(--cs-text)' }}>{value}</span>
                </div>
                <span style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.8125rem', color: '#6B8CAE' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Job Listings ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem', gap: '0.75rem', color: '#6B8CAE', fontFamily: "'Mulish', sans-serif" }}>
            <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
            Loading open positions…
          </div>
        ) : jobs.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '5rem 1rem',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem',
          }}>
            <Briefcase size={40} style={{ color: '#1E2D45', margin: '0 auto 1rem' }} />
            <p style={{ fontFamily: "'Exo 2', sans-serif", fontSize: '1.25rem', fontWeight: 700, color: '#3D5570', marginBottom: '0.5rem' }}>
              No open positions right now
            </p>
            <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.9rem', color: '#4A6080' }}>
              Check back soon — we&#39;re always growing.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {jobs.map((job, index) => (
              <JobRow key={job.id} job={job} index={index} />
            ))}
          </div>
        )}
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function JobRow({ job, index }: { job: Job; index: number }) {
  return (
    <Link href={`/careers/${job.id}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '0.875rem',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          cursor: 'pointer',
          transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = 'rgba(18,130,174,0.35)';
          el.style.background  = 'rgba(18,130,174,0.05)';
          el.style.boxShadow   = '0 4px 24px rgba(18,130,174,0.1)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = 'rgba(255,255,255,0.07)';
          el.style.background  = 'rgba(255,255,255,0.025)';
          el.style.boxShadow   = 'none';
        }}
      >
        {/* Left: number + title + meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1, minWidth: 0 }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '0.5rem', flexShrink: 0,
            background: 'rgba(18,130,174,0.1)', border: '1px solid rgba(18,130,174,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '0.8125rem', color: '#4DC8E8',
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: "'Exo 2', sans-serif", fontWeight: 700,
              fontSize: '1rem', color: 'var(--cs-text)', lineHeight: 1.3,
              marginBottom: '0.375rem',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {job.title}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <MetaChip icon={MapPin}    text={job.location} />
              <MetaChip icon={Briefcase} text={job.experience} />
              {job.salary_range && <MetaChip icon={TrendingUp} text={job.salary_range} />}
            </div>
          </div>
        </div>

        <ChevronRight size={16} style={{ color: '#2A4560', flexShrink: 0 }} />
      </div>
    </Link>
  );
}

function MetaChip({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      fontSize: '0.8125rem', fontFamily: "'Mulish', sans-serif", color: '#6B8CAE',
    }}>
      <Icon size={12} style={{ color: '#1282AE', flexShrink: 0 }} />
      {text}
    </span>
  );
}
