import {
  createConsultation,
  CreateConsultationResponse,
} from '@/services/http/consultations/create-consultation'
import { Consultation, getAllConsulations } from '@/services/http/consultations/get-all-consulations'
import { router } from 'expo-router'
import React, { createContext, useState, useContext, useEffect } from 'react'

// interface Consultation {
//   type: 'image'
//   uri: string
// }


type AcneQuantity = {
  Nódulos: number
  Pápulas: number
  Pústulas: number
  'Cravos Pretos': number
  'Cravos Brancos': number
  'Manchas Escuras': number
}

type ConsultationResultsData = {
  image: string
  iga_score: number
  image_path: string
  acne_quantity: AcneQuantity
  detected_classes: number[]
}

export interface AcneAnalysisResult {
  created_at: string
  id: string
  resultado: {
    acne_quantity: {
      'Cravos Brancos': number
      'Cravos Pretos': number
      'Manchas Escuras': number
      Nódulos: number
      Pápulas: number
      Pústulas: number
    }
    detected_classes: number[]
    iga_score: number
    image: string
    image_path: string
  }
}

interface ConsultationContextData {
  messages: []
  previewImage: string | null
  imageId: string
  setPreviewImage: (uri: string | null) => void
  setImageId: (id: string) => void
  addConsultation: (uri: string) => void
  clearConsultations: () => void
  resultData: AcneAnalysisResult[]
  updateResultData: (data: AcneAnalysisResult) => void
  handleCreateConsultation: () => void
  consultations: Consultation[]
}

const ConsultationContext = createContext<ConsultationContextData>(
  {} as ConsultationContextData
)

export const ConsultationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [imageId, setImageId] = useState('')
  const [resultData, setResultData] = useState<AcneAnalysisResult[]>([])
  const [consultationResults, setConsultationResults] = useState<
    ConsultationResultsData[]
  >([])
  const [consultations, setConsultations] = useState<Consultation[]>([])

  const addConsultation = (uri: string) => {
    setMessages((prev) => [...prev, { type: 'image', uri }])
    setPreviewImage(null)
    console.log('Resultdata: ', resultData)
  }

  const clearConsultations = () => {
    setMessages([])
    setPreviewImage(null)
    setImageId('')
    router.navigate('/(app)/home')
  }

  const updateResultData = (data: AcneAnalysisResult) => {
    setResultData((prev) => [...prev, data])
  }

  async function fetchConsultations() {
    const response = await getAllConsulations()

    setConsultations(response)
  }

  useEffect(() => {
    fetchConsultations()
  }, [])

  async function handleCreateConsultation() {
    clearConsultations()
    const response = await createConsultation()
    console.log('Consulta criada! - Id:', response.id)
    router.navigate({
      pathname: '/(app)/home',
      params: { consultationId: response.id },
    })
  }

  return (
    <ConsultationContext.Provider
      value={{
        resultData,
        messages,
        previewImage,
        imageId,
        setPreviewImage,
        setImageId,
        addConsultation,
        clearConsultations,
        updateResultData,
        handleCreateConsultation,
        consultations
      }}
    >
      {children}
    </ConsultationContext.Provider>
  )
}

export const useConsultation = () => {
  return useContext(ConsultationContext)
}
