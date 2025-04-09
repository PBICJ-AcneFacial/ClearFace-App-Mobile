import { api } from '@/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type Consultation = {
  id: string
  user_id: string
  created_at: string
  // resultado: Record<string, any>
}

export async function getConsultationById(
  consultationId: string
): Promise<Consultation> {
  try {
    const token = await AsyncStorage.getItem('@token')

    const { data } = await api.get<Consultation>(`/consultas/${consultationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('Pegando Consulta específica: ', data)

    return data
  } catch (error) {
    console.error('Erro ao buscar consulta espcifica: ', error)
    throw new Error('fecth error')
  }
}
