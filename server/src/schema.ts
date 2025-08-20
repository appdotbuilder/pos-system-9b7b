import { z } from 'zod';

// User roles enum
export const userRoleEnum = z.enum(['ADMINISTRATOR', 'CASHIER', 'MANAGER_OWNER']);
export type UserRole = z.infer<typeof userRoleEnum>;

// User schema
export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  password_hash: z.string(),
  role: userRoleEnum,
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type User = z.infer<typeof userSchema>;

// Input schemas for user operations
export const createUserInputSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: userRoleEnum
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const updateUserInputSchema = z.object({
  id: z.number(),
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: userRoleEnum.optional(),
  is_active: z.boolean().optional()
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

// Tax schema
export const taxSchema = z.object({
  id: z.number(),
  name: z.string(),
  rate: z.number(),
  description: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Tax = z.infer<typeof taxSchema>;

export const createTaxInputSchema = z.object({
  name: z.string(),
  rate: z.number().min(0).max(100),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true)
});

export type CreateTaxInput = z.infer<typeof createTaxInputSchema>;

export const updateTaxInputSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  rate: z.number().min(0).max(100).optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().optional()
});

export type UpdateTaxInput = z.infer<typeof updateTaxInputSchema>;

// Category schema
export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Category = z.infer<typeof categorySchema>;

export const createCategoryInputSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true)
});

export type CreateCategoryInput = z.infer<typeof createCategoryInputSchema>;

export const updateCategoryInputSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().optional()
});

export type UpdateCategoryInput = z.infer<typeof updateCategoryInputSchema>;

// Unit schema
export const unitSchema = z.object({
  id: z.number(),
  name: z.string(),
  symbol: z.string(),
  description: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Unit = z.infer<typeof unitSchema>;

export const createUnitInputSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true)
});

export type CreateUnitInput = z.infer<typeof createUnitInputSchema>;

export const updateUnitInputSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  symbol: z.string().optional(),
  description: z.string().nullable().optional(),
  is_active: z.boolean().optional()
});

export type UpdateUnitInput = z.infer<typeof updateUnitInputSchema>;

// Product schema
export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  barcode: z.string().nullable(),
  price: z.number(),
  cost: z.number(),
  stock_quantity: z.number().int(),
  min_stock_level: z.number().int(),
  category_id: z.number(),
  unit_id: z.number(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Product = z.infer<typeof productSchema>;

export const createProductInputSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  barcode: z.string().nullable().optional(),
  price: z.number().positive(),
  cost: z.number().nonnegative(),
  stock_quantity: z.number().int().nonnegative(),
  min_stock_level: z.number().int().nonnegative().default(0),
  category_id: z.number(),
  unit_id: z.number(),
  is_active: z.boolean().default(true)
});

export type CreateProductInput = z.infer<typeof createProductInputSchema>;

export const updateProductInputSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  barcode: z.string().nullable().optional(),
  price: z.number().positive().optional(),
  cost: z.number().nonnegative().optional(),
  stock_quantity: z.number().int().nonnegative().optional(),
  min_stock_level: z.number().int().nonnegative().optional(),
  category_id: z.number().optional(),
  unit_id: z.number().optional(),
  is_active: z.boolean().optional()
});

export type UpdateProductInput = z.infer<typeof updateProductInputSchema>;

// Supplier schema
export const supplierSchema = z.object({
  id: z.number(),
  name: z.string(),
  contact_person: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Supplier = z.infer<typeof supplierSchema>;

export const createSupplierInputSchema = z.object({
  name: z.string(),
  contact_person: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  is_active: z.boolean().default(true)
});

export type CreateSupplierInput = z.infer<typeof createSupplierInputSchema>;

export const updateSupplierInputSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  contact_person: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  is_active: z.boolean().optional()
});

export type UpdateSupplierInput = z.infer<typeof updateSupplierInputSchema>;

// Customer schema
export const customerSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Customer = z.infer<typeof customerSchema>;

export const createCustomerInputSchema = z.object({
  name: z.string(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  is_active: z.boolean().default(true)
});

export type CreateCustomerInput = z.infer<typeof createCustomerInputSchema>;

export const updateCustomerInputSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  is_active: z.boolean().optional()
});

export type UpdateCustomerInput = z.infer<typeof updateCustomerInputSchema>;

// Invoice status enum
export const invoiceStatusEnum = z.enum(['PENDING', 'COMPLETED', 'CANCELLED', 'REFUNDED']);
export type InvoiceStatus = z.infer<typeof invoiceStatusEnum>;

// Payment method enum
export const paymentMethodEnum = z.enum(['CASH', 'CARD', 'DIGITAL_WALLET', 'BANK_TRANSFER']);
export type PaymentMethod = z.infer<typeof paymentMethodEnum>;

// Invoice schema
export const invoiceSchema = z.object({
  id: z.number(),
  invoice_number: z.string(),
  customer_id: z.number().nullable(),
  cashier_id: z.number(),
  subtotal: z.number(),
  tax_amount: z.number(),
  total_amount: z.number(),
  payment_method: paymentMethodEnum,
  status: invoiceStatusEnum,
  notes: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Invoice = z.infer<typeof invoiceSchema>;

export const createInvoiceInputSchema = z.object({
  customer_id: z.number().nullable().optional(),
  cashier_id: z.number(),
  items: z.array(z.object({
    product_id: z.number(),
    quantity: z.number().positive(),
    unit_price: z.number().positive()
  })),
  payment_method: paymentMethodEnum,
  notes: z.string().nullable().optional()
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceInputSchema>;

// Invoice item schema
export const invoiceItemSchema = z.object({
  id: z.number(),
  invoice_id: z.number(),
  product_id: z.number(),
  quantity: z.number(),
  unit_price: z.number(),
  total_price: z.number(),
  created_at: z.coerce.date()
});

export type InvoiceItem = z.infer<typeof invoiceItemSchema>;

// Reports schemas
export const salesReportInputSchema = z.object({
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  product_id: z.number().optional(),
  category_id: z.number().optional(),
  cashier_id: z.number().optional()
});

export type SalesReportInput = z.infer<typeof salesReportInputSchema>;

export const salesReportSchema = z.object({
  total_sales: z.number(),
  total_invoices: z.number(),
  total_items_sold: z.number(),
  average_order_value: z.number(),
  top_products: z.array(z.object({
    product_id: z.number(),
    product_name: z.string(),
    quantity_sold: z.number(),
    total_revenue: z.number()
  })),
  sales_by_payment_method: z.array(z.object({
    payment_method: paymentMethodEnum,
    total_amount: z.number(),
    count: z.number()
  }))
});

export type SalesReport = z.infer<typeof salesReportSchema>;

// Dashboard statistics schema
export const dashboardStatsSchema = z.object({
  today_sales: z.number(),
  today_invoices: z.number(),
  low_stock_products: z.number(),
  active_products: z.number(),
  recent_sales: z.array(z.object({
    invoice_id: z.number(),
    invoice_number: z.string(),
    total_amount: z.number(),
    customer_name: z.string().nullable(),
    created_at: z.coerce.date()
  }))
});

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;