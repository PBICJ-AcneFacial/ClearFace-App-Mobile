import { router, Slot, Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ToastManager from 'toastify-react-native'
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
import { SafeAreaView } from 'react-native'
import { AuthProvider } from '@/contexts/auth-context'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  })

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     try {
  //       const response = await isLogged()
  //       console.log('Usuário logado:', response)
  //       if (!response) {
  //         router.navigate('/(auth)/login') // usa replace para não deixar voltar
  //       }
  //     } catch (error) {
  //       console.log('Erro ao verificar login:', error)
  //     } finally {
  //       setAuthChecked(true)
  //     }
  //   }

  //   checkLogin()
  // }, [])

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.gray[100] },
      }}
    /> */}
        <Slot />
        <ToastManager />
      </SafeAreaView>
    </AuthProvider>
  )
}
