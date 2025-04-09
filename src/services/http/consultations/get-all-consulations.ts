import { api } from '@/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type Consultation = {
  id: string
  user_id: string
  created_at: string
  // resultado: Record<string, any>
}

export async function getAllConsulations(): Promise<Consultation[]> {
  try {
    const token = await AsyncStorage.getItem('@token')

    const {data } = await api.get<Consultation[]>('/consultas/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('Todas as consultas: ', data)

    return data
  } catch (error) {
    console.error('Erro ao buscar consultas:', error)
    throw new Error('fecth error')
  }
}
