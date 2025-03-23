import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/submit-button'
import { router } from 'expo-router'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Email e senha necessários para a autenticação
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input placeholder='Informe seu email' />
        <Input placeholder='Informe sua senha' />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueci a senha</Text>
      </TouchableOpacity>
      <SubmitButton>Confirmar</SubmitButton>
      <Text style={styles.registerText}>
        Ainda não tenho uma conta -{' '}
        <Text onPress={() => router.navigate('/(auth)/register')} style={styles.registerLink}>Cadastrar-se</Text>
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
