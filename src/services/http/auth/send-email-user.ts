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

    if (statusCode === 401) {
      throw new Error('Invalid password')
    }

    console.log(error)
    throw new Error('Login error to user')
  }
}
