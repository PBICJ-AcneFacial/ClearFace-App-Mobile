import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat'
import { Loading } from '@/components/loading'
import { colors } from '@/styles/theme'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  })

  if (!fontsLoaded) {
    console.log('fONTE NÃO CARREGOU')
    return <Loading />
  }

  if (fontsLoaded) {
    console.log(fontsLoaded)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.gray[100] },
        }}
      />
    </GestureHandlerRootView>
  )
}
