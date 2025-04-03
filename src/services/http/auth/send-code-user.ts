import { getAxiosStatusCode } from '@/functions'
import { api } from '@/services/api'
import { SendCodeFormData, SendCodeFormSchema } from '@/validators/send-code-validators'

export async function sendCodeUser(
  formData: SendCodeFormData
) {
  try {
    const { data } = await api.put('/auth/password', formData)

    return data
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)

    if (statusCode === 401) {
      throw new Error('Invalid password')
    }

    console.log(error)
    throw new Error('Login erro to user')
  }
}
