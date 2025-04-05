import { RegisterFormData } from '@/validators/register-validators'
import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/functions'

type RegisterSuccessResponse = {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
}

export async function registerUser(
  formData: RegisterFormData
): Promise<RegisterSuccessResponse> {
  try {
    const { data } = await api.post<RegisterSuccessResponse>(
      '/auth/register',
      formData
    )
    return data
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)

    switch (statusCode) {
      case 409:
        throw new Error('Usuário já existe')

      case 500:
        throw new Error('Erro interno no servidor')

      default:
        console.error(error)
        throw new Error('Erro ao registrar usuário')
    }
  }
}
