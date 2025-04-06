import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/submit-button'
import { getErrorMessage } from '@/functions'
import { LoginFormSchema, loginFormSchema } from '@/validators/login-validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { Redirect, router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { TextError } from '@/components/ui/text-error'
import { useState } from 'react'
import { Loading } from '@/components/loading'
import { colors, fontFamily } from '@/styles/theme'
import { Toast } from 'toastify-react-native'
import { useAuth } from '@/contexts/auth-context'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

  const { signin, session } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleSubmitFormLogin(data: LoginFormSchema) {
    setIsLoading(true)
    try {
      await signin(data)
      console.log('Session:', session)
      Toast.show({
        type: 'success',
        text1: 'Login bem sucedido!',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      })
      router.navigate('/(app)')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      console.log(errorMessage)
      Toast.show({
        type: 'error',
        text1: errorMessage,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

 
  // if (session) return <Redirect href='/(app)' />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Email e senha necessários para a autenticação.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Informe seu email'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='email'
        />
        {errors.email && <TextError>{errors.email.message}</TextError>}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Informe sua senha'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
          name='password'
        />
        {errors.password && <TextError>{errors.password.message}</TextError>}
      </View>
      <TouchableOpacity>
        <Text
          onPress={() => router.navigate('/send-email')}
          style={styles.forgotPassword}
        >
          Esqueci a senha
        </Text>
      </TouchableOpacity>
      <SubmitButton
        onPress={handleSubmit(handleSubmitFormLogin)}
        disabled={isLoading || !isValid}
      >
        {isLoading ? (
          <Loading color={colors.gray[100]} />
        ) : (
          <SubmitButton.Title>Confirmar</SubmitButton.Title>
        )}
      </SubmitButton>
      <Text style={styles.registerText}>
        Ainda não tenho uma conta -{' '}
        <Text
          onPress={() => {
            router.navigate('/register')
            console.log('/register')
          }}
          style={styles.registerLink}
        >
          Cadastrar-se
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  header: {
    width: '100%',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: fontFamily.semiBold,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#52525B',
    fontFamily: fontFamily.semiBold,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 16,
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: '#52525B',
  },
  registerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#52525B',
    textAlign: 'center',
  },
  registerLink: {
    textDecorationLine: 'underline',
  },
})
