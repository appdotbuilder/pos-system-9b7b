import { type CreateTaxInput, type Tax } from '../schema';

export async function createTax(input: CreateTaxInput): Promise<Tax> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is creating a new tax rate and persisting it in the database.
    // Should validate tax rate is within acceptable range (0-100%).
    return Promise.resolve({
        id: 0,
        name: input.name,
        rate: input.rate,
        description: input.description || null,
        is_active: input.is_active ?? true,
        created_at: new Date(),
        updated_at: new Date()
    } as Tax);
}