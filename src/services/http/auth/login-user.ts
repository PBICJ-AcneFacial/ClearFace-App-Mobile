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

    return data
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)

    switch (statusCode) {
      case 401:
        throw new Error('Senha inválida.')
      case 404:
        throw new Error('Usuário não encontrado.')
      case 500:
        throw new Error('Erro interno no servidor.')
      default:
        throw new Error('Erro desconhecido.')
    }
  }
}
