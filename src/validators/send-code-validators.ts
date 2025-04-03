import { z } from 'zod'

export const sendCodeFormSchema = z
  .object({
    refCode: z.string().min(1, 'Digite o código válido.'),
    newPassword: z.string().min(6, 'A senha ter no mínimo 6 caracteres.'),
    confirmNewPassword: z.string().min(6, 'Confirme sua senha.'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas precisam coincidir.',
    path: ['confirmPassword'],
  })

export type SendCodeFormSchema = z.infer<typeof sendCodeFormSchema>
export type SendCodeFormData = Omit<SendCodeFormSchema, 'confirmNewPassword'>