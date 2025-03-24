import { api } from '@/services/api'
import { LoginFormSchema } from '@/validators/login-validators'
import AsyncStorage from '@react-native-async-storage/async-storage'

type LoginUserResponse = {
  Description: string
  token: string
}

export async function uploadImage(
  formData: LoginFormSchema
): Promise<LoginUserResponse> {
  try {
    const { data } = await api.post('/auth/login', formData)

    await AsyncStorage.setItem('@token', data.token)
    console.log(data.token)

    return data
  } catch (error) {
    console.log(error)
    throw new Error('Login erro to user')
  }
}
