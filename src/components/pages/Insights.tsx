'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView as fmUseInView } from 'framer-motion';
import Link from 'next/link';

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

interface InsightSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string | null;
  createdAt: string;
}

function formatDate(iso: string | null, fallback: string) {
  return new Date(iso || fallback).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function InsightCard({ insight }: { insight: InsightSummary }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
      style={{ background: 'rgba(11,22,40,0.7)', border: '1px solid rgba(43,127,255,0.1)', textDecoration: 'none' }}
    >
      <p className="text-xs font-semibold tracking-wide mb-4" style={{ color: 'rgba(226,232,244,0.45)', fontFamily: 'Inter, sans-serif' }}>
        {formatDate(insight.publishedAt, insight.createdAt)}
      </p>
      <h2
        className="text-xl font-bold leading-snug mb-3 transition-colors duration-200 group-hover:text-[#60A5FA]"
        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
      >
        {insight.title}
      </h2>
      <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'rgba(226,232,244,0.6)', fontFamily: 'Inter, sans-serif' }}>
        {insight.excerpt}
      </p>
      <span className="text-sm font-semibold" style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}>
        Read More →
      </span>
    </Link>
  );
}

export default function Insights() {
  const [items, setItems] = useState<InsightSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/insights')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setItems(d.insights || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="min-h-screen pt-32"
      style={{ background: 'linear-gradient(180deg, #020812 0%, #050A14 40%, #020812 100%)' }}
    >
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pb-16 text-center">
        <RevealSection>
          <p className="text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}>
            Insights
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
          >
            People Systems Library
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' }}>
            Thinking on people infrastructure, founder dependency, and what it takes to build HR that
            actually scales.
          </p>
        </RevealSection>
      </section>

      {/* Articles */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        {loading ? (
          <p className="text-center py-20" style={{ color: 'rgba(226,232,244,0.4)', fontFamily: 'Inter, sans-serif' }}>
            Loading insights…
          </p>
        ) : error ? (
          <p className="text-center py-20" style={{ color: 'rgba(248,113,113,0.8)', fontFamily: 'Inter, sans-serif' }}>
            We couldn&apos;t load the insights right now. Please try again shortly.
          </p>
        ) : items.length === 0 ? (
          <p className="text-center py-20" style={{ color: 'rgba(226,232,244,0.4)', fontFamily: 'Inter, sans-serif' }}>
            New insights are on the way. Check back soon.
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </motion.div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <RevealSection>
          <div
            className="rounded-2xl p-12 md:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(43,127,255,0.12) 0%, rgba(11,22,40,0.9) 100%)',
              border: '1px solid rgba(43,127,255,0.2)',
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}>
              Don&apos;t just read about it. Fix it.
            </h2>
            <p className="text-base md:text-lg mb-10 max-w-xl mx-auto" style={{ color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' }}>
              If any of these articles describe your business, an HR Independence Check is the right next
              step — a structured review of your people system that tells you exactly what to build first.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ background: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
            >
              Check Your HR Score — Free
            </Link>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
