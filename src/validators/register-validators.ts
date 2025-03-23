import { z } from 'zod'

export const registerFormSchema = z.object({
  email: z.string().email('Digite o email corretamente.'),
  password: z.string().min(1, 'A senha deve conter pelo menos 3 caracteres.'),
  name: z.string().min(1, 'Digite no mínimo 3 caracteres.'),
})

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
