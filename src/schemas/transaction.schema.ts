import { z } from 'zod';

export const postTopupSchema = z.object({
    body: z.object({
        top_up_amount: z.number().min(1, 'Jumlah top-up harus lebih besar dari 0'),
    }).strip(),
});

export type PostTopupBody = z.infer<typeof postTopupSchema>['body'];

export const postTransactionSchema = z.object({
    body: z.object({
        service_code: z.string().min(1, 'service_code tidak boleh kosong'),
    }).strip(),
});

export type PostTransactionBody = z.infer<typeof postTransactionSchema>['body'];

export const getTransactionHistorySchema = z.object({
    query: z.object({
        limit: z.number().min(1).optional(),
        offset: z.number().min(0).optional()
    })
});

export type GetTransactionHistoryQuery = z.infer<typeof getTransactionHistorySchema>['query'];