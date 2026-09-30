import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hrChecks } from '@/lib/schema';
import { requireAdmin } from '@/lib/auth';
import { eq } from 'drizzle-orm';

const VALID_STATUSES = ['new', 'contacted', 'scheduled', 'closed'] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const err = requireAdmin(request);
  if (err) return err;

  const { id } = await params;
  const checkId = parseInt(id, 10);
  if (isNaN(checkId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    const body = await request.json();
    if (body.status && !VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updates: Partial<typeof hrChecks.$inferInsert> = {};
    if (body.status      !== undefined) updates.status     = body.status;
    if (body.admin_notes !== undefined) updates.adminNotes = body.admin_notes;

    if (!Object.keys(updates).length) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    await db.update(hrChecks).set(updates).where(eq(hrChecks.id, checkId));
    return NextResponse.json({ message: 'Updated' });
  } catch (e) {
    console.error('[Admin] PATCH /hr-checks/[id]:', e);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const err = requireAdmin(request);
  if (err) return err;

  const { id } = await params;
  const checkId = parseInt(id, 10);
  if (isNaN(checkId)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await db.delete(hrChecks).where(eq(hrChecks.id, checkId));
    return NextResponse.json({ message: 'Deleted' });
  } catch (e) {
    console.error('[Admin] DELETE /hr-checks/[id]:', e);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
