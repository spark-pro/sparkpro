import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { insights } from '@/lib/schema';
import { makeExcerpt, sanitizeContent } from '@/lib/insights';
import { desc, eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

// Public: published insights only.
export async function GET() {
  try {
    const rows = await db
      .select({
        id:          insights.id,
        title:       insights.title,
        slug:        insights.slug,
        content:     insights.content,
        publishedAt: insights.publishedAt,
        createdAt:   insights.createdAt,
      })
      .from(insights)
      .where(eq(insights.status, 'published'))
      .orderBy(desc(insights.publishedAt), desc(insights.createdAt));

    return NextResponse.json({
      insights: rows.map(({ content, ...r }) => ({ ...r, excerpt: makeExcerpt(sanitizeContent(content)) })),
    });
  } catch (e) {
    console.error('[API] GET /insights:', e);
    return NextResponse.json({ error: 'Failed to fetch insights' }, { status: 500 });
  }
}
