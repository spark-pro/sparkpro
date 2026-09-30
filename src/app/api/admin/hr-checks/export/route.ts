import ExcelJS from 'exceljs';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hrChecks } from '@/lib/schema';
import { requireAdmin } from '@/lib/auth';
import { desc, eq } from 'drizzle-orm';

export const runtime = 'nodejs';

const STATUS_LABEL: Record<string, string> = {
  new: 'New', contacted: 'Contacted', scheduled: 'Scheduled', closed: 'Closed',
};
// Soft status pills: pastel fill + darker text of the same hue.
const STATUS_COLORS: Record<string, { fill: string; font: string }> = {
  new:       { fill: 'FFE0ECFF', font: 'FF1E40AF' },
  contacted: { fill: 'FFFFF1CC', font: 'FF92600A' },
  scheduled: { fill: 'FFD8F5E6', font: 'FF0F6B3F' },
  closed:    { fill: 'FFEDEFF3', font: 'FF52607A' },
};

const HEADER_BG = 'FF1E3A8A'; // column headers
const ROW_ALT   = 'FFF4F7FC';
const ROW_BASE  = 'FFFFFFFF';
const TEXT      = 'FF0F172A';
const MUTED     = 'FF64748B';
const EDGE      = { style: 'thin' as const, color: { argb: 'FFE2E8F0' } };
const ALL_EDGE  = { top: EDGE, left: EDGE, bottom: EDGE, right: EDGE };

export async function GET(request: Request) {
  const err = requireAdmin(request);
  if (err) return err;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const q      = (searchParams.get('q') || '').trim().toLowerCase();

    let rows = await db
      .select()
      .from(hrChecks)
      .where(status ? eq(hrChecks.status, status) : undefined)
      .orderBy(desc(hrChecks.createdAt));

    if (q) {
      rows = rows.filter(r =>
        [r.name, r.company, r.email, r.primaryChallenge].some(v => v.toLowerCase().includes(q)),
      );
    }

    const wb = new ExcelJS.Workbook();
    wb.creator = 'Spark Pro';
    wb.created = new Date();

    const ws = wb.addWorksheet('HR Independence Checks', {
      views: [{ state: 'frozen', ySplit: 1, showGridLines: false }],
      pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
    });

    const columns = [
      { header: '#',                 key: 'no',        width: 6  },
      { header: 'Received',          key: 'createdAt', width: 20 },
      { header: 'Name',              key: 'name',      width: 24 },
      { header: 'Company',           key: 'company',   width: 28 },
      { header: 'Company Size',      key: 'size',      width: 20 },
      { header: 'Email',             key: 'email',     width: 32 },
      { header: 'Phone',             key: 'phone',     width: 18 },
      { header: 'Business Stage',    key: 'stage',     width: 38 },
      { header: 'Primary Challenge', key: 'challenge', width: 26 },
      { header: 'Message',           key: 'message',   width: 55 },
      { header: 'Status',            key: 'status',    width: 14 },
      { header: 'Admin Notes',       key: 'notes',     width: 40 },
    ];
    ws.columns = columns.map(c => ({ key: c.key, width: c.width }));
    const lastCol = columns.length;

    // Header row (row 1)
    const headerRow = ws.getRow(1);
    columns.forEach((c, i) => { headerRow.getCell(i + 1).value = c.header; });
    headerRow.height = 26;
    headerRow.eachCell(cell => {
      cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HEADER_BG } };
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      cell.border = ALL_EDGE;
    });

    // Data rows
    rows.forEach((r, i) => {
      const row = ws.addRow({
        no: i + 1,
        createdAt: new Date(r.createdAt),
        name: r.name,
        company: r.company,
        size: r.companySize,
        email: r.email,
        phone: r.phone || '',
        stage: r.businessStage,
        challenge: r.primaryChallenge,
        message: r.message || '',
        status: STATUS_LABEL[r.status] ?? r.status,
        notes: r.adminNotes || '',
      });

      const zebra = i % 2 === 1 ? ROW_ALT : ROW_BASE;
      row.eachCell({ includeEmpty: true }, (cell, col) => {
        cell.font = { name: 'Calibri', size: 11, color: { argb: TEXT } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: zebra } };
        cell.border = ALL_EDGE;
        const centered = col === 1 || col === 2 || col === 11;
        cell.alignment = { vertical: 'top', horizontal: centered ? 'center' : 'left', wrapText: true };
      });
      row.getCell('createdAt').numFmt = 'dd-mmm-yyyy hh:mm';
      row.getCell('phone').numFmt = '@';

      const sc = STATUS_COLORS[r.status];
      if (sc) {
        const cell = row.getCell('status');
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: sc.fill } };
        cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: sc.font } };
      }
      row.getCell('email').value = { text: r.email, hyperlink: `mailto:${r.email}` };
      row.getCell('email').font = { name: 'Calibri', size: 11, underline: true, color: { argb: 'FF2563EB' } };
    });

    if (rows.length > 0) {
      ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1 + rows.length, column: lastCol } };
    } else {
      ws.mergeCells(2, 1, 2, lastCol);
      const empty = ws.getCell(2, 1);
      empty.value = 'No requests match the current filters.';
      empty.font = { name: 'Calibri', size: 11, italic: true, color: { argb: MUTED } };
      empty.alignment = { vertical: 'middle', horizontal: 'center' };
      ws.getRow(2).height = 28;
    }

    const buffer = await wb.xlsx.writeBuffer();
    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse(buffer as ArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="hr-independence-checks-${date}.xlsx"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    console.error('[Admin] GET /hr-checks/export:', e);
    return NextResponse.json({ error: 'Failed to export' }, { status: 500 });
  }
}
