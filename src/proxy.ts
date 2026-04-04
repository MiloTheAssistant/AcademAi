import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { isSubscriptionActive } from '@/lib/subscription';
import type { SubscriptionData } from '@/lib/subscription';

const isProtectedRoute = createRouteMatcher([
  '/courses(.*)',
  '/paths(.*)',
  '/progress(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) return;

  // Redirects to /sign-in automatically if not authenticated
  const { userId } = await auth.protect();

  // Require an active subscription
  const sub = await kv.get<SubscriptionData>(`sub:${userId}`);
  if (!isSubscriptionActive(sub)) {
    return NextResponse.redirect(new URL('/pricing', req.url));
  }
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/stripe/webhook).*)'],
};
