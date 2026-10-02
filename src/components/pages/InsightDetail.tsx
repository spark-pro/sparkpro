'use client';

import Link from 'next/link';

export interface InsightFull {
  title: string;
  slug: string;
  content: string; // sanitized HTML (sanitized again server-side before it gets here)
  publishedAt: string | null;
  createdAt: string;
}

export default function InsightDetail({ insight }: { insight: InsightFull }) {
  const date = new Date(insight.publishedAt || insight.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div
      className="min-h-screen pt-36 pb-28 px-6"
      style={{ background: 'linear-gradient(180deg, #020812 0%, #050A14 40%, #020812 100%)' }}
    >
      <article className="max-w-3xl mx-auto">
        <Link
          href="/insights"
          className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors duration-200 hover:text-[#60A5FA]"
          style={{ color: 'rgba(226,232,244,0.55)', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
        >
          ← Back to Insights
        </Link>

        <header className="mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}>
            Insight
          </p>
          <h1
            className="text-3xl md:text-5xl font-bold leading-tight mb-5"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
          >
            {insight.title}
          </h1>
          <time className="text-sm" style={{ color: 'rgba(226,232,244,0.5)', fontFamily: 'Inter, sans-serif' }}>
            {date}
          </time>
        </header>

        <div
          className="insight-content"
          // Content is sanitized (allow-list of formatting tags only) on save and again before it is served.
          dangerouslySetInnerHTML={{ __html: insight.content }}
        />

        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(43,127,255,0.12)' }}>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 hover:text-[#60A5FA]"
            style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
          >
            ← Back to Insights
          </Link>
        </div>
      </article>
    </div>
  );
}
