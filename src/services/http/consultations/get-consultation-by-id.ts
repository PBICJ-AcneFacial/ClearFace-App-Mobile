import { api } from '@/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type ConsultationResult = {
  acne_quantity: {
    'Cravos Brancos': number
    'Cravos Pretos': number
    'Manchas Escuras': number
    Nódulos: number
    Pápulas: number
    Pústulas: number
  }
  iga_score: number
  image: string
  image_path: string
}

type ImageClass = {
  appointmentId: string
  id: string
  type: 'uploaded' | 'detected'
  url: string
}

export type Consultation = {
  appointment: {
    id: string
    created_at: string
    resultado: ConsultationResult[]
  }
  imageClassList: ImageClass[]
}

export async function getConsultationById(
  consultationId: string
): Promise<Consultation> {
  try {
    const token = await AsyncStorage.getItem('@token')

    const { data } = await api.get<Consultation>(
      `/consultas/${consultationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    console.log('Pegando Consulta específica: ', data)

    return data
  } catch (error) {
    console.error('Erro ao buscar consulta espcifica: ', error)
    throw new Error('fecth error')
  }
}
