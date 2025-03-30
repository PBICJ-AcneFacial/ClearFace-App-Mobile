import React, { useEffect, useState } from 'react'
import { router, Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Drawer } from '@/components/drawer'
import { AlignLeft } from 'lucide-react-native'
import { NewConsultationButton } from '@/components/new-consulation-button'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useAuth } from '@/hooks/use-auth'

export default function PrivateRoutesLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const { isLogged } = useAuth()

  useEffect(() => {
    const log = isLogged()
    console.log(log)
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  )
}
