'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const nextSteps = [
  {
    step: '01',
    heading: 'We review your submission',
    body: "We'll read through your details within 1 business day and identify what context we need to have a useful first conversation.",
  },
  {
    step: '02',
    heading: 'Work out your HR score',
    body: 'Share the details we ask for on this page so we can calculate how independent your people system is today.',
  },
  {
    step: '03',
    heading: 'A scoped recommendation',
    body: 'We share a clear, written recommendation aligned to your business stage — what to build, in what order, and what it involves.',
  },
];

/**
 * Landing page shown after the "Request Your HR Independence Check" form is submitted.
 * The HR score details/questionnaire section is added here once the content is finalised.
 */
export default function HrScore() {
  return (
    <div
      className="min-h-screen pt-36 pb-28 px-6"
      style={{ background: 'linear-gradient(180deg, #020812 0%, #050A14 40%, #020812 100%)' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(43,127,255,0.15)' }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2B7FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}>
            Check Your HR Score — Free
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-5"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
          >
            Thank you — we&apos;ve received your request.
          </h1>
          <p className="text-lg leading-relaxed mb-14" style={{ color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' }}>
            We&apos;ll review your submission within 1 business day and be in touch to schedule your discovery
            call.
          </p>
        </motion.div>

        <div
          className="rounded-2xl p-8 md:p-10 text-left mb-10"
          style={{ background: 'rgba(11,22,40,0.7)', border: '1px solid rgba(43,127,255,0.12)' }}
        >
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}>
            What happens next
          </h2>
          <div className="space-y-6">
            {nextSteps.map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex-shrink-0 text-sm font-bold tabular-nums pt-0.5" style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}>
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold mb-1" style={{ color: '#E2E8F4', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                    {item.heading}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,244,0.55)', fontFamily: 'Inter, sans-serif' }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/"
          className="inline-block px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90"
          style={{ background: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
