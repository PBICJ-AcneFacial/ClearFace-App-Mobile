import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/submit-button'
import { router } from 'expo-router'
import { Text, View, TouchableOpacity } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/services/http/auth/register-user'
import {
  registerFormSchema,
  RegisterFormSchema,
} from '@/validators/register-validators'
import { styles } from './styles'

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  async function handleSubmitFormRegister(data: RegisterFormSchema) {
    try {
      await registerUser(data)
      console.log(data)
    } catch {
      // showErrorToast('Erro ao criar conta.')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Register</Text>
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
              placeholder='Informe seu nome'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='name'
        />

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
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder='Informe sua senha'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='password'
        />
      </View>

      <SubmitButton onPress={handleSubmit(handleSubmitFormRegister)}>Confirmar</SubmitButton>
      <Text
        onPress={() => router.navigate('/(auth)/login')}
        style={styles.registerText}
      >
        Já tenho uma conta - <Text style={styles.registerLink}>Entrar</Text>
      </Text>
    </View>
  )
}


