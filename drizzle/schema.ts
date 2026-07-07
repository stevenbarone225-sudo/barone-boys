import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const preOrders = mysqlTable("pre_orders", {
  id: int("id").autoincrement().primaryKey(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  quantity: int("quantity").notNull().default(1),
  fulfillment: mysqlEnum("fulfillment", ["pickup", "delivery"]).notNull().default("pickup"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PreOrder = typeof preOrders.$inferSelect;
export type InsertPreOrder = typeof preOrders.$inferInsert;

export const mailingList = mysqlTable("mailing_list", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MailingListEntry = typeof mailingList.$inferSelect;
export type InsertMailingListEntry = typeof mailingList.$inferInsert;
