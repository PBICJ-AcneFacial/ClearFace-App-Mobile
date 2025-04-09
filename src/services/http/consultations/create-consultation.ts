import { api } from '@/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type CreateConsultationResponse = {
  id: string
}

export async function createConsultation(): Promise<CreateConsultationResponse> {
  try {
    const token = await AsyncStorage.getItem('@token')
    const { data } = await api.post(
      '/consultas',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log('Consulta criada com sucesso!')

    return data
  } catch (error) {
    throw new Error('Erro ao criar consulta')
  }
}
