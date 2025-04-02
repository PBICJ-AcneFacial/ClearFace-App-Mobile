import { z } from 'zod'

export const sendCodeFormSchema = z.object({
  refCode: z.string().min(1, 'Digite o código válido.'),
  newPassword: z.string().min(3, 'A senha ter no mínimo 3 caracteres.'),
})

export type SendCodeFormSchema = z.infer<typeof sendCodeFormSchema>
