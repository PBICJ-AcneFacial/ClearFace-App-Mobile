import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/submit-button'
import { router } from 'expo-router'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/services/http/auth/register-user'
import {
  registerFormSchema,
  RegisterFormSchema,
} from '@/validators/register-validators'

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
  const onSubmit = (data: RegisterFormSchema) => console.log(data)

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
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueci a senha</Text>
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
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
