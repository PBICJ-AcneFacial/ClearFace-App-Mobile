import { z } from 'zod'

export const sendCodeFormSchema = z.object({
  email: z.string().min(1, 'Digite o código válido.'),
})

export type SendCodeFormSchema = z.infer<typeof sendCodeFormSchema>