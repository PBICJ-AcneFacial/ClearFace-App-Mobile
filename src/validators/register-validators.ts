import { z } from 'zod'

export const registerFormSchema = z
  .object({
    email: z.string().email('Digite o email corretamente.'),
    password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres.'),
    name: z.string().min(3, 'Digite no mínimo 3 caracteres.'),
    confirmPassword: z.string().min(6, 'Confirme sua senha.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas precisam coincidir.',
    path: ['confirmPassword'],
  })

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
export type RegisterFormData = Omit<RegisterFormSchema, 'confirmPassword'>