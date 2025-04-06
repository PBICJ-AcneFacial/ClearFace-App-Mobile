import { api } from '@/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface User {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
}

interface GetProfileResponse {
  Description: string
  profile: User
}

export async function getProfile(): Promise<User | undefined> {
  try {
    const token = await AsyncStorage.getItem('@token')
    const response = await api.get<GetProfileResponse>('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(response.data)

    return response.data.profile
  } catch (error) {
    console.log(error)
    return undefined
  }
}

