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

export default function SendCode() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SendCodeFormSchema>({
    resolver: zodResolver(sendCodeFormSchema),
    defaultValues: {
      email: '',
    },
  })

  async function handleSubmitFormLogin(data: SendCodeFormSchema) {
    try {
      // await loginUser(data)
      console.log(data)
      console.log('User logged')
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
          <Text style={styles.title}>Código de Confirmação</Text>
        </View>
        <Text style={styles.subtitle}>
          Email e senha necessários para a autenticação
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
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueci a senha</Text>
      </TouchableOpacity>
      <SubmitButton onPress={handleSubmit(handleSubmitFormLogin)}>
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
