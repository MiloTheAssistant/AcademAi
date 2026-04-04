# AcademAI — Stripe Members Subscription Setup

## What Was Created in Stripe (Sandbox)

| Item | ID |
|------|----|
| Product | `prod_UGtbfZnAcw1ae8` — "AcademAI Members" |
| Weekly Price | `price_1TILp5Heg8aT6eIyucrGc6S4` — $4.99 / week |
| Monthly Price | `price_1TILp5Heg8aT6eIymsvm8kcW` — $14.99 / month |
| Annual Price | `price_1TILp6Heg8aT6eIycvLkpjSy` — $99.00 / year |

All plans include a **24-hour free trial** (enforced at checkout via `trial_period_days: 1`).

---

## Files Included

```
stripe-implementation/
├── STRIPE_SETUP.md                          ← you are here
└── src/
    ├── lib/
    │   ├── stripe.ts                        ← Stripe client + price ID constants
    │   └── subscription.ts                  ← KV helpers: get/set/check subscription status
    ├── middleware.ts                         ← Route protection (replaces any existing middleware)
    └── app/
        ├── pricing/
        │   └── page.tsx                     ← Full pricing + landing page
        └── api/
            └── stripe/
                ├── checkout/
                │   └── route.ts             ← Creates Stripe Checkout sessions
                ├── webhook/
                │   └── route.ts             ← Handles Stripe webhook events
                └── portal/
                    └── route.ts             ← Opens Stripe Customer Portal
```

---

## Step 1 — Install dependencies

```bash
npm install stripe @vercel/kv
```

---

## Step 2 — Set up Vercel KV (Redis-backed storage)

Subscription status needs to be stored somewhere fast. We use **Vercel KV**:

1. Go to your Vercel project dashboard
2. Click **Storage** → **Create Database** → **KV**
3. Name it (e.g. `academai-kv`) and click Create
4. Click **Connect to Project** — this automatically adds the KV env vars to your project

The following env vars will be added automatically:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

---

## Step 3 — Add environment variables

Add these to your `.env.local` (for local dev) and your Vercel project settings (for production):

```bash
# Stripe — find these at https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Webhook Signing Secret — generated in Step 4
STRIPE_WEBHOOK_SECRET=whsec_...

# Your app's public URL
NEXT_PUBLIC_APP_URL=https://academ-ai-mu.vercel.app
# For local dev: NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 4 — Register the Stripe Webhook

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Set the URL to: `https://academ-ai-mu.vercel.app/api/stripe/webhook`
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Click **Add endpoint**
6. Copy the **Signing secret** (`whsec_...`) → paste it as `STRIPE_WEBHOOK_SECRET`

For local testing, use the [Stripe CLI](https://stripe.com/docs/stripe-cli):
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

## Step 5 — Set up Stripe Customer Portal

Members can manage their subscription (change plan, update card, cancel) through Stripe's hosted portal:

1. Go to [Stripe Dashboard → Customer Portal](https://dashboard.stripe.com/test/settings/billing/portal)
2. Enable the portal and configure which features to expose:
   - ✅ Cancel subscription
   - ✅ Update payment method
   - ✅ Switch plans (link all 3 price IDs)
3. Save changes

To open the portal from your app, call `POST /api/stripe/portal` and redirect to the returned URL.

---

## Step 6 — Copy files into the repo

Copy the files from `stripe-implementation/src/` into your repo's `src/` directory:

```bash
cp -r stripe-implementation/src/lib/stripe.ts         src/lib/stripe.ts
cp -r stripe-implementation/src/lib/subscription.ts   src/lib/subscription.ts
cp    stripe-implementation/src/middleware.ts          src/middleware.ts
cp -r stripe-implementation/src/app/pricing           src/app/pricing
cp -r stripe-implementation/src/app/api/stripe        src/app/api/stripe
```

> ⚠️ If you already have a `src/middleware.ts`, replace it — the new one handles both auth + subscription checks.

---

## Step 7 — Add "Manage Subscription" button to NavClient

In `src/components/NavClient.tsx`, add a button in the authenticated user section that calls the portal route:

```tsx
async function openPortal() {
  const res = await fetch('/api/stripe/portal', { method: 'POST' });
  const { url } = await res.json();
  window.location.href = url;
}

// Inside the signed-in nav:
<button onClick={openPortal} className="text-sm text-slate-400 hover:text-white">
  Manage Subscription
</button>
```

---

## Step 8 — Add /pricing to navigation (optional)

In `NavClient.tsx`, add a "Pricing" link to the nav for signed-out users so visitors can find the page.

---

## User Flow (end-to-end)

```
Visitor lands on site
  → Hero / home page with "Get Started" CTA pointing to /pricing

/pricing page
  → Sees 3 plans (Weekly / Monthly / Annual)
  → Clicks "Try free for 24 hours"
    → If NOT signed in: redirected to /sign-in?callbackUrl=/pricing
    → If signed in: Stripe Checkout opens
      → Collects: name, billing address, phone, email, card
      → 24-hour trial starts (no charge yet)
  → After checkout: redirected to /courses?subscription=success

Stripe webhook fires → subscription stored in Vercel KV

On subsequent visits:
  → Middleware checks KV for active subscription
  → If active: full access
  → If expired/canceled: redirected to /pricing
```

---

## Going Live

When you're ready to go live:
1. Switch all `sk_test_...` / `pk_test_...` keys to live mode keys
2. Register a new webhook endpoint in live mode
3. The price IDs above are **sandbox-only** — you'll need to re-create the product and prices in live mode and update `src/lib/stripe.ts`

---

## Next Steps (Auth Upgrade)

The next phase is replacing GitHub sign-in with Google, Microsoft, and Apple OAuth via NextAuth v5. When that's done, the subscription flow above continues to work unchanged — it uses `session.user.id` regardless of which OAuth provider was used.
