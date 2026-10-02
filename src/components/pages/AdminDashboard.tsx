'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  LogOut, Plus, Pencil, Trash2, Eye, Download, X, Loader2,
  Briefcase, Users, TrendingUp, Clock, CheckCircle2, Search,
  ToggleLeft, ToggleRight, Shield, Lock, Eye as EyeIcon, EyeOff, ClipboardCheck, Mail, FileSpreadsheet, PhoneCall, CalendarCheck, FileText, Bold, Italic, Heading2, Heading3, List, ListOrdered, Link2, Eraser, CheckCircle,
} from 'lucide-react';

// ── Types (camelCase — matches Drizzle output) ──────────────────────────────

interface Job {
  id: number; title: string; location: string;
  experience: string; salaryRange: string | null;
  description: string; requirements: string[];
  benefits: string[]; isActive: number; createdAt: string;
  applicationCount?: number;
}

interface Application {
  id: number; jobId: number; fullName: string;
  email: string; phone: string;
  resumeFilename: string | null; resumeOriginalName: string | null;
  resumeSize: number | null;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  adminNotes: string | null; createdAt: string;
  jobTitle?: string;
}

interface HrCheck {
  id: number; name: string; company: string; companySize: string;
  email: string; phone: string | null; businessStage: string;
  primaryChallenge: string; message: string | null;
  status: 'new' | 'contacted' | 'scheduled' | 'closed';
  adminNotes: string | null; createdAt: string;
}

interface InsightRow {
  id: number; title: string; slug: string;
  status: 'draft' | 'published';
  createdAt: string; updatedAt: string; publishedAt: string | null;
}

interface Stats {
  total_hr_checks?: number; new_hr_checks?: number;
  total_jobs: number; active_jobs: number;
  total_applications: number; pending_applications: number; shortlisted: number;
}

const HR_STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  new:       { bg: 'rgba(43,127,255,0.14)',  color: '#60A5FA', label: 'New'       },
  contacted: { bg: 'rgba(234,179,8,0.12)',   color: '#FCD34D', label: 'Contacted' },
  scheduled: { bg: 'rgba(16,185,129,0.12)',  color: '#6EE7B7', label: 'Scheduled' },
  closed:    { bg: 'rgba(100,100,100,0.14)', color: '#9CA3AF', label: 'Closed'    },
};

const EMPTY_JOB: Omit<Job, 'id' | 'createdAt' | 'applicationCount'> = {
  title: '', location: '', experience: '',
  salaryRange: '', description: '', requirements: [],
  benefits: [], isActive: 1,
};

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  pending:    { bg: 'rgba(234,179,8,0.12)',  color: '#FCD34D', label: 'Pending'     },
  reviewed:   { bg: 'rgba(59,130,246,0.12)', color: '#93C5FD', label: 'Reviewed'    },
  shortlisted:{ bg: 'rgba(16,185,129,0.12)', color: '#6EE7B7', label: 'Shortlisted' },
  rejected:   { bg: 'rgba(239,68,68,0.12)',  color: '#FCA5A5', label: 'Rejected'    },
};

// ── Main component ─────────────────────────────────────────────────────────

export function AdminDashboard() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [section, setSection] = useState<'hr' | 'jobs' | 'insights'>('hr');
  const [insights, setInsights] = useState<InsightRow[]>([]);
  const [insightModal, setInsightModal] = useState<{ id: number | null } | null>(null);
  const [insightDelete, setInsightDelete] = useState<{ id: number } | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [activeTab, setTab] = useState<'jobs' | 'applications'>('jobs');
  const [exporting, setExporting] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw  ] = useState(false);
  const [loginErr, setLoginErr] = useState('');
  const [logging,  setLogging ] = useState(false);

  const [stats,   setStats  ] = useState<Stats | null>(null);
  const [jobs,    setJobs   ] = useState<Job[]>([]);
  const [apps,    setApps   ] = useState<Application[]>([]);
  const [hrChecks, setHrChecks] = useState<HrCheck[]>([]);
  const [hrModal,  setHrModal ] = useState<HrCheck | null>(null);
  const [hrDelete, setHrDelete] = useState<{ id: number } | null>(null);
  const [hrFilter, setHrFilter] = useState('');
  const [hrSearch, setHrSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const [jobModal,   setJobModal ] = useState<{ open: boolean; job: Partial<Job> | null; editing: boolean }>({ open: false, job: null, editing: false });
  const [appModal,   setAppModal ] = useState<Application | null>(null);
  const [deleteConf, setDelConf  ] = useState<{ id: number } | null>(null);

  const [appFilter, setAppFilter] = useState<{ job_id: string; status: string }>({ job_id: '', status: '' });
  const [jobSearch, setJobSearch] = useState('');

  // ── Data fetching ──────────────────────────────────────────────────────

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [sRes, jRes, aRes, hRes, iRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/jobs'),
        fetch('/api/admin/applications'),
        fetch('/api/admin/hr-checks'),
        fetch('/api/admin/insights'),
      ]);
      if (sRes.status === 401 || jRes.status === 401) { setAuthed(false); return; }
      const [sd, jd, ad, hd, id] = await Promise.all([sRes.json(), jRes.json(), aRes.json(), hRes.json(), iRes.json()]);
      setStats(sd.stats);
      setJobs((jd.jobs || []).map((j: Job) => ({
        ...j,
        requirements: parseJSON(j.requirements),
        benefits:     parseJSON(j.benefits),
      })));
      setApps(ad.applications || []);
      setHrChecks(hd.hrChecks || []);
      setInsights(id.insights || []);
      setAuthed(true);
    } catch {
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const fetchFilteredApps = useCallback(async () => {
    const params = new URLSearchParams();
    if (appFilter.job_id) params.set('job_id', appFilter.job_id);
    if (appFilter.status) params.set('status', appFilter.status);
    const res  = await fetch(`/api/admin/applications?${params}`);
    const data = await res.json();
    setApps(data.applications || []);
  }, [appFilter]);

  useEffect(() => { if (authed) fetchFilteredApps(); }, [appFilter, authed, fetchFilteredApps]);

  // ── Auth ───────────────────────────────────────────────────────────────

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoginErr(''); setLogging(true);
    try {
      const res  = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      const data = await res.json();
      if (!res.ok) { setLoginErr(data.error || 'Invalid credentials'); return; }
      await fetchData();
    } catch { setLoginErr('Network error — check your connection.'); }
    finally   { setLogging(false); }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false); setStats(null); setJobs([]); setApps([]); setHrChecks([]); setInsights([]);
  };

  // ── Job CRUD ───────────────────────────────────────────────────────────

  const saveJob = async (job: Partial<Job>) => {
    const method = jobModal.editing ? 'PUT' : 'POST';
    const url    = jobModal.editing ? `/api/admin/jobs/${job.id}` : '/api/admin/jobs';
    // Map camelCase back to snake_case for the API
    const payload = {
      title: job.title, location: job.location,
      experience: job.experience, salary_range: job.salaryRange,
      description: job.description, requirements: job.requirements,
      benefits: job.benefits, is_active: job.isActive,
    };
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) { setJobModal({ open: false, job: null, editing: false }); fetchData(); }
  };

  const deleteJob = async (id: number) => {
    await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
    setDelConf(null); fetchData();
  };

  const updateAppStatus = async (id: number, status: string, notes?: string) => {
    await fetch(`/api/admin/applications/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status, admin_notes: notes }) });
    fetchData();
    if (appModal) setAppModal(p => p ? { ...p, status: status as Application['status'], adminNotes: notes ?? p.adminNotes } : null);
  };

  const updateHrCheck = async (id: number, status: string, notes?: string) => {
    await fetch(`/api/admin/hr-checks/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status, admin_notes: notes }) });
    fetchData();
    if (hrModal) setHrModal(p => p ? { ...p, status: status as HrCheck['status'], adminNotes: notes ?? p.adminNotes } : null);
  };

  const deleteHrCheck = async (id: number) => {
    await fetch(`/api/admin/hr-checks/${id}`, { method: 'DELETE' });
    setHrDelete(null); setHrModal(null); fetchData();
  };

  const filteredHr = hrChecks.filter(h => {
    if (hrFilter && h.status !== hrFilter) return false;
    const q = hrSearch.trim().toLowerCase();
    return !q || [h.name, h.company, h.email, h.primaryChallenge].some(v => v.toLowerCase().includes(q));
  });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(t => (t && t.msg === msg ? null : t)), 3500);
  };

  const saveInsight = async (id: number | null, payload: { title: string; content: string; status: 'draft' | 'published' }): Promise<string | null> => {
    try {
      const res = await fetch(id ? `/api/admin/insights/${id}` : '/api/admin/insights', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return data.error || 'Could not save the insight. Please try again.';
      setInsightModal(null);
      showToast(payload.status === 'published' ? 'Insight published successfully.' : 'Insight saved as draft.');
      fetchData();
      return null;
    } catch {
      return 'Network error. Please try again.';
    }
  };

  const deleteInsight = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/insights/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setInsightDelete(null);
      showToast('Insight deleted successfully.');
      fetchData();
    } catch {
      setInsightDelete(null);
      showToast('Could not delete the insight. Please try again.', 'error');
    }
  };

  const exportExcel = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (hrFilter)        params.set('status', hrFilter);
      if (hrSearch.trim()) params.set('q', hrSearch.trim());
      const res = await fetch(`/api/admin/hr-checks/export?${params}`);
      if (!res.ok) throw new Error('export failed');
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url;
      a.download = `hr-independence-checks-${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    } catch {
      alert('Could not export to Excel. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────

  if (authed === null) return <FullLoader />;

  // ── Login page ─────────────────────────────────────────────────────────

  if (!authed) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #020812 0%, #050A14 50%, #050A14 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(43,127,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(43,127,255,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Ambient orbs */}
      <div style={{ position: 'absolute', top: '-20%', left: '-15%', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(43,127,255,0.1) 0%, transparent 60%)', pointerEvents: 'none', animation: 'pulse 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-15%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,106,255,0.09) 0%, transparent 60%)', pointerEvents: 'none', animation: 'pulse 10s ease-in-out infinite reverse' }} />
      <div style={{ position: 'absolute', top: '35%', right: '10%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: '460px', position: 'relative', zIndex: 1,
        background: 'rgba(8, 13, 26, 0.95)',
        border: '1px solid rgba(43,127,255,0.2)',
        borderRadius: '1.75rem',
        overflow: 'hidden',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 40px 100px rgba(0,0,0,0.7), 0 0 80px rgba(43,127,255,0.06)',
        backdropFilter: 'blur(20px)',
      }}>
        {/* Top gradient bar */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #2B7FFF 0%, #60A5FA 50%, #60A5FA 100%)' }} />

        {/* Header */}
        <div style={{ padding: '2.5rem 2.5rem 1.75rem', textAlign: 'center' }}>
          {/* Logo with glow ring */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
            <div style={{
              position: 'absolute', inset: '-8px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(43,127,255,0.15) 0%, transparent 70%)',
            }} />
            <img src="/logo.png" alt="Spark Pro" style={{ height: '64px', width: 'auto', display: 'block', position: 'relative' }} />
          </div>

          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
            fontSize: '1.75rem', color: 'var(--cs-text)',
            margin: '0 0 0.5rem', letterSpacing: '-0.02em',
          }}>
            Admin Portal
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--cs-light)', margin: '0 0 1.25rem' }}>
            Spark Pro Management Dashboard
          </p>

          {/* Restricted badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            padding: '0.35rem 1rem', borderRadius: '100px',
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)',
          }}>
            <Shield size={11} style={{ color: '#F87171' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', fontWeight: 700, color: '#F87171', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Restricted Access
            </span>
          </div>
        </div>

        {/* Divider with gradient */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(43,127,255,0.3), transparent)', margin: '0 2rem' }} />

        {/* Form */}
        <form onSubmit={handleLogin} style={{ padding: '2rem 2.5rem' }}>
          {loginErr && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.625rem',
              padding: '0.875rem 1rem', marginBottom: '1.5rem',
              background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: '0.75rem', color: '#F87171',
              fontFamily: "'Inter', sans-serif", fontSize: '0.875rem',
              animation: 'shake 0.4s ease',
            }}>
              <Shield size={15} style={{ flexShrink: 0, marginTop: '1px' }} />
              {loginErr}
            </div>
          )}

          {/* Username */}
          <div style={{ marginBottom: '1.125rem' }}>
            <label style={aLabelStyle}>Username</label>
            <div style={{ position: 'relative' }}>
              <Users size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#1E3A6E', pointerEvents: 'none' }} />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                required
                style={{ ...aInputStyle, paddingLeft: '2.625rem', width: '100%', boxSizing: 'border-box' as const }}
                onFocus={e  => { e.currentTarget.style.borderColor = 'rgba(43,127,255,0.55)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(43,127,255,0.08)'; }}
                onBlur={e   => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={aLabelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#1E3A6E', pointerEvents: 'none' }} />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                style={{ ...aInputStyle, paddingLeft: '2.625rem', paddingRight: '3rem', width: '100%', boxSizing: 'border-box' as const }}
                onFocus={e  => { e.currentTarget.style.borderColor = 'rgba(43,127,255,0.55)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(43,127,255,0.08)'; }}
                onBlur={e   => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none'; }}
              />
              <button
                type="button"
                onClick={() => setShowPw(p => !p)}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#1E3A6E', padding: '0.25rem', lineHeight: 0, borderRadius: '4px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#60A5FA'}
                onMouseLeave={e => e.currentTarget.style.color = '#1E3A6E'}
              >
                {showPw ? <EyeOff size={15} /> : <EyeIcon size={15} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={logging}
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: '0.875rem',
              background: logging
                ? 'rgba(43,127,255,0.25)'
                : '#2B7FFF',
              color: logging ? 'rgba(255,255,255,0.4)' : '#fff',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700, fontSize: '1rem',
              border: '1px solid ' + (logging ? 'rgba(43,127,255,0.15)' : 'rgba(255,255,255,0.12)'),
              cursor: logging ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              boxShadow: logging ? 'none' : '0 4px 20px rgba(43,127,255,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
              transition: 'all 0.2s',
              letterSpacing: '0.03em',
            }}
            onMouseEnter={e => { if (!logging) { e.currentTarget.style.filter = 'brightness(1.12)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(43,127,255,0.4), inset 0 1px 0 rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
            onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.boxShadow = logging ? 'none' : '0 4px 20px rgba(43,127,255,0.3), inset 0 1px 0 rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'none'; }}
          >
            {logging
              ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Signing in…</>
              : <><Lock size={16} /> Sign In to Dashboard</>
            }
          </button>
        </form>

        {/* Footer note */}
        <div style={{ padding: '1rem 2.5rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Lock size={11} style={{ color: '#1E3A6E' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#1E3A6E' }}>
            Protected with JWT · bcrypt encryption
          </span>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );

  // ── Dashboard ──────────────────────────────────────────────────────────

  const filteredJobs = jobs.filter(j => {
    const q = jobSearch.toLowerCase();
    return !q || j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q);
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cs-bg)', color: 'var(--cs-text)' }}>
      {/* Top Nav */}
      <nav style={{ background: '#050A14', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <img src="/logo.png" alt="Spark Pro" style={{ height: '40px', width: 'auto' }} />
          <div style={{ width: '1px', height: '22px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.8125rem', color: '#60A5FA', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin Portal</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.3rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(43,127,255,0.15)', borderRadius: '0.75rem', overflowX: 'auto' }}>
          {([
            { key: 'hr',   label: 'HR Independence Checks', icon: ClipboardCheck, badge: stats?.new_hr_checks ?? 0 },
            { key: 'jobs', label: 'Jobs',                   icon: Briefcase,      badge: stats?.pending_applications ?? 0 },
            { key: 'insights', label: 'Insights',           icon: FileText,       badge: 0 },
          ] as const).map(item => {
            const active = section === item.key;
            return (
              <button key={item.key} onClick={() => setSection(item.key)} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap',
                padding: '0.55rem 1.5rem', minWidth: '150px', justifyContent: 'center', borderRadius: '0.5rem', cursor: 'pointer',
                fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.8125rem',
                background: active ? '#2B7FFF' : 'transparent',
                color: active ? '#fff' : 'rgba(226,232,244,0.6)',
                border: 'none', transition: 'all 0.2s',
                boxShadow: active ? '0 0 18px rgba(43,127,255,0.35)' : 'none',
              }}>
                <item.icon size={15} />
                {item.label}
                {item.badge > 0 && (
                  <span style={{ minWidth: '18px', padding: '0 0.4rem', borderRadius: '100px', fontSize: '0.6875rem', fontWeight: 700, lineHeight: '18px', textAlign: 'center', background: active ? 'rgba(255,255,255,0.22)' : 'rgba(43,127,255,0.2)', color: active ? '#fff' : '#60A5FA' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '0.5rem', padding: '0.45rem 0.875rem', color: '#F87171', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.07)'; }}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Section header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: 'var(--cs-text)', margin: 0 }}>
            {section === 'hr' ? 'HR Independence Checks' : section === 'jobs' ? 'Jobs' : 'Insights'}
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--cs-light)', margin: '0.25rem 0 0' }}>
            {section === 'hr' ? 'Requests submitted through the Contact page.' : section === 'jobs' ? 'Manage job postings and review candidate applications.' : 'Create, manage and publish HR insights and articles.'}
          </p>
        </div>

        {/* Stats */}
        {stats && section === 'hr' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <StatCard icon={ClipboardCheck} label="Total Requests" value={stats.total_hr_checks ?? 0}                          color="#60A5FA" />
            <StatCard icon={Mail}           label="New"            value={hrChecks.filter(h => h.status === 'new').length}       color="#60A5FA" />
            <StatCard icon={PhoneCall}      label="Contacted"      value={hrChecks.filter(h => h.status === 'contacted').length} color="#FCD34D" />
            <StatCard icon={CalendarCheck}  label="Scheduled"      value={hrChecks.filter(h => h.status === 'scheduled').length} color="#6EE7B7" />
          </div>
        )}
        {section === 'insights' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <StatCard icon={FileText}    label="Total Insights" value={insights.length}                                       color="#60A5FA" />
            <StatCard icon={CheckCircle} label="Published"      value={insights.filter(i => i.status === 'published').length} color="#6EE7B7" />
            <StatCard icon={Pencil}      label="Drafts"         value={insights.filter(i => i.status === 'draft').length}     color="#FCD34D" />
          </div>
        )}
        {stats && section === 'jobs' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <StatCard icon={Briefcase}    label="Total Jobs"       value={stats.total_jobs}           color="#60A5FA" />
            <StatCard icon={CheckCircle2} label="Active Positions" value={stats.active_jobs}          color="#60A5FA" />
            <StatCard icon={Users}        label="Total Applicants" value={stats.total_applications}   color="#60A5FA" />
            <StatCard icon={Clock}        label="Pending Review"   value={stats.pending_applications} color="#FCD34D" />
            <StatCard icon={TrendingUp}   label="Shortlisted"      value={stats.shortlisted}          color="#A78BFA" />
          </div>
        )}

        {/* Jobs sub-tabs */}
        {section === 'jobs' && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--cs-border)' }}>
            {(['jobs', 'applications'] as const).map(tab => (
              <button key={tab} onClick={() => setTab(tab)} style={{
                padding: '0.625rem 1.75rem', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.9rem',
                color: activeTab === tab ? '#60A5FA' : 'rgba(226,232,244,0.4)',
                borderBottom: activeTab === tab ? '2px solid #60A5FA' : '2px solid transparent',
                transition: 'color 0.2s', marginBottom: '-1px',
              }}>
                {tab === 'jobs' ? 'Job Posts' : 'Applications'}
              </button>
            ))}
          </div>
        )}

        {loading && <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--cs-light)' }}><Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /></div>}

        {/* Insights Section */}
        {!loading && section === 'insights' && (
          <div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
              <button onClick={() => setInsightModal({ id: null })} style={{ ...aBtnStyle, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Plus size={16} /> Add Insight
              </button>
            </div>

            {insights.length === 0
              ? <EmptyState icon={FileText} title="No insights yet" sub="Click '+ Add Insight' to write your first article." />
              : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--cs-border)' }}>
                        {['Title', 'Status', 'Created', 'Updated', 'Actions'].map(h => (
                          <th key={h} style={{ padding: '0.625rem 0.875rem', textAlign: 'left', color: 'var(--cs-light)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {insights.map(i => {
                        const published = i.status === 'published';
                        const fmt = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                        return (
                          <tr key={i.id} style={{ borderBottom: '1px solid var(--cs-border)', transition: 'background 0.15s' }}
                            onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)'}
                            onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                          >
                            <td style={{ ...tdStyle, maxWidth: '420px' }}>
                              <div style={{ fontWeight: 600, color: 'var(--cs-text)' }}>{i.title}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--cs-light)' }}>/insights/{i.slug}</div>
                            </td>
                            <td style={tdStyle}>
                              <span style={{ padding: '0.2rem 0.65rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, background: published ? 'rgba(16,185,129,0.12)' : 'rgba(234,179,8,0.12)', color: published ? '#6EE7B7' : '#FCD34D' }}>
                                {published ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td style={{ ...tdStyle, color: 'var(--cs-light)', whiteSpace: 'nowrap' }}>{fmt(i.createdAt)}</td>
                            <td style={{ ...tdStyle, color: 'var(--cs-light)', whiteSpace: 'nowrap' }}>{fmt(i.updatedAt)}</td>
                            <td style={tdStyle}>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <IconBtn icon={Pencil} onClick={() => setInsightModal({ id: i.id })}     title="Edit"   color="#60A5FA" />
                                <IconBtn icon={Trash2} onClick={() => setInsightDelete({ id: i.id })}    title="Delete" color="#F87171" />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )
            }
          </div>
        )}

        {/* HR Independence Checks Tab */}
        {!loading && section === 'hr' && (
          <div>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: '320px' }}>
                <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--cs-light)', pointerEvents: 'none' }} />
                <input type="text" placeholder="Search name, company, email…" value={hrSearch} onChange={e => setHrSearch(e.target.value)} style={{ ...aInputStyle, paddingLeft: '2.25rem', width: '100%', boxSizing: 'border-box' as const }} />
              </div>
              <select value={hrFilter} onChange={e => setHrFilter(e.target.value)} style={{ ...aInputStyle, flex: '0 1 180px' }}>
                <option value="">All Statuses</option>
                {Object.entries(HR_STATUS_STYLES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
              <button onClick={exportExcel} disabled={exporting || filteredHr.length === 0} style={{ ...aBtnStyle, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.45rem', opacity: exporting || filteredHr.length === 0 ? 0.5 : 1, cursor: exporting || filteredHr.length === 0 ? 'not-allowed' : 'pointer' }}>
                {exporting ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <FileSpreadsheet size={16} />}
                Download Excel
              </button>
            </div>

            {filteredHr.length === 0
              ? <EmptyState icon={ClipboardCheck} title="No requests found" sub="Submissions of 'Request Your HR Independence Check' will appear here." />
              : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--cs-border)' }}>
                        {['Contact', 'Company', 'Stage', 'Primary Challenge', 'Received', 'Status', 'Actions'].map(h => (
                          <th key={h} style={{ padding: '0.625rem 0.875rem', textAlign: 'left', color: 'var(--cs-light)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHr.map(h => {
                        const s = HR_STATUS_STYLES[h.status] || HR_STATUS_STYLES.new;
                        return (
                          <tr key={h.id} style={{ borderBottom: '1px solid var(--cs-border)', transition: 'background 0.15s' }}
                            onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)'}
                            onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                          >
                            <td style={tdStyle}>
                              <div style={{ fontWeight: 600, color: 'var(--cs-text)' }}>{h.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--cs-light)' }}>{h.email}</div>
                            </td>
                            <td style={tdStyle}>
                              <div style={{ color: 'var(--cs-text-2)' }}>{h.company}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--cs-light)' }}>{h.companySize}</div>
                            </td>
                            <td style={{ ...tdStyle, color: 'var(--cs-text-2)', maxWidth: '220px' }}>{h.businessStage}</td>
                            <td style={{ ...tdStyle, color: 'var(--cs-text-2)', maxWidth: '200px' }}>{h.primaryChallenge}</td>
                            <td style={tdStyle}>
                              <span style={{ color: 'var(--cs-light)', whiteSpace: 'nowrap' }}>
                                {new Date(h.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            </td>
                            <td style={tdStyle}>
                              <select value={h.status} onChange={e => updateHrCheck(h.id, e.target.value)} style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}33`, borderRadius: '100px', padding: '0.2rem 0.5rem', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', outline: 'none' }}>
                                {Object.entries(HR_STATUS_STYLES).map(([k, v]) => <option key={k} value={k} style={{ background: 'var(--cs-card)', color: 'var(--cs-text)' }}>{v.label}</option>)}
                              </select>
                            </td>
                            <td style={tdStyle}>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <IconBtn icon={Eye}    onClick={() => setHrModal(h)}              title="View"   color="#A78BFA" />
                                <IconBtn icon={Trash2} onClick={() => setHrDelete({ id: h.id })} title="Delete" color="#F87171" />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )
            }
          </div>
        )}

        {/* Jobs Tab */}
        {!loading && section === 'jobs' && activeTab === 'jobs' && (
          <div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: '320px' }}>
                <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--cs-light)', pointerEvents: 'none' }} />
                <input type="text" placeholder="Search jobs…" value={jobSearch} onChange={e => setJobSearch(e.target.value)} style={{ ...aInputStyle, paddingLeft: '2.25rem', width: '100%', boxSizing: 'border-box' as const }} />
              </div>
              <button onClick={() => setJobModal({ open: true, job: { ...EMPTY_JOB }, editing: false })} style={{ ...aBtnStyle, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Plus size={16} /> Create Job Post
              </button>
            </div>

            {filteredJobs.length === 0
              ? <EmptyState icon={Briefcase} title="No job posts yet" sub="Click 'Create Job Post' to add your first position." />
              : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {filteredJobs.map(job => (
                    <div key={job.id} style={{ background: 'var(--cs-card)', border: '1px solid var(--cs-border)', borderRadius: '0.75rem', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.9875rem', color: 'var(--cs-text)' }}>{job.title}</span>
                          <span style={{ padding: '0.15rem 0.5rem', borderRadius: '100px', fontSize: '0.6875rem', fontWeight: 700, fontFamily: "'Inter', sans-serif", background: job.isActive ? 'rgba(16,185,129,0.12)' : 'rgba(100,100,100,0.12)', color: job.isActive ? '#6EE7B7' : '#6B7280' }}>
                            {job.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
                          <MetaText>{job.location}</MetaText>
                          <MetaText>{job.experience}</MetaText>
                          <MetaText icon={Users}>{job.applicationCount ?? 0} applicants</MetaText>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                        <IconBtn icon={Pencil} onClick={() => setJobModal({ open: true, job: { ...job }, editing: true })} title="Edit"   color="#60A5FA" />
                        <IconBtn icon={Trash2} onClick={() => setDelConf({ id: job.id })}                                  title="Delete" color="#F87171" />
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        )}

        {/* Applications Tab */}
        {!loading && section === 'jobs' && activeTab === 'applications' && (
          <div>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <select value={appFilter.job_id} onChange={e => setAppFilter(f => ({ ...f, job_id: e.target.value }))} style={{ ...aInputStyle, flex: '0 1 200px' }}>
                <option value="">All Jobs</option>
                {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
              </select>
              <select value={appFilter.status} onChange={e => setAppFilter(f => ({ ...f, status: e.target.value }))} style={{ ...aInputStyle, flex: '0 1 180px' }}>
                <option value="">All Statuses</option>
                {Object.entries(STATUS_STYLES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>

            {apps.length === 0
              ? <EmptyState icon={Users} title="No applications found" sub="Applications will appear here once candidates apply." />
              : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--cs-border)' }}>
                        {['Applicant', 'Job', 'Applied', 'Status', 'Resume', 'Actions'].map(h => (
                          <th key={h} style={{ padding: '0.625rem 0.875rem', textAlign: 'left', color: 'var(--cs-light)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {apps.map(app => {
                        const s = STATUS_STYLES[app.status] || STATUS_STYLES.pending;
                        return (
                          <tr key={app.id} style={{ borderBottom: '1px solid var(--cs-border)', transition: 'background 0.15s' }}
                            onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)'}
                            onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                          >
                            <td style={tdStyle}>
                              <div style={{ fontWeight: 600, color: 'var(--cs-text)' }}>{app.fullName}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--cs-light)' }}>{app.email}</div>
                            </td>
                            <td style={tdStyle}>
                              <div style={{ color: 'var(--cs-text-2)' }}>{app.jobTitle}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--cs-light)' }}>{app.phone}</div>
                            </td>
                            <td style={tdStyle}>
                              <span style={{ color: 'var(--cs-light)', whiteSpace: 'nowrap' }}>
                                {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            </td>
                            <td style={tdStyle}>
                              <select value={app.status} onChange={e => updateAppStatus(app.id, e.target.value)} style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}33`, borderRadius: '100px', padding: '0.2rem 0.5rem', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', outline: 'none' }}>
                                {Object.entries(STATUS_STYLES).map(([k, v]) => <option key={k} value={k} style={{ background: 'var(--cs-card)', color: 'var(--cs-text)' }}>{v.label}</option>)}
                              </select>
                            </td>
                            <td style={tdStyle}>
                              {app.resumeFilename
                                ? <a href={`/api/admin/resume/${encodeURIComponent(app.resumeFilename)}`} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#60A5FA', fontSize: '0.8125rem', textDecoration: 'none' }}><Download size={13} /> Download</a>
                                : <span style={{ color: 'var(--cs-muted)', fontSize: '0.8125rem' }}>—</span>
                              }
                            </td>
                            <td style={tdStyle}>
                              <IconBtn icon={Eye} onClick={() => setAppModal(app)} title="View" color="#A78BFA" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )
            }
          </div>
        )}
      </div>

      {/* Modals */}
      {jobModal.open && jobModal.job && (
        <JobFormModal job={jobModal.job} editing={jobModal.editing} onClose={() => setJobModal({ open: false, job: null, editing: false })} onSave={saveJob} />
      )}
      {appModal && (
        <AppDetailModal app={appModal} onClose={() => setAppModal(null)} onStatusChange={(s, n) => updateAppStatus(appModal.id, s, n)} />
      )}
      {insightModal && (
        <InsightFormModal id={insightModal.id} onClose={() => setInsightModal(null)} onSave={saveInsight} />
      )}
      {insightDelete && (
        <ConfirmModal title="Delete this insight?" message="This action cannot be undone." onConfirm={() => deleteInsight(insightDelete.id)} onCancel={() => setInsightDelete(null)} />
      )}
      {toast && (
        <div role="status" style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 300,
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          padding: '0.8rem 1.1rem', borderRadius: '0.75rem',
          background: toast.type === 'success' ? 'rgba(16,185,129,0.14)' : 'rgba(239,68,68,0.14)',
          border: `1px solid ${toast.type === 'success' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
          color: toast.type === 'success' ? '#6EE7B7' : '#FCA5A5',
          fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 600,
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
        }}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <Shield size={16} />} {toast.msg}
        </div>
      )}
      {hrModal && (
        <HrCheckDetailModal check={hrModal} onClose={() => setHrModal(null)} onSave={(st, n) => updateHrCheck(hrModal.id, st, n)} onDelete={() => setHrDelete({ id: hrModal.id })} />
      )}
      {hrDelete && (
        <ConfirmModal title="Delete Request?" message="This will permanently delete this HR Independence Check request. This cannot be undone." onConfirm={() => deleteHrCheck(hrDelete.id)} onCancel={() => setHrDelete(null)} />
      )}
      {deleteConf && (
        <ConfirmModal title="Delete Job Post?" message="This will permanently delete the job and all its applications. This cannot be undone." onConfirm={() => deleteJob(deleteConf.id)} onCancel={() => setDelConf(null)} />
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Job Form Modal ─────────────────────────────────────────────────────────

function JobFormModal({ job, editing, onClose, onSave }: { job: Partial<Job>; editing: boolean; onClose: () => void; onSave: (j: Partial<Job>) => void }) {
  const [form, setForm]   = useState({ ...EMPTY_JOB, ...job });
  const [saving, setSav]  = useState(false);
  const [err, setErr]     = useState('');

  const handleSave = async () => {
    if (!form.title || !form.location || !form.experience || !form.description) { setErr('Title, location, experience, and description are required.'); return; }
    setSav(true); setErr('');
    await onSave({ ...form, id: job.id });
    setSav(false);
  };

  const addItem    = (f: 'requirements' | 'benefits') => setForm(p => ({ ...p, [f]: [...(p[f] as string[]), ''] }));
  const updateItem = (f: 'requirements' | 'benefits', i: number, v: string) => setForm(p => { const a = [...(p[f] as string[])]; a[i] = v; return { ...p, [f]: a }; });
  const removeItem = (f: 'requirements' | 'benefits', i: number) => setForm(p => { const a = [...(p[f] as string[])]; a.splice(i, 1); return { ...p, [f]: a }; });

  return (
    <ModalShell onClose={onClose} wide>
      <ModalHeader title={editing ? 'Edit Job Post' : 'Create Job Post'} onClose={onClose} />
      <div style={{ padding: '1.5rem', overflowY: 'auto', maxHeight: '72vh' }}>
        {err && <ErrBanner msg={err} />}
        <FormGrid>
          <ModalField label="Job Title *"           value={form.title}            onChange={v => setForm(p => ({ ...p, title: v }))}       placeholder="e.g. HR Manager"          fullWidth />
          <ModalField label="Location *"            value={form.location}         onChange={v => setForm(p => ({ ...p, location: v }))}    placeholder="e.g. Trichy, TN / Remote" />
          <ModalField label="Experience Required *" value={form.experience}       onChange={v => setForm(p => ({ ...p, experience: v }))}  placeholder="e.g. 2–4 years" />
          <ModalField label="Salary Range"          value={form.salaryRange || ''} onChange={v => setForm(p => ({ ...p, salaryRange: v }))} placeholder="e.g. ₹6–10 LPA" />
        </FormGrid>
        <ModalTextArea label="Job Description *" value={form.description} onChange={v => setForm(p => ({ ...p, description: v }))} placeholder="Describe the role…" rows={4} />
        <DynamicList label="Requirements"     items={form.requirements as string[]} onAdd={() => addItem('requirements')} onUpdate={(i, v) => updateItem('requirements', i, v)} onRemove={i => removeItem('requirements', i)} placeholder="Add a requirement…" />
        <DynamicList label="Benefits & Perks" items={form.benefits     as string[]} onAdd={() => addItem('benefits')}    onUpdate={(i, v) => updateItem('benefits',     i, v)} onRemove={i => removeItem('benefits',     i)} placeholder="Add a benefit…" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', padding: '0.875rem 1rem', background: 'var(--cs-input-bg)', borderRadius: '0.5rem' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: 'var(--cs-text-2)' }}>Status</span>
          <button type="button" onClick={() => setForm(p => ({ ...p, isActive: p.isActive ? 0 : 1 }))} style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 0, color: form.isActive ? '#60A5FA' : 'rgba(226,232,244,0.4)' }}>
            {form.isActive ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
          </button>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: form.isActive ? '#60A5FA' : 'rgba(226,232,244,0.4)' }}>{form.isActive ? 'Active (visible to candidates)' : 'Inactive (hidden)'}</span>
        </div>
      </div>
      <ModalFooter onClose={onClose} onSave={handleSave} saving={saving} label={editing ? 'Save Changes' : 'Create Job Post'} />
    </ModalShell>
  );
}

// ── Application Detail Modal ───────────────────────────────────────────────

function AppDetailModal({ app, onClose, onStatusChange }: { app: Application; onClose: () => void; onStatusChange: (s: string, n?: string) => void }) {
  const [notes,  setNotes ] = useState(app.adminNotes || '');
  const [status, setStatus] = useState(app.status);
  const s = STATUS_STYLES[status];

  return (
    <ModalShell onClose={onClose} wide>
      <ModalHeader title={app.fullName} sub={app.jobTitle} onClose={onClose} />
      <div style={{ padding: '1.5rem', overflowY: 'auto', maxHeight: '72vh' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: 'var(--cs-light)' }}>Status:</span>
            <select value={status} onChange={e => setStatus(e.target.value as Application['status'])} style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}44`, borderRadius: '100px', padding: '0.25rem 0.75rem', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer', outline: 'none' }}>
              {Object.entries(STATUS_STYLES).map(([k, v]) => <option key={k} value={k} style={{ background: 'var(--cs-card)', color: 'var(--cs-text)' }}>{v.label}</option>)}
            </select>
          </div>
          {app.resumeFilename && (
            <a href={`/api/admin/resume/${encodeURIComponent(app.resumeFilename)}`} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.875rem', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.25)', borderRadius: '100px', color: '#60A5FA', fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 700, textDecoration: 'none' }}>
              <Download size={13} /> Download Resume
              {app.resumeOriginalName && <span style={{ fontWeight: 400, color: 'var(--cs-muted)' }}>({app.resumeOriginalName})</span>}
            </a>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <InfoBlock label="Email" value={app.email} />
          <InfoBlock label="Phone" value={app.phone} />
        </div>

        <div>
          <div style={sectionLabel}>Admin Notes</div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add private notes about this applicant…" rows={3} style={{ ...aInputStyle, width: '100%', boxSizing: 'border-box' as const, resize: 'vertical' }} />
        </div>
      </div>
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--cs-border)', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button onClick={onClose} style={aSecBtnStyle}>Close</button>
        <button onClick={() => { onStatusChange(status, notes); onClose(); }} style={aBtnStyle}>Save Changes</button>
      </div>
    </ModalShell>
  );
}

// ── Insight editor ──────────────────────────────────────────────────────────

const PASTE_ALLOWED = new Set(['P', 'BR', 'H2', 'H3', 'H4', 'STRONG', 'B', 'EM', 'I', 'U', 'UL', 'OL', 'LI', 'A', 'BLOCKQUOTE']);

// Keep pasted content to basic formatting: drop styles/classes/scripts, unwrap unknown tags, H1 -> H2.
function cleanPastedHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const walk = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) return (node.textContent || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const el = node as HTMLElement;
    const tag = el.tagName;
    if (['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED'].includes(tag)) return '';
    const inner = Array.from(el.childNodes).map(walk).join('');
    if (tag === 'H1') return `<h2>${inner}</h2>`;
    if (tag === 'DIV') return `<p>${inner}</p>`;
    if (!PASTE_ALLOWED.has(tag)) return inner;
    if (tag === 'A') {
      const href = el.getAttribute('href') || '';
      return /^(https?:|mailto:)/i.test(href) ? `<a href="${href.replace(/"/g, '&quot;')}">${inner}</a>` : inner;
    }
    const t = tag.toLowerCase();
    return tag === 'BR' ? '<br>' : `<${t}>${inner}</${t}>`;
  };
  return walk(doc.body);
}

function RichTextEditor({ initialHtml, onChange, placeholder }: { initialHtml: string; onChange: (html: string) => void; placeholder: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.innerHTML = initialHtml;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emit = () => onChange(ref.current?.innerHTML || '');
  const run = (cmd: string, value?: string) => {
    ref.current?.focus();
    document.execCommand(cmd, false, value);
    emit();
  };
  const addLink = () => {
    const url = window.prompt('Link URL (https://…)');
    if (url && /^(https?:\/\/|mailto:)/i.test(url.trim())) run('createLink', url.trim());
  };

  const tools: { title: string; icon: React.ElementType; action: () => void }[] = [
    { title: 'Bold',          icon: Bold,        action: () => run('bold') },
    { title: 'Italic',        icon: Italic,      action: () => run('italic') },
    { title: 'Heading',       icon: Heading2,    action: () => run('formatBlock', 'h2') },
    { title: 'Sub-heading',   icon: Heading3,    action: () => run('formatBlock', 'h3') },
    { title: 'Bullet list',   icon: List,        action: () => run('insertUnorderedList') },
    { title: 'Numbered list', icon: ListOrdered, action: () => run('insertOrderedList') },
    { title: 'Link',          icon: Link2,       action: addLink },
    { title: 'Clear formatting (paragraph)', icon: Eraser, action: () => { run('formatBlock', 'p'); run('removeFormat'); } },
  ];

  return (
    <div style={{ border: '1px solid var(--cs-input-border)', borderRadius: '0.5rem', overflow: 'hidden', background: 'var(--cs-input-bg)' }}>
      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', padding: '0.5rem', borderBottom: '1px solid var(--cs-border)', background: 'rgba(255,255,255,0.02)' }}>
        {tools.map(t => (
          <button key={t.title} type="button" title={t.title} aria-label={t.title}
            onMouseDown={e => e.preventDefault()} onClick={t.action}
            style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid transparent', borderRadius: '0.4rem', color: 'var(--cs-text-2)', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(43,127,255,0.14)'; e.currentTarget.style.color = '#60A5FA'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--cs-text-2)'; }}
          >
            <t.icon size={15} />
          </button>
        ))}
      </div>
      <div
        ref={ref}
        className="insight-content insight-editor"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="Insight Content"
        data-placeholder={placeholder}
        onInput={emit}
        onBlur={emit}
        onPaste={e => {
          const html = e.clipboardData.getData('text/html');
          if (!html) return; // plain text pastes normally
          e.preventDefault();
          document.execCommand('insertHTML', false, cleanPastedHtml(html));
          emit();
        }}
        style={{ minHeight: '320px', maxHeight: '52vh', overflowY: 'auto', padding: '1rem 1.125rem', outline: 'none' }}
      />
    </div>
  );
}

function InsightFormModal({ id, onClose, onSave }: {
  id: number | null;
  onClose: () => void;
  onSave: (id: number | null, payload: { title: string; content: string; status: 'draft' | 'published' }) => Promise<string | null>;
}) {
  const [loading, setLoading]   = useState(id !== null);
  const [title, setTitle]       = useState('');
  const [content, setContent]   = useState('');
  const [initial, setInitial]   = useState('');
  const [saving, setSaving]     = useState<'draft' | 'published' | null>(null);
  const [errors, setErrors]     = useState<{ title?: string; content?: string; form?: string }>({});

  useEffect(() => {
    if (id === null) return;
    fetch(`/api/admin/insights/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => { setTitle(d.insight.title); setContent(d.insight.content); setInitial(d.insight.content); })
      .catch(() => setErrors({ form: 'Could not load this insight. Please close and try again.' }))
      .finally(() => setLoading(false));
  }, [id]);

  const plain = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').trim();

  const submit = async (status: 'draft' | 'published') => {
    const next: typeof errors = {};
    if (!title.trim())      next.title   = 'Please enter an insight heading.';
    if (!plain(content))    next.content = 'Please enter insight content.';
    setErrors(next);
    if (next.title || next.content) return;
    setSaving(status);
    const err = await onSave(id, { title: title.trim(), content, status });
    setSaving(null);
    if (err) setErrors({ form: err });
  };

  const fieldErr = (m?: string) => m ? <div style={{ color: '#F87171', fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', marginTop: '0.375rem' }}>{m}</div> : null;

  return (
    <ModalShell onClose={onClose} xl>
      <ModalHeader title={id === null ? 'Add Insight' : 'Edit Insight'} sub={id === null ? 'Create a new insight' : undefined} onClose={onClose} />
      <div style={{ padding: '1.5rem', overflowY: 'auto', maxHeight: '74vh' }}>
        {errors.form && <ErrBanner msg={errors.form} />}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--cs-light)' }}><Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} /></div>
        ) : (
          <>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={aLabelStyle}>Insight Heading</label>
              <input
                type="text" value={title} onChange={e => { setTitle(e.target.value); setErrors(p => ({ ...p, title: undefined })); }}
                placeholder="Enter your insight heading" maxLength={255} autoFocus
                style={{ ...aInputStyle, width: '100%', boxSizing: 'border-box' as const, fontSize: '1.0625rem', fontWeight: 600, borderColor: errors.title ? 'rgba(239,68,68,0.5)' : undefined }}
              />
              {fieldErr(errors.title)}
            </div>
            <div>
              <label style={aLabelStyle}>Insight Content</label>
              <RichTextEditor initialHtml={initial} onChange={html => { setContent(html); setErrors(p => ({ ...p, content: undefined })); }} placeholder="Write your insight here..." />
              {fieldErr(errors.content)}
            </div>
          </>
        )}
      </div>
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--cs-border)', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button onClick={onClose} disabled={saving !== null} style={aSecBtnStyle}>Cancel</button>
        <button onClick={() => submit('draft')} disabled={loading || saving !== null} style={{ ...aSecBtnStyle, opacity: loading || saving ? 0.6 : 1 }}>
          {saving === 'draft' ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving…</> : 'Save Draft'}
        </button>
        <button onClick={() => submit('published')} disabled={loading || saving !== null} style={{ ...aBtnStyle, opacity: loading || saving ? 0.6 : 1 }}>
          {saving === 'published' ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Publishing…</> : 'Publish'}
        </button>
      </div>
    </ModalShell>
  );
}

// ── HR Independence Check Detail Modal ─────────────────────────────────────

function HrCheckDetailModal({ check, onClose, onSave, onDelete }: { check: HrCheck; onClose: () => void; onSave: (s: string, n?: string) => void; onDelete: () => void }) {
  const [notes,  setNotes ] = useState(check.adminNotes || '');
  const [status, setStatus] = useState(check.status);
  const s = HR_STATUS_STYLES[status] || HR_STATUS_STYLES.new;

  return (
    <ModalShell onClose={onClose} wide>
      <ModalHeader title={check.name} sub={`${check.company} · received ${new Date(check.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`} onClose={onClose} />
      <div style={{ padding: '1.5rem', overflowY: 'auto', maxHeight: '72vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: 'var(--cs-light)' }}>Status:</span>
          <select value={status} onChange={e => setStatus(e.target.value as HrCheck['status'])} style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}44`, borderRadius: '100px', padding: '0.25rem 0.75rem', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer', outline: 'none' }}>
            {Object.entries(HR_STATUS_STYLES).map(([k, v]) => <option key={k} value={k} style={{ background: 'var(--cs-card)', color: 'var(--cs-text)' }}>{v.label}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <InfoBlock label="Email"             value={check.email} />
          <InfoBlock label="Phone"             value={check.phone || '—'} />
          <InfoBlock label="Company"           value={check.company} />
          <InfoBlock label="Company Size"      value={check.companySize} />
          <InfoBlock label="Business Stage"    value={check.businessStage} />
          <InfoBlock label="Primary Challenge" value={check.primaryChallenge} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={sectionLabel}>Message</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--cs-text-2)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{check.message || '—'}</div>
        </div>

        <div>
          <div style={sectionLabel}>Admin Notes</div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add private notes about this request…" rows={3} style={{ ...aInputStyle, width: '100%', boxSizing: 'border-box' as const, resize: 'vertical' }} />
        </div>
      </div>
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--cs-border)', display: 'flex', gap: '0.75rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <button onClick={onDelete} style={{ ...aSecBtnStyle, color: '#F87171', borderColor: 'rgba(239,68,68,0.25)' }}>Delete</button>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={onClose} style={aSecBtnStyle}>Close</button>
          <button onClick={() => { onSave(status, notes); onClose(); }} style={aBtnStyle}>Save Changes</button>
        </div>
      </div>
    </ModalShell>
  );
}

// ── Shared sub-components ──────────────────────────────────────────────────

function parseJSON(val: unknown): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') { try { return JSON.parse(val); } catch { return []; } }
  return [];
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  return (
    <div style={{ background: 'var(--cs-card)', border: '1px solid var(--cs-border)', borderRadius: '0.75rem', padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '0.5rem', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={16} style={{ color }} />
        </div>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: 'var(--cs-light)' }}>{label}</span>
      </div>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.75rem', color }}>{value}</div>
    </div>
  );
}

function MetaText({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ElementType }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontFamily: "'Inter', sans-serif", color: 'var(--cs-light)' }}>
      {Icon && <Icon size={11} />}{children}
    </span>
  );
}

function IconBtn({ icon: Icon, onClick, title, color }: { icon: React.ElementType; onClick: () => void; title: string; color: string }) {
  return (
    <button title={title} onClick={onClick} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}12`, border: `1px solid ${color}25`, borderRadius: '0.4rem', cursor: 'pointer', color, transition: 'background 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.background = `${color}22`; }}
      onMouseLeave={e => { e.currentTarget.style.background = `${color}12`; }}
    >
      <Icon size={14} />
    </button>
  );
}

function EmptyState({ icon: Icon, title, sub }: { icon: React.ElementType; title: string; sub: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--cs-card)', border: '1px solid var(--cs-border)', borderRadius: '0.75rem' }}>
      <Icon size={32} style={{ color: 'var(--cs-light)', margin: '0 auto 0.875rem' }} />
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1.0625rem', color: 'var(--cs-muted)', marginBottom: '0.375rem' }}>{title}</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--cs-light)' }}>{sub}</div>
    </div>
  );
}

function ModalShell({ children, onClose, wide, xl }: { children: React.ReactNode; onClose: () => void; wide?: boolean; xl?: boolean }) {
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(2,8,18,0.88)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem 1rem', overflowY: 'auto' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: '100%', maxWidth: xl ? '960px' : wide ? '700px' : '480px', background: 'var(--cs-card)', border: '1px solid var(--cs-border)', borderRadius: '1.25rem', overflow: 'hidden', marginTop: '1rem' }}>
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ title, sub, onClose }: { title: string; sub?: string; onClose: () => void }) {
  return (
    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--cs-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--cs-surface)' }}>
      <div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1.0625rem', color: 'var(--cs-text)', margin: 0 }}>{title}</h2>
        {sub && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: 'var(--cs-light)', marginTop: '0.2rem' }}>{sub}</div>}
      </div>
      <button onClick={onClose} style={{ background: 'var(--cs-ghost-bg)', border: '1px solid var(--cs-ghost-border)', borderRadius: '0.4rem', padding: '0.35rem', cursor: 'pointer', color: 'var(--cs-text-2)', lineHeight: 0 }}><X size={16} /></button>
    </div>
  );
}

function ModalFooter({ onClose, onSave, saving, label }: { onClose: () => void; onSave: () => void; saving: boolean; label: string }) {
  return (
    <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--cs-border)', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
      <button onClick={onClose} style={aSecBtnStyle}>Cancel</button>
      <button onClick={onSave} disabled={saving} style={{ ...aBtnStyle, opacity: saving ? 0.6 : 1 }}>
        {saving ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving…</> : label}
      </button>
    </div>
  );
}

function ModalField({ label, value, onChange, placeholder, type = 'text', fullWidth }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; fullWidth?: boolean }) {
  return (
    <div style={{ flex: fullWidth ? '1 1 100%' : '1 1 calc(50% - 0.5rem)', minWidth: '160px' }}>
      <label style={aLabelStyle}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...aInputStyle, width: '100%', boxSizing: 'border-box' as const }} />
    </div>
  );
}

function ModalSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div style={{ flex: '1 1 calc(50% - 0.5rem)', minWidth: '160px' }}>
      <label style={aLabelStyle}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={{ ...aInputStyle, width: '100%', boxSizing: 'border-box' as const }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ModalTextArea({ label, value, onChange, placeholder, rows }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={aLabelStyle}>{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows || 4} style={{ ...aInputStyle, width: '100%', boxSizing: 'border-box' as const, resize: 'vertical' }} />
    </div>
  );
}

function DynamicList({ label, items, onAdd, onUpdate, onRemove, placeholder }: { label: string; items: string[]; onAdd: () => void; onUpdate: (i: number, v: string) => void; onRemove: (i: number) => void; placeholder: string }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <label style={aLabelStyle}>{label}</label>
        <button type="button" onClick={onAdd} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(43,127,255,0.1)', border: '1px solid rgba(43,127,255,0.2)', borderRadius: '0.375rem', padding: '0.2rem 0.6rem', color: '#60A5FA', fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
          <Plus size={12} /> Add
        </button>
      </div>
      {items.length === 0 && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--cs-muted)', fontStyle: 'italic' }}>No items yet.</div>}
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
          <input value={item} onChange={e => onUpdate(i, e.target.value)} placeholder={placeholder} style={{ ...aInputStyle, flex: 1, boxSizing: 'border-box' as const }} />
          <button type="button" onClick={() => onRemove(i)} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '0.375rem', padding: '0.375rem', cursor: 'pointer', color: '#F87171', lineHeight: 0, flexShrink: 0 }}><X size={13} /></button>
        </div>
      ))}
    </div>
  );
}

function FormGrid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>{children}</div>;
}

function ConfirmModal({ title, message, onConfirm, onCancel }: { title: string; message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <ModalShell onClose={onCancel}>
      <ModalHeader title={title} onClose={onCancel} />
      <div style={{ padding: '1.5rem' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--cs-text-2)', lineHeight: 1.7 }}>{message}</p>
      </div>
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--cs-border)', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
        <button onClick={onCancel} style={aSecBtnStyle}>Cancel</button>
        <button onClick={onConfirm} style={{ ...aBtnStyle, background: '#DC2626' }}>Delete</button>
      </div>
    </ModalShell>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: 'var(--cs-input-bg)', borderRadius: '0.5rem', padding: '0.75rem 1rem' }}>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: 'rgba(226,232,244,0.5)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'var(--cs-text-2)' }}>{value}</div>
    </div>
  );
}

function ErrBanner({ msg }: { msg: string }) {
  return <div style={{ padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '0.5rem', color: '#F87171', fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', marginBottom: '1rem' }}>{msg}</div>;
}

function FullLoader() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cs-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 size={28} style={{ color: '#2B7FFF', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Style constants ────────────────────────────────────────────────────────

const aInputStyle: React.CSSProperties = {
  padding: '0.7rem 1rem',
  background: 'var(--cs-input-bg)',
  border: '1px solid var(--cs-input-border)',
  borderRadius: '0.625rem',
  color: 'var(--cs-text)',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const aLabelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  fontSize: '0.8rem',
  color: 'var(--cs-muted)',
  marginBottom: '0.3rem',
};

const aBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  padding: '0.6rem 1.25rem',
  background: '#2B7FFF',
  color: '#fff',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700, fontSize: '0.875rem',
  border: 'none', borderRadius: '0.5rem', cursor: 'pointer',
};

const aSecBtnStyle: React.CSSProperties = {
  padding: '0.6rem 1.25rem',
  background: 'var(--cs-ghost-bg)',
  border: '1px solid var(--cs-ghost-border)',
  borderRadius: '0.5rem',
  color: 'var(--cs-text-2)',
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600, fontSize: '0.875rem',
  cursor: 'pointer',
};

const tdStyle: React.CSSProperties = { padding: '0.75rem 0.875rem', verticalAlign: 'middle' };

const sectionLabel: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.75rem',
  color: 'var(--cs-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem',
};

const linkStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center',
  padding: '0.3rem 0.875rem',
  background: 'rgba(43,127,255,0.08)', border: '1px solid rgba(43,127,255,0.2)',
  borderRadius: '100px', color: '#60A5FA',
  fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', textDecoration: 'none',
};
