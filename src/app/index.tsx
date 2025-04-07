import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Login from './auth/login'

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('@token')
        const isLoggedIn = !!token
        console.log('Is logged:', isLoggedIn)

        if (isLoggedIn) {
          router.navigate('/(app)/home')
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
      }
    }

    const timeout = setTimeout(() => {
      checkAuth()
    }, 3000)

    return () => clearTimeout(timeout)
  }, [router])

  return <Login />
}
