import AsyncStorage from '@react-native-async-storage/async-storage'

export function useAuth() {
  const isLogged = async () => {
    try {
      const token = await AsyncStorage.getItem('@token')
      if (token) {
        return true
      } else {
        return false
      }
    } catch {
      throw new Error('Erro ao buscar token.')
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@token')
      
      console.log('logout user.')
    } catch {
      throw new Error('Erro ao buscar token.')
    }
  }

  return { isLogged, logout }
}
