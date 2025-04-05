import { getAxiosStatusCode } from '@/functions'
import { api } from '@/services/api'
import { SendEmailFormSchema } from '@/validators/send-email-validators'

type SendEmailUserResponse = {
  Description: string
}

export async function sendEmailUser(
  formData: SendEmailFormSchema
): Promise<SendEmailUserResponse> {
  try {
    const response = await api.post('/auth/recover', formData)

    return response.data
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)

    switch (statusCode) {
      case 404:
        throw new Error('Usuário não encontrado.')
      case 500:
        throw new Error('Erro interno no servidor.')
      default:
        throw new Error('Erro desconhecido.')
    }
  }
}
