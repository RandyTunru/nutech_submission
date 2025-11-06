import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.email("Parameter email tidak sesuai format"),
    first_name: z.string().min(1, "Parameter first_name tidak boleh kosong").max(50, "Parameter first_name maksimal 50 karakter"),
    last_name: z.string().min(1, "Parameter last_name tidak boleh kosong").max(50, "Parameter last_name maksimal 50 karakter"),
    password: z.string().min(8, "Parameter password harus memiliki minimal 8 karakter").max(100, "Parameter password maksimal 100 karakter"),
  }).strip(),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email("Parameter email tidak sesuai format"),
    password: z.string().min(8, "Parameter password harus memiliki minimal 8 karakter").max(100, "Parameter password maksimal 100 karakter"),
  }).strip(),
});

export type RegisterBody = z.infer<typeof registerSchema>['body'];
export type LoginBody = z.infer<typeof loginSchema>['body'];