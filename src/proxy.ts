import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/progress(.*)',
  '/syllabus(.*)',
  '/certificates(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) return;

  // Proxy only performs the lightweight signed-in check. Paid entitlement
  // checks run in pages and route handlers where database access is safer.
  await auth.protect();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/stripe/webhook).*)'],
};
