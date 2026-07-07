import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

vi.mock("./db", () => ({
  createPreOrder: vi.fn().mockResolvedValue({ insertId: 1 }),
  subscribeToMailingList: vi.fn().mockResolvedValue({ success: true, alreadySubscribed: false }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function makeCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("preOrder.submit", () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it("accepts a valid pickup pre-order with phone", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.preOrder.submit({
      customerName: "Maria Rossi",
      email: "maria@example.com",
      phone: "609-555-0100",
      quantity: 2,
      fulfillment: "pickup",
    });
    expect(result.success).toBe(true);
  });

  it("accepts a valid delivery pre-order without phone", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.preOrder.submit({
      customerName: "Giuseppe Barone",
      email: "giuseppe@example.com",
      quantity: 1,
      fulfillment: "delivery",
      notes: "Please call ahead",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty customer name", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(caller.preOrder.submit({
      customerName: "",
      email: "test@example.com",
      quantity: 1,
      fulfillment: "pickup",
    })).rejects.toThrow();
  });

  it("rejects invalid email", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(caller.preOrder.submit({
      customerName: "Test User",
      email: "not-an-email",
      quantity: 1,
      fulfillment: "pickup",
    })).rejects.toThrow();
  });

  it("rejects quantity of 0", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(caller.preOrder.submit({
      customerName: "Test User",
      email: "test@example.com",
      quantity: 0,
      fulfillment: "pickup",
    })).rejects.toThrow();
  });
});

describe("mailingList.subscribe", () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it("subscribes a new email", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.mailingList.subscribe({ email: "new@example.com" });
    expect(result.success).toBe(true);
    expect(result.alreadySubscribed).toBe(false);
  });

  it("rejects invalid email", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(caller.mailingList.subscribe({ email: "bad-email" })).rejects.toThrow();
  });
});
