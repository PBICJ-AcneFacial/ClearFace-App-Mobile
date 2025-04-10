import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAxiosStatusCode } from '@/functions'
import { api } from '@/services/api'
import { ConsultationResult } from './get-consultation-by-id'

export interface UploadImageResponse {
  updatedAppointment: {
    id: string
    created_at: string
    updated_at: string
    resultado: ConsultationResult[]
  }
}

export async function uploadImageToConsultation(imageId: string): Promise<UploadImageResponse> {
  try {
    const token = await AsyncStorage.getItem('@token')
    console.log(token)

    const { data } = await api.put<UploadImageResponse>(
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

