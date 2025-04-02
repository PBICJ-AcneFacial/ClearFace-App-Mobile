import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/submit-button'
import { getErrorMessage } from '@/functions'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { Text, View, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import {
  SendCodeFormSchema,
  sendCodeFormSchema,
} from '@/validators/send-code-validators'
import { BackButton } from '@/components/ui/back-button'
import { sendCodeUser } from '@/services/http/auth/send-code-user'

export default function SendCode() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SendCodeFormSchema>({
    resolver: zodResolver(sendCodeFormSchema),
    defaultValues: {
      refCode: '',
      newPassword: '',
    },
  })

  async function handleSubmitFormSendCode(data: SendCodeFormSchema) {
    try {
      const response = await sendCodeUser(data)
      console.log(data)
      console.log('Senha recuperada com sucesso!')
      console.log(response)
      router.navigate('/')
    } catch (error) {
      const errorMessage = getErrorMessage(error)

      console.log(errorMessage)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.infoArea}>
          <BackButton />
          <Text style={styles.title}>Nova senha</Text>
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
            />
          )}
          name='newPassword'
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueci a senha</Text>
      </TouchableOpacity>
      <SubmitButton onPress={handleSubmit(handleSubmitFormSendCode)}>
        Confirmar
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
