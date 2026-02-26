import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
    description: z.string().max(500, 'Description is too long').optional(),
    status: z.enum(['todo', 'in-progress', 'done']).default('todo'),
    priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

export type TaskInput = z.infer<typeof taskSchema>;
