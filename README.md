This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev -- --port 3002
# or
yarn dev --port 3002
# or
pnpm dev --port 3002
# or
bun dev --port 3002
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

Local port assignment:

- Normal dev port: `3002`
- Alternate, preview, or debug port: `3003`
- Full project map: [`docs/local-port-map.md`](docs/local-port-map.md)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Integrations

Required environment variables:

```env
NEXT_PUBLIC_APP_URL=https://academai.app
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
STRIPE_PRICE_WEEKLY=...
STRIPE_PRICE_MONTHLY=...
STRIPE_PRICE_YEARLY=...
DATABASE_URL=...
# Vercel Neon Marketplace may create this instead:
syllabus_DATABASE_URL=...
AI_PROVIDER=ollama
AI_REQUEST_TIMEOUT_MS=90000
OLLAMA_BASE_URL=https://ollama.com/api
OLLAMA_API_KEY=...
OLLAMA_MODEL=deepseek-v4-flash:cloud
OLLAMA_MAX_TOKENS=4096
OLLAMA_TEMPERATURE=0.2
# Optional NVIDIA fallback:
NVIDIA_API_KEY=...
NVIDIA_NIM_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_NIM_MODEL=minimaxai/minimax-m2.7
NVIDIA_NIM_MAX_TOKENS=4096
NVIDIA_NIM_TEMPERATURE=0.3
# Optional OpenAI fallback:
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5.5
OPENAI_MAX_OUTPUT_TOKENS=4096
```

Stripe:

- Checkout is created in `src/app/api/stripe/checkout/route.ts`.
- Price ids are read from `STRIPE_PRICE_WEEKLY`, `STRIPE_PRICE_MONTHLY`, and `STRIPE_PRICE_YEARLY`, with live AcademAI Members price defaults in `src/lib/stripe.ts`.
- Stripe webhooks update Neon Postgres and Clerk private metadata in `src/app/api/stripe/webhook/route.ts`.
- Configure the production webhook endpoint as `https://academai.app/api/stripe/webhook`.
- Required events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`.

Neon Postgres:

- Apply the database schema in `docs/database/schema.sql`.
- The app reads `DATABASE_URL` first, then `syllabus_DATABASE_URL` when Neon is connected to Vercel with the `syllabus` prefix.
- `@vercel/kv` is intentionally not used; Vercel KV has been replaced with Neon Postgres for durable learning records.
- Subscription state, lesson progress, assessment attempts, generated syllabi, and certificates are stored in Postgres.
- Existing `KV_*` or `REDIS_URL` Vercel environment variables can be removed after the Neon migration is applied and the production deployment is promoted.

AI syllabus generation:

- `/syllabus` uses Ollama first when `AI_PROVIDER=ollama`.
- For Ollama Pro Cloud on Vercel, use `OLLAMA_BASE_URL=https://ollama.com/api`, set `OLLAMA_API_KEY` from the Ollama API keys page, and use `deepseek-v4-flash:cloud` as the default syllabus model.
- For local development, omit `OLLAMA_BASE_URL` to use OpenAI-compatible `http://localhost:11434/v1`, or set it to a self-hosted OpenAI-compatible Ollama endpoint.
- Ollama Cloud currently does not support structured outputs, so AcademAI prompts for JSON and validates the response before saving. Invalid or failed responses continue through the fallback chain.
- Ollama uses `OLLAMA_MODEL`, `OLLAMA_API_KEY`, `OLLAMA_MAX_TOKENS`, and `OLLAMA_TEMPERATURE`.
- NVIDIA NIM can be slower for structured syllabus JSON than recipe JSON; `AI_REQUEST_TIMEOUT_MS`, `NVIDIA_NIM_MAX_TOKENS`, and `NVIDIA_NIM_TEMPERATURE` are exposed so the provider can be tuned without code changes.
- Fallback order is based on the selected provider. With `AI_PROVIDER=ollama`, the app tries Ollama, then NVIDIA NIM, then OpenAI, then the structured template fallback.
- Set `AI_PROVIDER=openai` and add `OPENAI_API_KEY` only if you want the direct OpenAI provider first.
- A ChatGPT Pro account is not a server API credential; live OpenAI generation still requires an OpenAI API key.
- If the selected provider key is missing or the API call fails, the route saves a structured template fallback so the paid workflow still functions.

Clerk and Microsoft Graph:

- Clerk protects paid learning routes in `src/proxy.ts`.
- Microsoft Graph is called server-side from `src/lib/microsoft-graph.ts`.
- The account page at `/account` validates the Clerk user, Stripe membership, and Microsoft Graph `/me` access.
- The Clerk Microsoft connection must request Microsoft Graph delegated `User.Read` access.
- In Azure App Registration, add the exact Clerk Microsoft redirect URI as a Web redirect URI and enable ID tokens.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
