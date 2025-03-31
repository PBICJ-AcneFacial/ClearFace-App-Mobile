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

export async function uploadImage(formData: FormData) {
  try {
    const token = await AsyncStorage.getItem('@token')
    const response = await api.post('/images', formData, {
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (err) {
    console.log(err)
  }
}
