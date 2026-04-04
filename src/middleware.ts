/**
 * Next.js Middleware — route protection for Members-Only content.
 *
 * Logic:
 *   1. Public routes (/  /about  /pricing  /sign-in  /api/stripe/webhook) pass through freely.
 *   2. Protected routes (/courses  /paths  /progress) require authentication.
 *   3. Authenticated users without an active subscription are bounced to /pricing.
 *
 * NOTE: The Stripe webhook route MUST be excluded from auth middleware
 * so Stripe can POST to it without a session cookie.
 */
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { kv } from '@vercel/kv';
import { isSubscriptionActive } from '@/lib/subscription';
import type { SubscriptionData } from '@/lib/subscription';

const PROTECTED_PREFIXES = ['/courses', '/paths', '/progress'];

export default auth(async function middleware(req: NextRequest & { auth: { user?: { id?: string } } | null }) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const session = (req as any).auth;

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!isProtected) return NextResponse.next();

  // --- Must be signed in ---
  if (!session?.user?.id) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // --- Must have an active subscription ---
  const sub = await kv.get<SubscriptionData>(`sub:${session.user.id}`);
  if (!isSubscriptionActive(sub)) {
    return NextResponse.redirect(new URL('/pricing', req.url));
  }

  return NextResponse.next();
});

// Match all routes EXCEPT static assets and the Stripe webhook endpoint
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/stripe/webhook).*)'],
};
