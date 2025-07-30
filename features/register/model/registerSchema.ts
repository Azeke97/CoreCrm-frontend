// features/auth/register/model/registerSchema.ts
import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string().min(2, 'Имя слишком короткое'),
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Минимум 6 символов'),
    password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
    message: 'Пароли не совпадают',
    path: ['password_confirmation'],
})