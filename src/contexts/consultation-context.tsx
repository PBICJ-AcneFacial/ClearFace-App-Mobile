import { createConsultation } from '@/services/http/consultations/create-consultation'
import {
  Consultation,
  getAllConsulations,
} from '@/services/http/consultations/get-all-consulations'
import {
  ConsultationResult,
  getConsultationById,
} from '@/services/http/consultations/get-consultation-by-id'
import { router } from 'expo-router'
import React, { createContext, useState, useContext, useEffect } from 'react'

type Message = {
  type: 'image'
  uri: string
}

type ImageClass = {
  appointmentId: string
  id: string
  type: 'uploaded' | 'detected'
  url: string
}

interface ConsultationContextData {
  messages: Message[]
  previewImage: string | null
  imageId: string
  setPreviewImage: (uri: string | null) => void
  setImageId: (id: string) => void
  addConsultation: (uri: string) => void
  clearConsultations: () => void
  consultationResults: ConsultationResult[]
  updateResultData: (data: ConsultationResult) => void
  handleCreateConsultation: () => void
  consultations: Consultation[]
  loadConsultation: (consultationId: string) => Promise<void>
}

const ConsultationContext = createContext<ConsultationContextData>(
  {} as ConsultationContextData
)

export const ConsultationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [imageId, setImageId] = useState('')
  const [consultationResults, setConsultationResults] = useState<
    ConsultationResult[]
  >([])
  const [consultations, setConsultations] = useState<Consultation[]>([])

  const addConsultation = (uri: string) => {
    setMessages((prev) => [...prev, { type: 'image', uri }])
    setPreviewImage(null)
  }

  const clearConsultations = () => {
    setMessages([])
    setPreviewImage(null)
    setImageId('')
    setConsultationResults([])
    router.navigate('/(app)/home')
  }

  const updateResultData = (data: ConsultationResult) => {
    setConsultationResults((prev) => [...prev, data])
  }

  const loadConsultation = async (consultationId: string) => {
    try {
      const response = await getConsultationById(consultationId)

      if (
        response.appointment.resultado &&
        response.appointment.resultado.length > 0
      ) {
        // Load results
        const results = response.appointment.resultado.map((result) => ({
          acne_quantity: result.acne_quantity,
          iga_score: result.iga_score,
          image: result.image,
          image_path: result.image_path,
        }))

        setConsultationResults(results)

        // Load messages with both uploaded and detected images
        const messages = response.imageClassList.map((image) => ({
          type: 'image' as const,
          uri: `http://200.129.17.134:3456${image.url}`,
        }))

        setMessages(messages)
      }
    } catch (error) {
      console.error('Erro ao carregar consulta:', error)
    }
  }

  async function fetchConsultations() {
    const response = await getAllConsulations()

    setConsultations(response.manyResult)
    console.log(consultations)
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
        messages,
        previewImage,
        imageId,
        setPreviewImage,
        setImageId,
        addConsultation,
        clearConsultations,
        consultationResults,
        updateResultData,
        handleCreateConsultation,
        consultations,
        loadConsultation,
      }}
    >
      {children}
    </ConsultationContext.Provider>
  )
}

export const useConsultation = () => {
  return useContext(ConsultationContext)
}
