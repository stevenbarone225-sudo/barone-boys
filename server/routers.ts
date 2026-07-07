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
        phone: z.string().max(30).optional(),
        quantity: z.number().int().min(1).max(50),
        fulfillment: z.enum(["pickup", "delivery"]),
        notes: z.string().max(1000).optional(),
      }))
      .mutation(async ({ input }) => {
        // 1. Save to database
        await createPreOrder({
          customerName: input.customerName,
          email: input.email,
          phone: input.phone ?? null,
          quantity: input.quantity,
          fulfillment: input.fulfillment,
          notes: input.notes ?? null,
        });
        // 2. Notify owner
        const notified = await notifyOwner({
          title: `🥧 New Pre-Order: ${input.customerName}`,
          content: `Name: ${input.customerName}\nEmail: ${input.email}\nPhone: ${input.phone ?? "N/A"}\nQuantity: ${input.quantity} pie(s)\nFulfillment: ${input.fulfillment}\nNotes: ${input.notes ?? "None"}`,
        });
        if (!notified) {
          console.error(`[PreOrder] Owner notification failed for order from ${input.email} — order was saved to DB.`);
        }
        return { success: true, notified };
      }),
  }),

  mailingList: router({
    subscribe: publicProcedure
      .input(z.object({ email: z.string().email().max(320) }))
      .mutation(async ({ input }) => {
        return subscribeToMailingList(input.email);
      }),
  }),
});

export type AppRouter = typeof appRouter;
