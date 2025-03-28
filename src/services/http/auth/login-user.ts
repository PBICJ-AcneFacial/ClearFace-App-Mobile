import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAxiosStatusCode } from '@/functions'
import { api } from '@/services/api'
import { LoginFormSchema } from '@/validators/login-validators'

type LoginUserResponse = {
  Description: string
  token: string
}

export async function loginUser(
  formData: LoginFormSchema
): Promise<LoginUserResponse> {
  try {
    const { data } = await api.post('/auth/login', formData)

    await AsyncStorage.setItem('@token', data.token)
    console.log(data.token)

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
