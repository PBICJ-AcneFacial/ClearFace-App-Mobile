import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/submit-button'
import { getErrorMessage } from '@/functions'
import { loginUser } from '@/services/http/auth/login-user'
import { LoginFormSchema, loginFormSchema } from '@/validators/login-validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { Text, View, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import { TextError } from '@/components/ui/text-error'
import { useState } from 'react'
import { Loading } from '@/components/loading'
import { colors } from '@/styles/theme'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

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
      await loginUser(data)
      console.log(data)
      console.log('User logged')
      router.navigate('/')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      console.log(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

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
          onPress={() =>
            router.navigate('/(auth)/password-recovery/send-email')
          }
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
          onPress={() => router.navigate('/(auth)/register')}
          style={styles.registerLink}
        >
          Cadastrar-se
        </Text>
      </Text>
    </View>
  )
}
