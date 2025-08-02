import z from 'zod';

export const addressFormSchema = z.object({
  region: z.string().min(2, { message: 'Region name must be at least 2 characters.' }),
  city: z.string().min(2, { message: 'City name must be at least 2 characters.' }),
  township: z.string().min(2, { message: 'Township name must be at least 2 characters.' }),
  road: z.string().min(2, { message: 'Road name must be at least 2 characters.' }),
  street: z.string().min(2, { message: 'Street name must be at least 2 characters.' }),
  lat: z.string(),
  longitude: z.string(),
  entityType: z.enum(['RESTAURANT', 'USER']),
  entityId: z.number().optional(),
});
