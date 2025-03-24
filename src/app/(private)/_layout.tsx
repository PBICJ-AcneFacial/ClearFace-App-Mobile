import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Drawer } from '@/components/drawer'
import { AlignLeft } from 'lucide-react-native'
import { NewConsultationButton } from '@/components/new-consulation-button'

export default function PrivateRoutesLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <Stack
        screenOptions={{
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => setIsDrawerOpen(true)}>
              <AlignLeft color='#000' size={24} />
            </TouchableOpacity>
          ),
          headerRight: () => <NewConsultationButton />,
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='overview' />
      </Stack>
    </Drawer>
  )
}
