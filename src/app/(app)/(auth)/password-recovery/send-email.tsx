import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/submit-button'
import { getErrorMessage } from '@/functions'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'
import {
  SendEmailFormSchema,
  sendEmailFormSchema,
} from '@/validators/send-email-validators'
import { BackButton } from '@/components/ui/back-button'
import { sendEmailUser } from '@/services/http/auth/send-email-user'
import { useState } from 'react'
import { Loading } from '@/components/loading'
import { colors } from '@/styles/theme'
import { TextError } from '@/components/ui/text-error'
import { Toast } from 'toastify-react-native'

export default function SendEmail() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SendEmailFormSchema>({
    resolver: zodResolver(sendEmailFormSchema),
    defaultValues: {
      email: '',
    },
  })

  async function handleSubmitFormSendEmail(data: SendEmailFormSchema) {
    setIsLoading(true)
    try {
      await sendEmailUser(data)
      console.log(data)
      console.log('Código enviado por email')
      Toast.show({
        type: 'success',
        text1: 'Código enviado com sucesso!',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      })
      router.navigate('/(auth)/password-recovery/send-code')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      Toast.show({
        type: 'error',
        text1: errorMessage,
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      })
      console.log(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.infoArea}>
          <BackButton onPress={() => router.back()} />
          <Text style={styles.title}>Recuperação de senha</Text>
        </View>
        <Text style={styles.subtitle}>
          Informe o email para recuperar sua senha.
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
              placeholder='Informe seu email'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='email'
        />
        {errors.email && <TextError>{errors.email.message}</TextError>}
      </View>

      <SubmitButton
        onPress={handleSubmit(handleSubmitFormSendEmail)}
        disabled={isLoading || !isValid}
      >
        {isLoading ? (
          <Loading color={colors.gray[100]} />
        ) : (
          <SubmitButton.Title>Confirmar</SubmitButton.Title>
        )}
      </SubmitButton>
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
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#52525B',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 16
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
  infoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  }
})