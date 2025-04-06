import React, { useEffect, useState } from 'react'
import { Redirect, router, Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Drawer } from '@/components/drawer'
import { AlignLeft } from 'lucide-react-native'
import { NewConsultationButton } from '@/components/new-consulation-button'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { ConsultationProvider } from '@/contexts/consultation-context'
import { colors } from '@/styles/theme'
import { useAuth } from '@/contexts/auth-context'

export default function PrivateRoutesLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const { session } = useAuth()
  return !session ? (
    <Redirect href='/login' />
  ) : (
    <ConsultationProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <Stack
            screenOptions={{
              title: '',
              headerLeft: () => (
                <TouchableOpacity onPress={() => setIsDrawerOpen(true)}>
                  <AlignLeft color={colors.gray[900]} size={24} />
                </TouchableOpacity>
              ),
              headerRight: () => <NewConsultationButton />,
              headerStyle: {
                backgroundColor: colors.gray[200],
              },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name='index' />
            <Stack.Screen name='overview' />
          </Stack>
        </Drawer>
      </GestureHandlerRootView>
    </ConsultationProvider>
  )

  // const { isLogged } = useAuth()

  // useEffect(() => {
  //   isLogged()
  // }, [])

  return (
    <ConsultationProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <Stack
            screenOptions={{
              title: '',
              headerLeft: () => (
                <TouchableOpacity onPress={() => setIsDrawerOpen(true)}>
                  <AlignLeft color={colors.gray[900]} size={24} />
                </TouchableOpacity>
              ),
              headerRight: () => <NewConsultationButton />,
              headerStyle: {
                backgroundColor: colors.gray[200],
              },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name='index' />
            <Stack.Screen name='overview' />
          </Stack>
        </Drawer>
      </GestureHandlerRootView>
    </ConsultationProvider>
  )
}
