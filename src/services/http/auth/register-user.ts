import { RegisterFormSchema } from '@/validators/register-validators'
import { api } from '@/services/api'
import { getAxiosStatusCode } from '@/functions'

type RegisterUserResponse = {
  Description: string
  UserToken: string
}

export async function registerUser(
  formData: RegisterFormSchema
): Promise<RegisterUserResponse> {
  try {
    const { data } = await api.post('/auth/register', formData)
    console.log(data)
    return data
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)

    if (statusCode === 409) {
      throw new Error('User already exists')
    }

    console.log(error)
    throw new Error('Erro ao registrar usuario')
  }
}
