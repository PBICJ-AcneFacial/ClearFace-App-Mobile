import { getAxiosStatusCode } from '@/functions'
import { api } from '@/services/api'
import { SendCodeFormData } from '@/validators/send-code-validators'

export async function sendCodeUser(
  formData: SendCodeFormData
) {
  try {
    const { data } = await api.put('/auth/password', formData)

    return data
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)

    switch (statusCode) {
      case 400:
        throw new Error('Código de verificação inválido.')
      case 500:
        throw new Error('Erro interno no servidor.')
      default:
        throw new Error('Erro desconhecido.')
    }
  }
}
