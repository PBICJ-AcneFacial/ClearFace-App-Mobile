import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from '@/services/api'

type UploadImageResponse = {
  Description: string
  image: {
    id: string
    url: string
    created_at: string
    updated_at: string
  }
}

export async function uploadImage(formData: FormData): Promise<UploadImageResponse> {
  try {
    const token = await AsyncStorage.getItem('@token')

    if (!token) {
      throw new Error('Token não encontrado.')
    }

    const { data } = await api.postForm('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`, // Corrigido aqui
      },
    })

    console.log('Imagem enviada para a API.')
    console.log(data)

    return data
  } catch (error) {
    console.error('Erro ao enviar imagem:', error)
    throw new Error('Erro ao enviar a imagem')
  }
}
