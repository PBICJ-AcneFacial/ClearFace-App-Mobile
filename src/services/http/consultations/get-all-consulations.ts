import { api } from '@/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getAllConsulations() {
  try {
    const token = await AsyncStorage.getItem('@token')
    const response = await api.get('/consultas/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(response)

    return response.data
  } catch (error) {
    console.log(error)
  }
}
