import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/submit-button'
import { getErrorMessage } from '@/functions'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { styles } from './styles'
import {
  SendCodeFormSchema,
  sendCodeFormSchema,
} from '@/validators/send-code-validators'
import { BackButton } from '@/components/ui/back-button'
import { sendCodeUser } from '@/services/http/auth/send-code-user'
import { Loading } from '@/components/loading'
import { colors } from '@/styles/theme'
import { useState } from 'react'
import { TextError } from '@/components/ui/text-error'
import { Toast } from 'toastify-react-native'

export default function SendCode() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SendCodeFormSchema>({
    resolver: zodResolver(sendCodeFormSchema),
    defaultValues: {
      refCode: '',
      newPassword: '',
    },
  })

  async function handleSubmitFormSendCode(data: SendCodeFormSchema) {
    setIsLoading(true)
    const { refCode, newPassword } = data

    try {
      const response = await sendCodeUser({
        refCode,
        newPassword,
      })
      console.log(data)
      console.log('Senha recuperada com sucesso!')
      console.log(response)
      Toast.show({
        type: 'success',
        text1: 'Senha recuperada com sucesso!',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      })
      router.navigate('/')
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
          Insira o código que foi enviado no seu email e crie uma nova senha.
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
              placeholder='Informe o código de verificação.'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='refCode'
        />
        {errors.refCode && <TextError>{errors.refCode.message}</TextError>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Crie uma nova senha.'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
          name='newPassword'
        />
        {errors.newPassword && (
          <TextError>{errors.newPassword.message}</TextError>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Confirme a nova senha.'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
          name='confirmNewPassword'
        />
        {errors.confirmNewPassword && (
          <TextError>{errors.confirmNewPassword.message}</TextError>
        )}
      </View>
      <SubmitButton
        onPress={handleSubmit(handleSubmitFormSendCode)}
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
