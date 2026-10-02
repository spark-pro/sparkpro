import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { insights } from '@/lib/schema';
import { requireAdmin } from '@/lib/auth';
import { sanitizeContent, slugify, toPlainText } from '@/lib/insights';
import { desc, eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const err = requireAdmin(request);
  if (err) return err;

  try {
    const rows = await db
      .select({
        id:          insights.id,
        title:       insights.title,
        slug:        insights.slug,
        status:      insights.status,
        createdAt:   insights.createdAt,
        updatedAt:   insights.updatedAt,
        publishedAt: insights.publishedAt,
      })
      .from(insights)
      .orderBy(desc(insights.createdAt));
    return NextResponse.json({ insights: rows });
  } catch (e) {
    console.error('[Admin] GET /insights:', e);
    return NextResponse.json({ error: 'Failed to load insights' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const err = requireAdmin(request);
  if (err) return err;

  try {
    const body = await request.json();
    const title   = typeof body.title === 'string' ? body.title.trim() : '';
    const content = sanitizeContent(typeof body.content === 'string' ? body.content : '');
    const status  = body.status === 'published' ? 'published' : 'draft';

    if (!title)                     return NextResponse.json({ error: 'Please enter an insight heading.' }, { status: 400 });
    if (!toPlainText(content))      return NextResponse.json({ error: 'Please enter insight content.' }, { status: 400 });
    if (title.length > 255)         return NextResponse.json({ error: 'Heading must be 255 characters or fewer.' }, { status: 400 });

    // Unique slug from the heading
    const base = slugify(title);
    let slug = base;
    for (let i = 2; ; i++) {
      const taken = await db.select({ id: insights.id }).from(insights).where(eq(insights.slug, slug)).limit(1);
      if (!taken.length) break;
      slug = `${base}-${i}`;
    }

    const [row] = await db
      .insert(insights)
      .values({ title, slug, content, status, publishedAt: status === 'published' ? new Date() : null })
      .returning({ id: insights.id, slug: insights.slug, status: insights.status });

    return NextResponse.json({ insight: row }, { status: 201 });
  } catch (e) {
    console.error('[Admin] POST /insights:', e);
    return NextResponse.json({ error: 'Failed to save insight. Please try again.' }, { status: 500 });
  }
}
