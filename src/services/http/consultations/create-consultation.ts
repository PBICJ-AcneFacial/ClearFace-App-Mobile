import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAxiosStatusCode } from '@/functions'
import { api } from '@/services/api'

export type CreateConsultationResponse = {
  created_at: string;
  id: string;
  resultado: {
    acne_quantity: {
      "Cravos Brancos": number;
      "Cravos Pretos": number;
      "Manchas Escuras": number;
      "Nódulos": number;
      "Pápulas": number;
      "Pústulas": number;
    };
    detected_classes: number[];
    iga_score: number;
    image: string;
    image_path: string;
  };
};


export async function createConsultation(
  imageId: string
): Promise<CreateConsultationResponse> {
  try {
    const token = await AsyncStorage.getItem('@token')
    console.log(token)

    const { data } = await api.post<CreateConsultationResponse>(
      '/consultas',
      {
        image_id: imageId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return data
  } catch (error) {
    const statusCode = getAxiosStatusCode(error)

    if (statusCode === 401) {
      throw new Error('Invalid password')
    }

    console.log(error)
    throw new Error('Login erro to user')
  }
}
