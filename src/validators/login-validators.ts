import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email('Digite o email corretamente.'),
  password: z.string().min(1, 'Digite sua senha.'),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>