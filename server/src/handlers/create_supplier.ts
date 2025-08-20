import { type CreateSupplierInput, type Supplier } from '../schema';

export async function createSupplier(input: CreateSupplierInput): Promise<Supplier> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is creating a new supplier and persisting it in the database.
    // Should validate email format if provided and handle nullable fields properly.
    return Promise.resolve({
        id: 0,
        name: input.name,
        contact_person: input.contact_person || null,
        email: input.email || null,
        phone: input.phone || null,
        address: input.address || null,
        is_active: input.is_active ?? true,
        created_at: new Date(),
        updated_at: new Date()
    } as Supplier);
}