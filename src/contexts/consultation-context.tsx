import { router } from 'expo-router'
import React, { createContext, useState, useContext } from 'react'

interface Consultation {
  type: 'image'
  uri: string
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
  messages: Consultation[]
  previewImage: string | null
  imageId: string
  setPreviewImage: (uri: string | null) => void
  setImageId: (id: string) => void
  addConsultation: (uri: string) => void
  clearConsultations: () => void
  resultData: AcneAnalysisResult[]
  updateResultData: (data: AcneAnalysisResult) => void
}

const ConsultationContext = createContext<ConsultationContextData>(
  {} as ConsultationContextData
)

export const ConsultationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Consultation[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [imageId, setImageId] = useState('')
  const [resultData, setResultData] = useState<AcneAnalysisResult[]>([])

  const addConsultation = (uri: string) => {
    setMessages((prev) => [...prev, { type: 'image', uri }])
    setPreviewImage(null)
    console.log('Resultdata: ', resultData)
  }

  const clearConsultations = () => {
    setMessages([])
    setPreviewImage(null)
    setImageId('')
    router.navigate('/')
  }

  const updateResultData = (data: AcneAnalysisResult) => {
    setResultData((prev) => [...prev, data])
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
      }}
    >
      {children}
    </ConsultationContext.Provider>
  )
}

export const useConsultation = () => {
  return useContext(ConsultationContext)
}
