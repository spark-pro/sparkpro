import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET  = process.env.JWT_SECRET!;
const COOKIE_NAME = 'spark_admin_session';
const TOKEN_TTL   = 60 * 60 * 8; // 8 hours in seconds

export interface AdminPayload {
  username: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

// ── Credential verification ────────────────────────────────────────────────

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const validUser = process.env.ADMIN_USERNAME;
  const validHash = process.env.ADMIN_PASSWORD_HASH;
  console.log(validUser, validHash)
  if (!validUser || !validHash) return false;
  if (username !== validUser) return false;
  return bcrypt.compare(password, validHash);
}

// ── JWT helpers ────────────────────────────────────────────────────────────

export function createAdminToken(username: string): string {
  return jwt.sign({ username, role: 'admin' }, JWT_SECRET, {
    expiresIn: TOKEN_TTL,
  });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

// ── Cookie helpers ─────────────────────────────────────────────────────────

export function buildAuthCookie(token: string): string {
  const isProd = process.env.NODE_ENV === 'production';
  return [
    `${COOKIE_NAME}=${token}`,
    `Max-Age=${TOKEN_TTL}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    isProd ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ');
}

export function buildClearCookie(): string {
  return `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict`;
}

// ── Request auth check ─────────────────────────────────────────────────────

export function getAdminPayload(request: Request): AdminPayload | null {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  return verifyAdminToken(decodeURIComponent(match[1]));
}

export function requireAdmin(request: Request): Response | null {
  const payload = getAdminPayload(request);
  if (!payload || payload.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Unauthorised' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return null; // authorised — caller continues
}
