import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAxiosStatusCode } from '@/functions'
import { api } from '@/services/api'

type LoginUserResponse = {
  Description: string
  token: string
}

export async function createConsultation(
  imageId: string
): Promise<LoginUserResponse> {
  try {
    const token = await AsyncStorage.getItem('@token')
    console.log(token)

    const { data } = await api.post(
      '/consultas',
      {
        image_id: imageId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

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
