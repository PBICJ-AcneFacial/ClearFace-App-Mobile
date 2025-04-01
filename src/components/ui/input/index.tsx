import { colors, fontFamily } from '@/styles/theme'
import { TextInput, TextInputProps, StyleSheet } from 'react-native'
import { styles } from './styles'

type InputProps = TextInputProps & {}

export function Input({ ...rest }: InputProps) {
  return (
    <TextInput style={styles.input} placeholderTextColor='#52525C' {...rest} />
  )
}

export function MinimalistInput({ ...rest }: InputProps) {
  return (
    <TextInput style={styles.input} placeholderTextColor='#52525C' {...rest} />
  )
}
