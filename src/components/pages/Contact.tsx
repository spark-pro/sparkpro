'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { CONTACT } from '@/lib/contactInfo';
import { motion, useInView as fmUseInView } from 'framer-motion';

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = fmUseInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} className={className}>
      <motion.div
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface FormState {
  name: string;
  company: string;
  companySize: string;
  email: string;
  phone: string;
  businessStage: string;
  primaryChallenge: string;
  message: string;
}

const initialForm: FormState = {
  name: '',
  company: '',
  companySize: '',
  email: '',
  phone: '',
  businessStage: '',
  primaryChallenge: '',
  message: '',
};

const inputClass =
  'w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2';
const inputStyle = {
  background: 'rgba(11,22,40,0.8)',
  border: '1px solid rgba(43,127,255,0.15)',
  color: '#E2E8F4',
  fontFamily: 'Inter, sans-serif',
};
const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '0.8rem',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  color: 'rgba(226,232,244,0.5)',
  fontFamily: 'Inter, sans-serif',
};

const nextSteps = [
  {
    step: '01',
    heading: 'We review your submission',
    body: "We'll read through your details within 1 business day and identify what context we need to have a useful first conversation.",
  },
  {
    step: '02',
    heading: 'A structured discovery call',
    body: "A focused 45-minute conversation to map your current people system — what's working, what's absent, and where the pressure points are.",
  },
  {
    step: '03',
    heading: 'A scoped recommendation',
    body: 'We share a clear, written recommendation aligned to your business stage — what to build, in what order, and what it involves.',
  },
];

export default function Contact() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Dropdown answers are stored as the readable option text, not the slug value.
  function optionLabel(id: keyof FormState) {
    const el = document.getElementById(id) as HTMLSelectElement | null;
    return el?.selectedOptions[0]?.text ?? form[id];
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/hr-checks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          companySize: optionLabel('companySize'),
          businessStage: optionLabel('businessStage'),
          primaryChallenge: optionLabel('primaryChallenge'),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      // Continue to the HR score landing page once the request is stored.
      router.push('/hr-score');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen pt-32"
      style={{ background: 'linear-gradient(180deg, #020812 0%, #050A14 40%, #020812 100%)' }}
    >
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pb-16 text-center">
        <RevealSection>
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-6"
            style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
          >
            Get in Touch
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
          >
            Let's find what's holding your
            <br />
            <span style={{ color: '#2B7FFF' }}>people system back.</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' }}
          >
            Tell us where you are. We'll tell you what needs to change — and in what order.
          </p>
        </RevealSection>
      </section>

      {/* Form + Next Steps */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <RevealSection>
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Form */}
            <div
              className="lg:col-span-3 rounded-2xl p-8 md:p-10"
              style={{
                background: 'rgba(11,22,40,0.7)',
                border: '1px solid rgba(43,127,255,0.08)',
              }}
            >
              <h2
                className="text-2xl font-bold mb-8"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
              >
                Request Your HR Independence Check
              </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label style={labelStyle} htmlFor="name">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="company">Company</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        placeholder="Company name"
                        value={form.company}
                        onChange={handleChange}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle} htmlFor="companySize">Company Size</label>
                    <select
                      id="companySize"
                      name="companySize"
                      required
                      value={form.companySize}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="" disabled>Select headcount</option>
                      <option value="2-10">2 – 10 employees</option>
                      <option value="11-25">11 – 25 employees</option>
                      <option value="26-50">26 – 50 employees</option>
                      <option value="51-100">51 – 100 employees</option>
                      <option value="101-200">101 – 200 employees</option>
                      <option value="200+">200+ employees</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label style={labelStyle} htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98XXX XXXXX"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle} htmlFor="businessStage">Business Stage</label>
                    <select
                      id="businessStage"
                      name="businessStage"
                      required
                      value={form.businessStage}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="" disabled>Select your stage</option>
                      <option value="startup-scratch">Startup building from scratch</option>
                      <option value="growing-sme">Growing SME — need better systems</option>
                      <option value="established-sme">Established SME — systems need upgrading</option>
                      <option value="scaling-rapidly">Scaling rapidly</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle} htmlFor="primaryChallenge">Primary Challenge</label>
                    <select
                      id="primaryChallenge"
                      name="primaryChallenge"
                      required
                      value={form.primaryChallenge}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="" disabled>What's the main problem?</option>
                      <option value="founder-dependency">Founder dependency</option>
                      <option value="no-hr-systems">No HR systems</option>
                      <option value="weak-manager-capability">Weak manager capability</option>
                      <option value="compliance-issues">Compliance issues</option>
                      <option value="performance-problems">Performance problems</option>
                      <option value="high-attrition">High attrition</option>
                      <option value="payroll-complexity">Payroll complexity</option>
                      <option value="general-hr-support">General HR support</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle} htmlFor="message">
                      Anything else you'd like us to know{' '}
                      <span style={{ color: 'rgba(226,232,244,0.3)', textTransform: 'none', fontWeight: 400 }}>
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Describe your situation in your own words..."
                      value={form.message}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  {error && (
                    <div
                      className="rounded-xl px-4 py-3 text-sm"
                      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#F87171', fontFamily: 'Inter, sans-serif' }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
                    style={{ background: '#2B7FFF', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', opacity: submitting ? 0.6 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                  >
                    {submitting ? 'Submitting…' : 'Request HR Health Check'}
                  </button>

                  <p
                    className="text-xs text-center"
                    style={{ color: 'rgba(226,232,244,0.35)', fontFamily: 'Inter, sans-serif' }}
                  >
                    We respond within 1 business day. No spam, ever.
                  </p>
                </form>

            </div>

            {/* Right side */}
            <div className="lg:col-span-2 space-y-8 pt-2">
              <div>
                <h3
                  className="text-xl font-bold mb-6"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
                >
                  What happens after you submit
                </h3>
                <div className="space-y-6">
                  {nextSteps.map((item) => (
                    <div key={item.step} className="flex gap-5">
                      <div
                        className="flex-shrink-0 text-sm font-bold tabular-nums pt-0.5"
                        style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <p
                          className="font-semibold mb-1"
                          style={{ color: '#E2E8F4', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}
                        >
                          {item.heading}
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: 'rgba(226,232,244,0.55)', fontFamily: 'Inter, sans-serif' }}
                        >
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(43,127,255,0.08)' }} />

              {/* Contact info */}
              <div>
                <h3
                  className="text-sm font-semibold tracking-widest uppercase mb-5"
                  style={{ color: 'rgba(226,232,244,0.4)', fontFamily: 'Inter, sans-serif' }}
                >
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  {[
                    { Icon: Mail,   label: 'Email',          value: CONTACT.email,                              href: `mailto:${CONTACT.email}` },
                    { Icon: Phone,  label: 'Phone',          value: CONTACT.phoneDisplay,                       href: CONTACT.phoneHref },
                    { Icon: MapPin, label: 'Office Address', value: CONTACT.address,                            href: undefined },
                    { Icon: Clock,  label: 'Business Hours', value: `${CONTACT.hours}\n${CONTACT.hoursTime}`,   href: undefined },
                  ].map(({ Icon, label, value, href }) => {
                    const inner = (
                      <>
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(43,127,255,0.10)' }}
                        >
                          <Icon size={16} color="#2B7FFF" strokeWidth={1.8} />
                        </div>
                        <div>
                          <p
                            className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                            style={{ color: 'rgba(226,232,244,0.4)', fontFamily: 'Inter, sans-serif' }}
                          >
                            {label}
                          </p>
                          <p
                            className={`text-sm ${href ? 'group-hover:underline' : ''}`}
                            style={{ color: '#E2E8F4', fontFamily: 'Inter, sans-serif', whiteSpace: 'pre-line' }}
                          >
                            {value}
                          </p>
                        </div>
                      </>
                    );
                    return href ? (
                      <a key={label} href={href} className="flex items-start gap-3 group">{inner}</a>
                    ) : (
                      <div key={label} className="flex items-start gap-3">{inner}</div>
                    );
                  })}
                </div>

                {/* WhatsApp */}
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 mt-6 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #128C7E, #25D366)',
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                  }}
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
