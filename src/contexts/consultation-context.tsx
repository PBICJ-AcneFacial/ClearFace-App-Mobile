import { router } from 'expo-router'
import React, { createContext, useState, useContext } from 'react'

interface Consultation {
  type: 'image'
  uri: string
}

interface ConsultationContextData {
  messages: Consultation[]
  previewImage: string | null
  imageId: string
  setPreviewImage: (uri: string | null) => void
  setImageId: (id: string) => void
  addConsultation: (uri: string) => void
  clearConsultations: () => void
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

  const addConsultation = (uri: string) => {
    setMessages((prev) => [...prev, { type: 'image', uri }])
    setPreviewImage(null)
  }

  const clearConsultations = () => {
    setMessages([])
    setPreviewImage(null)
    setImageId('')
    router.navigate('/')
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
      }}
    >
      {children}
    </ConsultationContext.Provider>
  )
}

export const useConsultation = () => {
  return useContext(ConsultationContext)
}
