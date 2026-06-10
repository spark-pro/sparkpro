import { requireAdmin } from '@/lib/auth';
import path from 'path';

// GET /api/admin/resume/[filename] — proxy resume from Vercel Blob (admin only)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const { filename } = await params;

  // filename is either a UUID slug (legacy local) or a URL-encoded blob URL
  const decoded = decodeURIComponent(filename);
  const isBlobUrl = decoded.startsWith('https://');

  if (!isBlobUrl) {
    // Legacy local file — no longer supported on Vercel
    return new Response(JSON.stringify({ error: 'File not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const blobRes = await fetch(decoded, {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    });

    if (!blobRes.ok) {
      return new Response(JSON.stringify({ error: 'File not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ext = path.extname(new URL(decoded).pathname).toLowerCase();
    const contentType =
      ext === '.pdf'  ? 'application/pdf' :
      ext === '.docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                        'application/msword';

    return new Response(blobRes.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${path.basename(new URL(decoded).pathname)}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'File not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
