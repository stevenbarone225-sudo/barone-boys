import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createPreOrder, subscribeToMailingList } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  preOrder: router({
    submit: publicProcedure
      .input(z.object({
        customerName: z.string().min(1).max(255),
        email: z.string().email().max(320),
        quantity: z.number().int().min(1).max(50),
        fulfillment: z.enum(["pickup", "delivery"]),
        notes: z.string().max(1000).optional(),
      }))
      .mutation(async ({ input }) => {
        // 1. Save to database (required)
        await createPreOrder({
          customerName: input.customerName,
          email: input.email,
          quantity: input.quantity,
          fulfillment: input.fulfillment,
          notes: input.notes ?? null,
        });
        // 2. Notify owner via Manus notification service (required — log failure but don't block the customer)
        const notified = await notifyOwner({
          title: `🥧 New Pre-Order: ${input.customerName}`,
          content: `Name: ${input.customerName}\nEmail: ${input.email}\nQuantity: ${input.quantity} pie(s)\nFulfillment: ${input.fulfillment}\nNotes: ${input.notes ?? "None"}`,
        });
        if (!notified) {
          console.error(`[PreOrder] Owner notification failed for order from ${input.email} — order was saved to DB.`);
        }
        return { success: true, notified };
      }),
  }),

  mailingList: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email().max(320),
      }))
      .mutation(async ({ input }) => {
        const result = await subscribeToMailingList(input.email);
        return result;
      }),
  }),
});

export type AppRouter = typeof appRouter;
