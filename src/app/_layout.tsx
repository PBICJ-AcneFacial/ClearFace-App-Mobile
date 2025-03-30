import { router, Slot, Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat'
import { Loading } from '@/components/loading'

import React, { useEffect, useState } from 'react'
import { colors } from '@/styles/theme'
import { useAuth } from '@/hooks/use-auth'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  })

  const { isLogged } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await isLogged()
        setIsAuthenticated(response)
        if (!response) {
          router.push('/(auth)/login')
        }
      } catch (error) {
        console.log(error)
      }
    }

    checkLogin()
  }, [])

  if (!fontsLoaded) {
    return <Loading />
  }

  if (isAuthenticated === null) {
    return <Loading />
  }

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.gray[100] },
      }}
    >
      <Stack.Screen name='(private)' />
    </Stack>
    // </GestureHandlerRootView>
    // <Slot />
  )
}
