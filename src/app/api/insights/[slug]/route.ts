import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { insights } from '@/lib/schema';
import { makeExcerpt, sanitizeContent } from '@/lib/insights';
import { and, eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

// Public: a single published insight by slug. Drafts are never returned.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const rows = await db
      .select({
        id:          insights.id,
        title:       insights.title,
        slug:        insights.slug,
        content:     insights.content,
        publishedAt: insights.publishedAt,
        createdAt:   insights.createdAt,
        updatedAt:   insights.updatedAt,
      })
      .from(insights)
      .where(and(eq(insights.slug, slug), eq(insights.status, 'published')))
      .limit(1);

    if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const content = sanitizeContent(rows[0].content);
    return NextResponse.json({ insight: { ...rows[0], content, excerpt: makeExcerpt(content, 160) } });
  } catch (e) {
    console.error('[API] GET /insights/[slug]:', e);
    return NextResponse.json({ error: 'Failed to fetch insight' }, { status: 500 });
  }
}
