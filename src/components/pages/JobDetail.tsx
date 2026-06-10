'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, MapPin, Clock, CheckCircle2,
  Upload, X, Loader2, ChevronRight, DollarSign, Briefcase,
} from 'lucide-react';

interface Job {
  id: number;
  title: string;
  location: string;
  experience: string;
  salaryRange: string | null;
  description: string;
  requirements: string[];
  benefits: string[];
  createdAt: string;
}

interface AppForm {
  full_name: string;
  email: string;
  phone: string;
}

const EMPTY_FORM: AppForm = {
  full_name: '', email: '', phone: '',
};

export function JobDetail({ jobId }: { jobId: number }) {
  const [job, setJob]             = useState<Job | null>(null);
  const [loading, setLoading]     = useState(true);
  const [notFound, setNotFound]   = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`/api/jobs/${jobId}`)
      .then(r => { if (r.status === 404) { setNotFound(true); return null; } return r.json(); })
      .then(d => d && setJob(d.job))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [jobId]);

  if (loading) return <LoadingState />;
  if (notFound || !job) return <NotFoundState />;

  return (
    <>
      <div style={{ background: 'var(--cs-bg)', minHeight: '100vh' }}>
        {/* ── Top gradient bar ─────────────────────────────────── */}
        <div style={{ height: '2px', background: 'linear-gradient(90deg, #1282AE, #1EC8A8, #80CC30)' }} />

        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
          {/* Back */}
          <Link href="/careers" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            color: '#6B8CAE', fontFamily: "'Mulish', sans-serif", fontSize: '0.875rem',
            textDecoration: 'none', marginBottom: '2rem',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#4DC8E8'}
            onMouseLeave={e => e.currentTarget.style.color = '#6B8CAE'}
          >
            <ArrowLeft size={15} /> Back to Careers
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'start', flexWrap: 'wrap' }}>
            {/* Left: header */}
            <div>
              <h1 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: 'var(--cs-text)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
                {job.title}
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <TagItem icon={MapPin}    text={job.location} />
                <TagItem icon={Clock}     text={job.experience} highlight />
                {job.salaryRange && <TagItem icon={DollarSign} text={job.salaryRange} />}
              </div>
            </div>

            {/* Apply CTA */}
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '0.6rem',
                background: 'linear-gradient(135deg, #1282AE 0%, #0A917A 52%, #4E8A1A 100%)',
                color: '#fff',
                fontFamily: "'Mulish', sans-serif",
                fontWeight: 700, fontSize: '0.9375rem',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(18,130,174,0.3)',
                whiteSpace: 'nowrap',
                transition: 'filter 0.2s, transform 0.2s',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.12)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Apply Now <ChevronRight size={16} />
            </button>
          </div>

          {/* ── Content ─────────────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '2.5rem' }}>
            <Section title="About This Role">
              <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.9375rem', color: 'var(--cs-text-2)', lineHeight: 1.8 }}>{job.description}</p>
            </Section>

            {job.requirements?.length > 0 && (
              <Section title="Requirements">
                <BulletList items={job.requirements} />
              </Section>
            )}

            {job.benefits?.length > 0 && (
              <Section title="What We Offer">
                <BulletList items={job.benefits} accent />
              </Section>
            )}
          </div>

          {/* Bottom CTA */}
          <div style={{
            marginTop: '3rem', padding: '2rem', borderRadius: '1rem', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(18,130,174,0.08), rgba(10,145,122,0.06))',
            border: '1px solid rgba(18,130,174,0.15)',
          }}>
            <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '1.25rem', color: 'var(--cs-text)', marginBottom: '0.5rem' }}>
              Ready to join us?
            </h3>
            <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.9rem', color: '#6B8CAE', marginBottom: '1.25rem' }}>
              Submit your application and we&#39;ll get back to you within 3-5 business days.
            </p>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '0.6rem',
                background: 'linear-gradient(135deg, #1282AE 0%, #0A917A 52%, #4E8A1A 100%)',
                color: '#fff',
                fontFamily: "'Mulish', sans-serif",
                fontWeight: 700, fontSize: '0.9375rem',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(18,130,174,0.3)',
              }}
            >
              Apply for This Position
            </button>
          </div>
        </div>
      </div>

      {/* ── Application Modal ─────────────────────────────────── */}
      {showModal && <ApplicationModal job={job} onClose={() => setShowModal(false)} />}
    </>
  );
}

// ── Application Modal ──────────────────────────────────────────────────────

function ApplicationModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [form, setForm]         = useState<AppForm>(EMPTY_FORM);
  const [resume, setResume]     = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSub]    = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) validateAndSetFile(f);
  };

  const validateAndSetFile = (f: File) => {
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(f.type)) { setError('Resume must be PDF, DOC, or DOCX'); return; }
    if (f.size > 5 * 1024 * 1024)  { setError('File must be under 5 MB'); return; }
    setError(''); setResume(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    if (!form.full_name.trim()) { setError('Full name is required'); return; }
    if (!form.email.trim())     { setError('Email is required'); return; }
    if (!form.phone.trim())     { setError('Phone is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Invalid email address'); return; }

    const fd = new FormData();
    fd.append('job_id', String(job.id));
    fd.append('full_name', form.full_name);
    fd.append('email', form.email);
    fd.append('phone', form.phone);
    if (resume) fd.append('resume', resume);

    try {
      setSub(true);
      const res = await fetch('/api/applications', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Submission failed'); return; }
      setSuccess(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSub(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(4,8,18,0.88)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '2rem 1rem',
      overflowY: 'auto',
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: '100%', maxWidth: '680px',
        background: '#0F1628',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        marginTop: '1rem',
      }}>
        {/* Modal header */}
        <div style={{
          padding: '1.5rem 1.75rem',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(18,130,174,0.05)',
        }}>
          <div>
            <div style={{ fontSize: '0.6875rem', fontFamily: "'Mulish', sans-serif", fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1EC8A8', marginBottom: '0.25rem' }}>
              Apply Now
            </div>
            <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '1.125rem', color: 'var(--cs-text)', margin: 0 }}>
              {job.title}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.4rem', cursor: 'pointer', color: 'var(--cs-text-2)', lineHeight: 0 }}>
            <X size={18} />
          </button>
        </div>

        {success ? (
          <SuccessState onClose={onClose} jobTitle={job.title} />
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '1.75rem' }}>
            {/* Error banner */}
            {error && (
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '0.5rem', color: '#F87171', fontFamily: "'Mulish', sans-serif", fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                {error}
              </div>
            )}

            {/* ── Personal Info ──────────────────────────────── */}
            <FormSection title="Personal Information">
              <FormField label="Full Name *"     value={form.full_name} onChange={v => setForm(f => ({ ...f, full_name: v }))} placeholder="John Doe" fullWidth />
              <div style={rowStyle}>
                <FormField label="Email Address *" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="john@example.com" />
                <FormField label="Phone Number *"  type="tel"   value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} placeholder="+91 98765 43210" />
              </div>
            </FormSection>

            {/* ── Resume Upload ──────────────────────────────── */}
            <FormSection title="Resume / CV">
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) validateAndSetFile(f); }}
              />
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${dragOver ? 'rgba(18,130,174,0.6)' : resume ? 'rgba(30,200,168,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '0.75rem',
                  padding: '2rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: dragOver ? 'rgba(18,130,174,0.05)' : resume ? 'rgba(30,200,168,0.04)' : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.2s',
                }}
              >
                {resume ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 size={22} style={{ color: '#1EC8A8' }} />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: 'var(--cs-text)' }}>{resume.name}</div>
                      <div style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.75rem', color: '#6B8CAE' }}>{(resume.size / 1024).toFixed(0)} KB — click to change</div>
                    </div>
                    <button type="button" onClick={e => { e.stopPropagation(); setResume(null); }} style={{ background: 'none', border: 'none', color: '#6B8CAE', cursor: 'pointer', lineHeight: 0 }}>
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={28} style={{ color: '#2A4560', margin: '0 auto 0.75rem' }} />
                    <div style={{ fontFamily: "'Mulish', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: 'var(--cs-text-2)', marginBottom: '0.25rem' }}>
                      Drag & drop or click to upload
                    </div>
                    <div style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.75rem', color: '#4A6080' }}>
                      PDF, DOC, or DOCX · Max 5 MB
                    </div>
                  </>
                )}
              </div>
            </FormSection>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '0.875rem',
                borderRadius: '0.6rem',
                background: submitting ? 'rgba(18,130,174,0.4)' : 'linear-gradient(135deg, #1282AE 0%, #0A917A 52%, #4E8A1A 100%)',
                color: '#fff',
                fontFamily: "'Mulish', sans-serif",
                fontWeight: 700, fontSize: '1rem',
                border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                transition: 'filter 0.2s',
                marginTop: '0.5rem',
              }}
            >
              {submitting ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Submitting…</> : 'Submit Application'}
            </button>
          </form>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function SuccessState({ onClose, jobTitle }: { onClose: () => void; jobTitle: string }) {
  return (
    <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
      <div style={{
        width: '64px', height: '64px', borderRadius: '50%',
        background: 'rgba(30,200,168,0.12)', border: '2px solid rgba(30,200,168,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem',
      }}>
        <CheckCircle2 size={30} style={{ color: '#1EC8A8' }} />
      </div>
      <h3 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '1.375rem', color: 'var(--cs-text)', marginBottom: '0.625rem' }}>
        Application Submitted!
      </h3>
      <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.9375rem', color: 'var(--cs-text-2)', maxWidth: '380px', margin: '0 auto 0.75rem', lineHeight: 1.7 }}>
        Thank you for applying for <strong style={{ color: 'var(--cs-text)' }}>{jobTitle}</strong>. We&#39;ll review your application and get back to you within 3–5 business days.
      </p>
      <p style={{ fontFamily: "'Mulish', sans-serif", fontSize: '0.8125rem', color: '#4A6080', marginBottom: '2rem' }}>
        Check your email for a confirmation.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={onClose} style={{
          padding: '0.625rem 1.5rem', borderRadius: '0.5rem',
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--cs-text-2)', fontFamily: "'Mulish', sans-serif", fontWeight: 600, cursor: 'pointer',
        }}>
          Close
        </button>
        <Link href="/careers" onClick={onClose} style={{
          padding: '0.625rem 1.5rem', borderRadius: '0.5rem',
          background: 'rgba(18,130,174,0.1)', border: '1px solid rgba(18,130,174,0.25)',
          color: '#4DC8E8', fontFamily: "'Mulish', sans-serif", fontWeight: 600, textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center',
        }}>
          View More Jobs
        </Link>
      </div>
    </div>
  );
}

// ── Shared sub-components ──────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: '1.75rem',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '1rem',
    }}>
      <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '1.0625rem', color: 'var(--cs-text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ width: '3px', height: '1.1em', borderRadius: '2px', background: 'linear-gradient(180deg, #1282AE, #1EC8A8)', display: 'inline-block' }} />
        {title}
      </h2>
      {children}
    </div>
  );
}

function BulletList({ items, accent }: { items: string[]; accent?: boolean }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontFamily: "'Mulish', sans-serif", fontSize: '0.9rem', color: 'var(--cs-text-2)', lineHeight: 1.6 }}>
          <CheckCircle2 size={14} style={{ color: accent ? '#1EC8A8' : '#1282AE', marginTop: '0.2em', flexShrink: 0 }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function TagItem({ icon: Icon, text, highlight }: { icon: React.ElementType; text: string; highlight?: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
      padding: '0.3rem 0.75rem', borderRadius: '100px',
      background: highlight ? 'rgba(18,130,174,0.15)' : 'rgba(255,255,255,0.04)',
      border: `1px solid ${highlight ? 'rgba(18,130,174,0.3)' : 'rgba(255,255,255,0.07)'}`,
      color: highlight ? '#4DC8E8' : '#8AA8C8',
      fontFamily: "'Mulish', sans-serif", fontSize: '0.8125rem', fontWeight: 600,
    }}>
      <Icon size={12} /> {text}
    </span>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: '#1EC8A8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.875rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {children}
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, type = 'text', fullWidth }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; fullWidth?: boolean;
}) {
  return (
    <div style={{ flex: fullWidth ? '1 1 100%' : '1 1 calc(50% - 0.4rem)', minWidth: '180px' }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputBase}
      />
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{ background: 'var(--cs-bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 size={32} style={{ color: '#1282AE', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function NotFoundState() {
  return (
    <div style={{ background: 'var(--cs-bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
      <Briefcase size={40} style={{ color: '#2A4560' }} />
      <h2 style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: '1.5rem', color: '#3D5570' }}>Job Not Found</h2>
      <p style={{ fontFamily: "'Mulish', sans-serif", color: '#4A6080' }}>This position may have been filled or is no longer active.</p>
      <Link href="/careers" style={{ color: '#4DC8E8', fontFamily: "'Mulish', sans-serif", textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <ArrowLeft size={15} /> Back to all openings
      </Link>
    </div>
  );
}

const rowStyle: React.CSSProperties = {
  display: 'flex', gap: '0.875rem', flexWrap: 'wrap',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontFamily: "'Mulish', sans-serif", fontWeight: 600, fontSize: '0.8125rem',
  color: '#7A9ABF', marginBottom: '0.375rem',
};

const inputBase: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  padding: '0.625rem 0.875rem',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '0.5rem',
  color: 'var(--cs-text)',
  fontFamily: "'Mulish', sans-serif",
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s',
};
