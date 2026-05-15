import { afterEach, describe, expect, it, vi } from "vitest";

const originalEnv = process.env;

describe("Stripe price configuration", () => {
  afterEach(() => {
    process.env = originalEnv;
    vi.resetModules();
  });

  it("uses the active AcademAI Members prices by default", async () => {
    process.env = {
      ...originalEnv,
      STRIPE_PRICE_WEEKLY: "",
      STRIPE_PRICE_MONTHLY: "",
      STRIPE_PRICE_YEARLY: "",
    };
    vi.resetModules();

    const { STRIPE_PRICES } = await import("./stripe");

    expect(STRIPE_PRICES).toEqual({
      weekly: "price_1TINCbHYoNGH7WzgYNFDjvnZ",
      monthly: "price_1TINCaHYoNGH7WzgLeESzvJJ",
      yearly: "price_1TINCZHYoNGH7WzgxaLLj2Ap",
    });
  });

  it("allows Vercel env vars to override price ids", async () => {
    process.env = {
      ...originalEnv,
      STRIPE_PRICE_WEEKLY: "price_weekly_override",
      STRIPE_PRICE_MONTHLY: "price_monthly_override",
      STRIPE_PRICE_YEARLY: "price_yearly_override",
    };
    vi.resetModules();

    const { STRIPE_PRICES } = await import("./stripe");

    expect(STRIPE_PRICES).toEqual({
      weekly: "price_weekly_override",
      monthly: "price_monthly_override",
      yearly: "price_yearly_override",
    });
  });
});
