// context/AuthContext.tsx
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loginUser } from '@/services/http/auth/login-user'
import { LoginFormSchema } from '@/validators/login-validators'
import { ActivityIndicator, SafeAreaView, Text } from 'react-native'
import { getProfile, User } from '@/services/http/user/get-profile'
import { router } from 'expo-router'

// 1. Interface para o contexto
interface AuthContextType {
  user: User | null
  loading: boolean
  session: boolean
  signin: (formData: LoginFormSchema) => Promise<void>
  signout: () => Promise<void>
}

// 2. Criação do contexto com tipo
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 3. AuthProvider
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<boolean>(false)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    console.log('Primeiro render.')
    try {
      const savedToken = await AsyncStorage.getItem('@token')
      if (savedToken) {
        setSession(true)
        const userData = await getProfile()
        if (userData) {
          setUser(userData)
        }
      }
    } catch (error) {
      console.log('Erro ao verificar auth:', error)
    } finally {
      setLoading(false)
    }
  }

  const signin = async (formData: LoginFormSchema) => {
    // setLoading(true)
    try {
      const response = await loginUser(formData)
      if (response) {
        // setToken(response.token)

        await AsyncStorage.setItem('@token', response.token)
        setSession(true)
        // setUser(response.user) se retornar o usuário
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signout = async () => {
    // setLoading(true)
    try {
      await AsyncStorage.removeItem('@token')
      setUser(null)
      // setToken(null)
      setSession(false)
    } catch (err) {
      console.log('Erro ao deslogar:', err)
    } finally {
      setLoading(false)
    }
  }

  const contextData: AuthContextType = {
    user,
    loading,
    session,
    signin,
    signout,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <SafeAreaView
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator />
          <Text>Carregando...</Text>
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

// 4. Hook customizado
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

export { useAuth, AuthProvider }
