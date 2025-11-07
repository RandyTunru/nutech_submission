import { z } from 'zod';

export const updateProfileSchema = z.object({
    body: z.object({
        first_name: z.string().min(1, 'first_name tidak boleh kosong'),
        last_name: z.string().min(1, 'last_name tidak boleh kosong'),
    }).strip(),
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>['body'];
