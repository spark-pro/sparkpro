import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hrChecks } from '@/lib/schema';

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name             = str(body.name, 150);
    const company          = str(body.company, 200);
    const companySize      = str(body.companySize, 100);
    const email            = str(body.email, 255).toLowerCase();
    const phone            = str(body.phone, 25);
    const businessStage    = str(body.businessStage, 200);
    const primaryChallenge = str(body.primaryChallenge, 200);
    const message          = str(body.message, 5000);

    if (!name || !company || !companySize || !email || !businessStage || !primaryChallenge) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    await db.insert(hrChecks).values({
      name, company, companySize, email,
      phone: phone || null,
      businessStage, primaryChallenge,
      message: message || null,
    });

    return NextResponse.json({ message: 'Request submitted successfully' }, { status: 201 });
  } catch (err) {
    console.error('[API] POST /api/hr-checks:', err);
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}
