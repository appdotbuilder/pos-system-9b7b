import { serial, text, pgTable, timestamp, numeric, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['ADMINISTRATOR', 'CASHIER', 'MANAGER_OWNER']);
export const invoiceStatusEnum = pgEnum('invoice_status', ['PENDING', 'COMPLETED', 'CANCELLED', 'REFUNDED']);
export const paymentMethodEnum = pgEnum('payment_method', ['CASH', 'CARD', 'DIGITAL_WALLET', 'BANK_TRANSFER']);

// Users table
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  role: userRoleEnum('role').notNull(),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Taxes table
export const taxesTable = pgTable('taxes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  rate: numeric('rate', { precision: 5, scale: 2 }).notNull(),
  description: text('description'),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Categories table
export const categoriesTable = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Units table
export const unitsTable = pgTable('units', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  symbol: text('symbol').notNull(),
  description: text('description'),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Suppliers table
export const suppliersTable = pgTable('suppliers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  contact_person: text('contact_person'),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Customers table
export const customersTable = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Products table
export const productsTable = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  barcode: text('barcode'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  cost: numeric('cost', { precision: 10, scale: 2 }).notNull(),
  stock_quantity: integer('stock_quantity').notNull(),
  min_stock_level: integer('min_stock_level').notNull().default(0),
  category_id: integer('category_id').notNull().references(() => categoriesTable.id),
  unit_id: integer('unit_id').notNull().references(() => unitsTable.id),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Invoices table
export const invoicesTable = pgTable('invoices', {
  id: serial('id').primaryKey(),
  invoice_number: text('invoice_number').notNull().unique(),
  customer_id: integer('customer_id').references(() => customersTable.id),
  cashier_id: integer('cashier_id').notNull().references(() => usersTable.id),
  subtotal: numeric('subtotal', { precision: 10, scale: 2 }).notNull(),
  tax_amount: numeric('tax_amount', { precision: 10, scale: 2 }).notNull(),
  total_amount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  payment_method: paymentMethodEnum('payment_method').notNull(),
  status: invoiceStatusEnum('status').notNull().default('PENDING'),
  notes: text('notes'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Invoice items table
export const invoiceItemsTable = pgTable('invoice_items', {
  id: serial('id').primaryKey(),
  invoice_id: integer('invoice_id').notNull().references(() => invoicesTable.id),
  product_id: integer('product_id').notNull().references(() => productsTable.id),
  quantity: numeric('quantity', { precision: 10, scale: 2 }).notNull(),
  unit_price: numeric('unit_price', { precision: 10, scale: 2 }).notNull(),
  total_price: numeric('total_price', { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  invoices: many(invoicesTable),
}));

export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
  products: many(productsTable),
}));

export const unitsRelations = relations(unitsTable, ({ many }) => ({
  products: many(productsTable),
}));

export const customersRelations = relations(customersTable, ({ many }) => ({
  invoices: many(invoicesTable),
}));

export const productsRelations = relations(productsTable, ({ one, many }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.category_id],
    references: [categoriesTable.id],
  }),
  unit: one(unitsTable, {
    fields: [productsTable.unit_id],
    references: [unitsTable.id],
  }),
  invoiceItems: many(invoiceItemsTable),
}));

export const invoicesRelations = relations(invoicesTable, ({ one, many }) => ({
  customer: one(customersTable, {
    fields: [invoicesTable.customer_id],
    references: [customersTable.id],
  }),
  cashier: one(usersTable, {
    fields: [invoicesTable.cashier_id],
    references: [usersTable.id],
  }),
  items: many(invoiceItemsTable),
}));

export const invoiceItemsRelations = relations(invoiceItemsTable, ({ one }) => ({
  invoice: one(invoicesTable, {
    fields: [invoiceItemsTable.invoice_id],
    references: [invoicesTable.id],
  }),
  product: one(productsTable, {
    fields: [invoiceItemsTable.product_id],
    references: [productsTable.id],
  }),
}));

// TypeScript types for tables
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type Tax = typeof taxesTable.$inferSelect;
export type NewTax = typeof taxesTable.$inferInsert;

export type Category = typeof categoriesTable.$inferSelect;
export type NewCategory = typeof categoriesTable.$inferInsert;

export type Unit = typeof unitsTable.$inferSelect;
export type NewUnit = typeof unitsTable.$inferInsert;

export type Supplier = typeof suppliersTable.$inferSelect;
export type NewSupplier = typeof suppliersTable.$inferInsert;

export type Customer = typeof customersTable.$inferSelect;
export type NewCustomer = typeof customersTable.$inferInsert;

export type Product = typeof productsTable.$inferSelect;
export type NewProduct = typeof productsTable.$inferInsert;

export type Invoice = typeof invoicesTable.$inferSelect;
export type NewInvoice = typeof invoicesTable.$inferInsert;

export type InvoiceItem = typeof invoiceItemsTable.$inferSelect;
export type NewInvoiceItem = typeof invoiceItemsTable.$inferInsert;

// Export all tables for proper query building
export const tables = {
  users: usersTable,
  taxes: taxesTable,
  categories: categoriesTable,
  units: unitsTable,
  suppliers: suppliersTable,
  customers: customersTable,
  products: productsTable,
  invoices: invoicesTable,
  invoiceItems: invoiceItemsTable,
};