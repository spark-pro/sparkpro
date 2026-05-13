import { requireAdmin } from '@/lib/auth';
import { readFile } from 'fs/promises';
import path from 'path';

// GET /api/admin/resume/[filename] — serve resume file (admin only)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const { filename } = await params;

  // Sanitise: only allow uuid-based filenames, block path traversal
  if (!filename || !/^[a-f0-9\-]+\.(pdf|doc|docx)$/i.test(filename)) {
    return new Response(JSON.stringify({ error: 'Invalid filename' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const filePath = path.join(process.cwd(), 'private', 'resumes', filename);
    const buffer   = await readFile(filePath);

    const ext = path.extname(filename).toLowerCase();
    const contentType =
      ext === '.pdf'  ? 'application/pdf' :
      ext === '.docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                        'application/msword';

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
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
