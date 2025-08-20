import { type CreateCustomerInput, type Customer } from '../schema';

export async function createCustomer(input: CreateCustomerInput): Promise<Customer> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is creating a new customer and persisting it in the database.
    // Should validate email format if provided and handle nullable fields properly.
    return Promise.resolve({
        id: 0,
        name: input.name,
        email: input.email || null,
        phone: input.phone || null,
        address: input.address || null,
        is_active: input.is_active ?? true,
        created_at: new Date(),
        updated_at: new Date()
    } as Customer);
}