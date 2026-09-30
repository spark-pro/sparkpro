'use client';

import { useRef, useState } from 'react';
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

type Category =
  | 'All'
  | 'Founder Dependency'
  | 'People Infrastructure'
  | 'Manager Systems'
  | 'HR Systems'
  | 'Startup HR'
  | 'Performance'
  | 'Retention';

interface Article {
  id: number;
  title: string;
  category: Category;
  readTime: string;
  excerpt: string;
  available: boolean;
}

const categories: Category[] = [
  'All',
  'Founder Dependency',
  'People Infrastructure',
  'Manager Systems',
  'HR Systems',
  'Startup HR',
  'Performance',
  'Retention',
];

const articles: Article[] = [
  {
    id: 1,
    title: "The Founder as HR Department: Why It Works Until It Doesn't",
    category: 'Founder Dependency',
    readTime: '5 min read',
    excerpt:
      "In the early days, the founder handling every people decision makes complete sense. It's fast, it's personal, and it works — until the business crosses a headcount threshold where one person can no longer hold it all.",
    available: false,
  },
  {
    id: 2,
    title: 'Nine Layers of People Infrastructure Every Growing Business Needs',
    category: 'People Infrastructure',
    readTime: '8 min read',
    excerpt:
      'Most businesses build HR reactively — a policy here, a process there. The businesses that scale without chaos are the ones who understand the nine foundational layers and build them in the right order.',
    available: false,
  },
  {
    id: 3,
    title: "What Manager Ownership Really Means (And Why Most Businesses Don't Have It)",

    category: 'Manager Systems',
    readTime: '6 min read',
    excerpt:
      "Having managers doesn't mean having manager ownership. Most growing businesses have people with manager titles who still escalate every meaningful decision upward — because no one defined what they actually own.",

    available: false,
  },
  {
    id: 4,
    title: 'The HR Independence Index: How to Measure Your People System Maturity',
    category: 'HR Systems',
    readTime: '7 min read',
    excerpt:
      "HR effectiveness is rarely measured. Most businesses know whether they have an HR policy but have no idea whether it's working. The HR Independence Index gives you a structured way to assess maturity across nine dimensions.",

    available: false,
  },
  {
    id: 5,
    title: 'Building HR from Scratch: A Framework for Startups',
    category: 'Startup HR',
    readTime: '10 min read',
    excerpt:
      "When you're building from zero, every HR choice matters more — because it sets the defaults the business will live with for years. This framework walks through what to build first, second, and what to skip entirely in the early stage.",

    available: false,
  },
  {
    id: 6,
    title: 'Why Employees Keep Leaving: The Retention Problem Hiding in Your Management',
    category: 'Retention',
    readTime: '5 min read',
    excerpt:
      "Most attrition isn't about pay or culture — it's about management. Specifically, it's about unclear expectations, absent feedback, and managers who were promoted for technical skill without any training in how to lead people.",

    available: false,
  },
  {
    id: 7,
    title: 'Performance Without Clarity: The KPI Problem in Growing Businesses',
    category: 'Performance',
    readTime: '6 min read',
    excerpt:
      'Performance management fails when the goalposts are invisible. Most growing businesses hold performance reviews without ever having defined what good performance looks like — leaving both managers and employees in the dark.',
    available: false,
  },
  {
    id: 8,
    title: 'From 20 to 100: How to Scale People Operations Without Chaos',
    category: 'People Infrastructure',
    readTime: '9 min read',
    excerpt:
      'The jump from 20 to 100 employees is where most people systems break. What worked informally — founder-led decisions, tribal knowledge, verbal agreements — stops working the moment the business is too large for everyone to know everyone.',
    available: false,
  },
  {
    id: 9,
    title: 'The Manager Escalation Problem: When Every Issue Still Reaches the Founder',
    category: 'Founder Dependency',
    readTime: '4 min read',
    excerpt:
      "If your managers bring every people issue to you, you don't have a manager problem — you have a systems problem. The escalation pattern is a symptom of absent decision frameworks, not absent talent.",

    available: false,
  },
];

const categoryColors: Record<Category, string> = {
  'All': '#2B7FFF',
  'Founder Dependency': '#F59E0B',
  'People Infrastructure': '#2B7FFF',
  'Manager Systems': '#10B981',
  'HR Systems': '#8B5CF6',
  'Startup HR': '#EC4899',
  'Performance': '#F97316',
  'Retention': '#06B6D4',
};

function ArticleCard({ article }: { article: Article }) {
  const tagColor = categoryColors[article.category] ?? '#2B7FFF';
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl p-7 flex flex-col h-full"
      style={{
        background: 'rgba(11,22,40,0.7)',
        border: '1px solid rgba(43,127,255,0.08)',
      }}
    >
      {/* Category + read time */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: `${tagColor}18`,
            color: tagColor,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {article.category}
        </span>
        <span
          className="text-xs"
          style={{ color: 'rgba(226,232,244,0.35)', fontFamily: 'Inter, sans-serif' }}
        >
          {article.readTime}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-base font-semibold leading-snug mb-3 flex-grow"
        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
      >
        {article.title}
      </h3>

      {/* Excerpt */}
      <p
        className="text-sm leading-relaxed mb-6"
        style={{ color: 'rgba(226,232,244,0.55)', fontFamily: 'Inter, sans-serif' }}
      >
        {article.excerpt}
      </p>

      {/* CTA */}
      <div className="mt-auto">
        {article.available ? (
          <span
            className="text-sm font-semibold"
            style={{ color: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
          >
            Read More →
          </span>
        ) : (
          <span
            className="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{
              background: 'rgba(226,232,244,0.05)',
              color: 'rgba(226,232,244,0.35)',
              fontFamily: 'Inter, sans-serif',
              border: '1px solid rgba(226,232,244,0.06)',
            }}
          >
            Coming Soon
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered =
    activeCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

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
            Insights
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
          >
            People Systems Library
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' }}
          >
            Thinking on people infrastructure, founder dependency, and what it takes to build HR that
            actually scales.
          </p>
        </RevealSection>
      </section>

      {/* Category Filter */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <RevealSection>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    background: isActive ? '#2B7FFF' : 'rgba(11,22,40,0.7)',
                    color: isActive ? '#fff' : 'rgba(226,232,244,0.6)',
                    border: isActive
                      ? '1px solid #2B7FFF'
                      : '1px solid rgba(43,127,255,0.1)',
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </RevealSection>
      </section>

      {/* Article Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p
              className="text-base"
              style={{ color: 'rgba(226,232,244,0.4)', fontFamily: 'Inter, sans-serif' }}
            >
              No articles in this category yet. Check back soon.
            </p>
          </div>
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
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#E2E8F4' }}
            >
              Don't just read about it. Fix it.
            </h2>
            <p
              className="text-base md:text-lg mb-10 max-w-xl mx-auto"
              style={{ color: 'rgba(226,232,244,0.65)', fontFamily: 'Inter, sans-serif' }}
            >
              If any of these articles describe your business, an HR Independence Check is the right next
              step — a structured review of your people system that tells you exactly what to build first.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ background: '#2B7FFF', fontFamily: 'Inter, sans-serif' }}
            >
              Request Your HR Independence Check
            </Link>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
