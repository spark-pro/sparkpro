import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { insights } from '@/lib/schema';
import { requireAdmin } from '@/lib/auth';
import { sanitizeContent, slugify, toPlainText } from '@/lib/insights';
import { and, eq, ne } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

async function parseId(ctx: Ctx) {
  const { id } = await ctx.params;
  const n = parseInt(id, 10);
  return isNaN(n) ? null : n;
}

export async function GET(request: Request, ctx: Ctx) {
  const err = requireAdmin(request);
  if (err) return err;

  const id = await parseId(ctx);
  if (id === null) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const rows = await db.select().from(insights).where(eq(insights.id, id)).limit(1);
    if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ insight: rows[0] });
  } catch (e) {
    console.error('[Admin] GET /insights/[id]:', e);
    return NextResponse.json({ error: 'Failed to load insight' }, { status: 500 });
  }
}

export async function PUT(request: Request, ctx: Ctx) {
  const err = requireAdmin(request);
  if (err) return err;

  const id = await parseId(ctx);
  if (id === null) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const body = await request.json();
    const title   = typeof body.title === 'string' ? body.title.trim() : '';
    const content = sanitizeContent(typeof body.content === 'string' ? body.content : '');
    const status  = body.status === 'published' ? 'published' : 'draft';

    if (!title)                return NextResponse.json({ error: 'Please enter an insight heading.' }, { status: 400 });
    if (!toPlainText(content)) return NextResponse.json({ error: 'Please enter insight content.' }, { status: 400 });
    if (title.length > 255)    return NextResponse.json({ error: 'Heading must be 255 characters or fewer.' }, { status: 400 });

    const existing = (await db.select().from(insights).where(eq(insights.id, id)).limit(1))[0];
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Published URLs stay stable; a draft's slug follows its heading.
    let slug = existing.slug;
    if (existing.status !== 'published' && title !== existing.title) {
      const base = slugify(title);
      slug = base;
      for (let i = 2; ; i++) {
        const taken = await db
          .select({ id: insights.id })
          .from(insights)
          .where(and(eq(insights.slug, slug), ne(insights.id, id)))
          .limit(1);
        if (!taken.length) break;
        slug = `${base}-${i}`;
      }
    }

    const publishedAt =
      status === 'published' ? existing.publishedAt ?? new Date() : existing.publishedAt;

    await db
      .update(insights)
      .set({ title, slug, content, status, publishedAt, updatedAt: new Date() })
      .where(eq(insights.id, id));

    return NextResponse.json({ insight: { id, slug, status } });
  } catch (e) {
    console.error('[Admin] PUT /insights/[id]:', e);
    return NextResponse.json({ error: 'Failed to save insight. Please try again.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, ctx: Ctx) {
  const err = requireAdmin(request);
  if (err) return err;

  const id = await parseId(ctx);
  if (id === null) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await db.delete(insights).where(eq(insights.id, id));
    return NextResponse.json({ message: 'Deleted' });
  } catch (e) {
    console.error('[Admin] DELETE /insights/[id]:', e);
    return NextResponse.json({ error: 'Failed to delete insight. Please try again.' }, { status: 500 });
  }
}
