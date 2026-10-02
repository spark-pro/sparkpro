import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import InsightDetail, { type InsightFull } from '@/components/pages/InsightDetail';

export const dynamic = 'force-dynamic';

async function origin() {
  const h = await headers();
  const host  = h.get('x-forwarded-host') || h.get('host') || 'localhost:3000';
  const proto = h.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

// Data comes from the public API route (all DB access stays in src/app/api).
async function getInsight(slug: string): Promise<(InsightFull & { excerpt: string }) | null> {
  const res = await fetch(`${await origin()}/api/insights/${encodeURIComponent(slug)}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return (await res.json()).insight;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return { title: 'Insight not found | Spark Pro' };

  return {
    title: `${insight.title} | Spark Pro`,
    description: insight.excerpt,
    alternates: { canonical: `${await origin()}/insights/${insight.slug}` },
    openGraph: { title: insight.title, description: insight.excerpt, type: 'article' },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();
  return <InsightDetail insight={insight} />;
}
