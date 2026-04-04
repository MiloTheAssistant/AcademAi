# AcademAI — Clerk Auth Setup

Clerk replaces NextAuth entirely. No manual OAuth app registration needed —
Google, Microsoft, and Apple are toggled on in the Clerk dashboard in seconds.

---

## Files Included

```
clerk-implementation/
├── CLERK_SETUP.md
└── src/
    ├── middleware.ts                              ← replaces existing middleware.ts
    └── app/
        ├── sign-in/
        │   └── [[...sign-in]]/
        │       └── page.tsx                       ← replaces existing sign-in/page.tsx
        ├── sign-up/
        │   └── [[...sign-up]]/
        │       └── page.tsx                       ← new page
        └── api/
            └── stripe/
                ├── checkout/
                │   └── route.ts                   ← updated to use Clerk auth
                └── portal/
                    └── route.ts                   ← updated to use Clerk auth
```

---

## Step 1 — Create a Clerk account

1. Go to [clerk.com](https://clerk.com) and sign up (free)
2. Click **Create application**
3. Name it `AcademAI`
4. On the provider screen, enable:
   - ✅ Google
   - ✅ Microsoft
   - ✅ Apple
   - (disable Email if you only want social sign-in, or keep it for flexibility)
5. Click **Create application**

That's it — Clerk handles all the OAuth plumbing for all three providers automatically.

---

## Step 2 — Get your API keys

In the Clerk dashboard → **API Keys**:

Copy:
- **Publishable key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- **Secret key** → `CLERK_SECRET_KEY`

---

## Step 3 — Add env vars to Vercel

In your Vercel project → **Settings** → **Environment Variables**, add:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_live_...` (or `pk_test_...` for dev) |
| `CLERK_SECRET_KEY` | `sk_live_...` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/courses` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/pricing` |

The last one sends new sign-ups to /pricing so they subscribe right after creating their account.

Also add the same vars to your local `.env.local` for development.

---

## Step 4 — Install Clerk and remove NextAuth

```bash
npm install @clerk/nextjs
npm uninstall next-auth
```

---

## Step 5 — Wrap your layout with ClerkProvider

Open `src/app/layout.tsx` and make this one change:

```tsx
// Add this import at the top:
import { ClerkProvider } from '@clerk/nextjs';

// Wrap your existing <html> tag:
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* your existing layout content */}
        </body>
      </html>
    </ClerkProvider>
  );
}
```

---

## Step 6 — Copy the implementation files

```bash
# Replace middleware
cp clerk-implementation/src/middleware.ts src/middleware.ts

# Replace sign-in page (note the new folder structure)
mkdir -p src/app/sign-in/'[[...sign-in]]'
cp clerk-implementation/src/app/sign-in/'[[...sign-in]]'/page.tsx \
   src/app/sign-in/'[[...sign-in]]'/page.tsx

# Add sign-up page
mkdir -p src/app/sign-up/'[[...sign-up]]'
cp clerk-implementation/src/app/sign-up/'[[...sign-up]]'/page.tsx \
   src/app/sign-up/'[[...sign-up]]'/page.tsx

# Update Stripe API routes
cp clerk-implementation/src/app/api/stripe/checkout/route.ts \
   src/app/api/stripe/checkout/route.ts
cp clerk-implementation/src/app/api/stripe/portal/route.ts \
   src/app/api/stripe/portal/route.ts
```

## Step 7 — Delete files that are no longer needed

```bash
rm src/auth.ts
rm -rf src/app/api/auth          # removes [...nextauth] route handler
rm -rf src/app/sign-in/page.tsx  # replaced by [[...sign-in]]/page.tsx
```

---

## Step 8 — Update NavClient.tsx

Replace any references to NextAuth's `signIn`/`signOut`/`useSession` with Clerk equivalents.

**Before (NextAuth):**
```tsx
import { signOut } from '@/auth';
// ...
<form action={async () => { "use server"; await signOut(); }}>
  <button>Sign out</button>
</form>
```

**After (Clerk):**
```tsx
import { SignOutButton, useUser } from '@clerk/nextjs';
// ...
const { user, isSignedIn } = useUser();

{isSignedIn ? (
  <>
    <img src={user.imageUrl} className="w-8 h-8 rounded-full" />
    <SignOutButton>
      <button>Sign out</button>
    </SignOutButton>
  </>
) : (
  <a href="/sign-in">Sign In</a>
)}
```

---

## Step 9 — Deploy and test

1. Push to main → Vercel deploys
2. Visit `https://academai.app/courses` → redirects to sign-in
3. Sign in with Google → lands on /pricing (no subscription yet)
4. Click a plan → Stripe checkout → complete trial
5. Webhook fires → subscription stored in KV → /courses unlocked

---

## Clerk Dashboard features you get for free

- **User list** — see every member, their sign-in method, last active date
- **Impersonation** — sign in as any user for support
- **Block/delete users** — from the dashboard, no code needed
- **Webhooks** — get notified when users are created, deleted, updated
- **Multi-factor auth** — toggle on with one click if needed later

---

## Notes

**Apple on localhost:** Apple OAuth only works on a real domain. Use Google or Microsoft for local testing and test Apple on the live `academai.app` URL.

**Free tier:** Clerk's free plan covers 10,000 monthly active users — well beyond what you'll need for a long time.

**Account linking:** If a user signs in with Google one day and Microsoft another, Clerk can link them to the same account if they share the same email address. This is configurable in Dashboard → User & Authentication → Email, Phone, Username.
