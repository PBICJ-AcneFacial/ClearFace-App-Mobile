import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/submit-button'
import { router } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/services/http/auth/register-user'
import {
  registerFormSchema,
  RegisterFormSchema,
} from '@/validators/register-validators'
import { TextError } from '@/components/ui/text-error'
import { Loading } from '@/components/loading'
import { colors, fontFamily } from '@/styles/theme'
import { useState } from 'react'
import { Toast } from 'toastify-react-native'
import { getErrorMessage } from '@/functions'

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function handleSubmitFormRegister(formData: RegisterFormSchema) {
    setIsLoading(true)
    const { name, email, password } = formData

    try {
      await registerUser({ name, email, password })
      console.log(formData)
      Toast.show({
        type: 'success',
        text1: 'Conta criada com sucesso!',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      })
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>
          Infome os dados abaixo para criar sua conta.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Informe seu nome'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='name'
        />
        {errors.name && <TextError>{errors.name.message}</TextError>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
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
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Crie uma senha'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
          name='password'
        />
        {errors.password && <TextError>{errors.password.message}</TextError>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Confirme sua senha'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
          name='confirmPassword'
        />
        {errors.confirmPassword && (
          <TextError>{errors.confirmPassword.message}</TextError>
        )}
      </View>

      <SubmitButton
        onPress={handleSubmit(handleSubmitFormRegister)}
        disabled={isLoading || !isValid}
      >
        {isLoading ? (
          <Loading color={colors.gray[100]} />
        ) : (
          <SubmitButton.Title>Confirmar</SubmitButton.Title>
        )}
      </SubmitButton>
      <Text
        onPress={() => router.navigate('/(auth)/login')}
        style={styles.registerText}
      >
        Já tenho uma conta - <Text style={styles.registerLink}>Entrar</Text>
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
  registerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#52525B',
    textAlign: 'center',
    fontFamily: fontFamily.semiBold
  },
  registerLink: {
    textDecorationLine: 'underline',
  },
})
