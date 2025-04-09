import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAxiosStatusCode } from '@/functions'
import { api } from '@/services/api'

export async function uploadImageToConsultation(imageId: string) {
  try {
    const token = await AsyncStorage.getItem('@token')
    console.log(token)

    const { data } = await api.put(
      '/consultas/solve',
      {
        image_id: imageId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    console.log('Upload Image Data: ', data)
    return data
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)

    if (statusCode === 401) {
      throw new Error('Invalid password')
    }

    console.log(error)
    throw new Error('Erro ao enviar image')
  }
}
