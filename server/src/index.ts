import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import all schemas
import {
  createUserInputSchema,
  updateUserInputSchema,
  createTaxInputSchema,
  updateTaxInputSchema,
  createCategoryInputSchema,
  updateCategoryInputSchema,
  createUnitInputSchema,
  updateUnitInputSchema,
  createProductInputSchema,
  updateProductInputSchema,
  createSupplierInputSchema,
  updateSupplierInputSchema,
  createCustomerInputSchema,
  updateCustomerInputSchema,
  createInvoiceInputSchema,
  salesReportInputSchema,
  invoiceStatusEnum
} from './schema';

// Import all handlers
import { createUser } from './handlers/create_user';
import { getUsers } from './handlers/get_users';
import { updateUser } from './handlers/update_user';
import { deleteUser } from './handlers/delete_user';

import { createTax } from './handlers/create_tax';
import { getTaxes } from './handlers/get_taxes';
import { updateTax } from './handlers/update_tax';
import { deleteTax } from './handlers/delete_tax';

import { createCategory } from './handlers/create_category';
import { getCategories } from './handlers/get_categories';
import { updateCategory } from './handlers/update_category';
import { deleteCategory } from './handlers/delete_category';

import { createUnit } from './handlers/create_unit';
import { getUnits } from './handlers/get_units';
import { updateUnit } from './handlers/update_unit';
import { deleteUnit } from './handlers/delete_unit';

import { createProduct } from './handlers/create_product';
import { getProducts } from './handlers/get_products';
import { getProductByBarcode } from './handlers/get_product_by_barcode';
import { updateProduct } from './handlers/update_product';
import { deleteProduct } from './handlers/delete_product';
import { getLowStockProducts } from './handlers/get_low_stock_products';

import { createSupplier } from './handlers/create_supplier';
import { getSuppliers } from './handlers/get_suppliers';
import { updateSupplier } from './handlers/update_supplier';
import { deleteSupplier } from './handlers/delete_supplier';

import { createCustomer } from './handlers/create_customer';
import { getCustomers } from './handlers/get_customers';
import { updateCustomer } from './handlers/update_customer';
import { deleteCustomer } from './handlers/delete_customer';

import { createInvoice } from './handlers/create_invoice';
import { getInvoices } from './handlers/get_invoices';
import { getInvoiceById } from './handlers/get_invoice_by_id';
import { updateInvoiceStatus } from './handlers/update_invoice_status';

import { getSalesReport } from './handlers/get_sales_report';
import { getDashboardStats } from './handlers/get_dashboard_stats';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // User management routes (Administrator only)
  createUser: publicProcedure
    .input(createUserInputSchema)
    .mutation(({ input }) => createUser(input)),
  
  getUsers: publicProcedure
    .query(() => getUsers()),
  
  updateUser: publicProcedure
    .input(updateUserInputSchema)
    .mutation(({ input }) => updateUser(input)),
  
  deleteUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteUser(input.id)),

  // Tax management routes (Administrator full access, Manager/Owner view only)
  createTax: publicProcedure
    .input(createTaxInputSchema)
    .mutation(({ input }) => createTax(input)),
  
  getTaxes: publicProcedure
    .query(() => getTaxes()),
  
  updateTax: publicProcedure
    .input(updateTaxInputSchema)
    .mutation(({ input }) => updateTax(input)),
  
  deleteTax: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteTax(input.id)),

  // Category management routes (Administrator full access, Manager/Owner view only)
  createCategory: publicProcedure
    .input(createCategoryInputSchema)
    .mutation(({ input }) => createCategory(input)),
  
  getCategories: publicProcedure
    .query(() => getCategories()),
  
  updateCategory: publicProcedure
    .input(updateCategoryInputSchema)
    .mutation(({ input }) => updateCategory(input)),
  
  deleteCategory: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteCategory(input.id)),

  // Unit management routes (Administrator full access, Manager/Owner view only)
  createUnit: publicProcedure
    .input(createUnitInputSchema)
    .mutation(({ input }) => createUnit(input)),
  
  getUnits: publicProcedure
    .query(() => getUnits()),
  
  updateUnit: publicProcedure
    .input(updateUnitInputSchema)
    .mutation(({ input }) => updateUnit(input)),
  
  deleteUnit: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteUnit(input.id)),

  // Product management routes (Administrator full access, Manager/Owner view only)
  createProduct: publicProcedure
    .input(createProductInputSchema)
    .mutation(({ input }) => createProduct(input)),
  
  getProducts: publicProcedure
    .query(() => getProducts()),
  
  getProductByBarcode: publicProcedure
    .input(z.object({ barcode: z.string() }))
    .query(({ input }) => getProductByBarcode(input.barcode)),
  
  updateProduct: publicProcedure
    .input(updateProductInputSchema)
    .mutation(({ input }) => updateProduct(input)),
  
  deleteProduct: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteProduct(input.id)),
  
  getLowStockProducts: publicProcedure
    .query(() => getLowStockProducts()),

  // Supplier management routes (Administrator only)
  createSupplier: publicProcedure
    .input(createSupplierInputSchema)
    .mutation(({ input }) => createSupplier(input)),
  
  getSuppliers: publicProcedure
    .query(() => getSuppliers()),
  
  updateSupplier: publicProcedure
    .input(updateSupplierInputSchema)
    .mutation(({ input }) => updateSupplier(input)),
  
  deleteSupplier: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteSupplier(input.id)),

  // Customer management routes (Administrator only)
  createCustomer: publicProcedure
    .input(createCustomerInputSchema)
    .mutation(({ input }) => createCustomer(input)),
  
  getCustomers: publicProcedure
    .query(() => getCustomers()),
  
  updateCustomer: publicProcedure
    .input(updateCustomerInputSchema)
    .mutation(({ input }) => updateCustomer(input)),
  
  deleteCustomer: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteCustomer(input.id)),

  // Invoice/Sales management routes (Administrator and Cashier access, Manager/Owner view only)
  createInvoice: publicProcedure
    .input(createInvoiceInputSchema)
    .mutation(({ input }) => createInvoice(input)),
  
  getInvoices: publicProcedure
    .query(() => getInvoices()),
  
  getInvoiceById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getInvoiceById(input.id)),
  
  updateInvoiceStatus: publicProcedure
    .input(z.object({ 
      id: z.number(), 
      status: invoiceStatusEnum 
    }))
    .mutation(({ input }) => updateInvoiceStatus(input.id, input.status)),

  // Reports routes (Administrator and Manager/Owner access)
  getSalesReport: publicProcedure
    .input(salesReportInputSchema)
    .query(({ input }) => getSalesReport(input)),

  // Dashboard routes (All roles have access)
  getDashboardStats: publicProcedure
    .query(() => getDashboardStats()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`POS TRPC server listening at port: ${port}`);
  console.log('Available routes:');
  console.log('- User Management: createUser, getUsers, updateUser, deleteUser');
  console.log('- Tax Management: createTax, getTaxes, updateTax, deleteTax');
  console.log('- Category Management: createCategory, getCategories, updateCategory, deleteCategory');
  console.log('- Unit Management: createUnit, getUnits, updateUnit, deleteUnit');
  console.log('- Product Management: createProduct, getProducts, getProductByBarcode, updateProduct, deleteProduct, getLowStockProducts');
  console.log('- Supplier Management: createSupplier, getSuppliers, updateSupplier, deleteSupplier');
  console.log('- Customer Management: createCustomer, getCustomers, updateCustomer, deleteCustomer');
  console.log('- Invoice/Sales: createInvoice, getInvoices, getInvoiceById, updateInvoiceStatus');
  console.log('- Reports: getSalesReport');
  console.log('- Dashboard: getDashboardStats');
}

start();