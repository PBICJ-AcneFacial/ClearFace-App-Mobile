import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  TextProps,
} from 'react-native'
import { styles } from './styles'

type ButtonProps = TouchableOpacityProps

function SubmitButton({ children, disabled, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      activeOpacity={0.8}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
}

function Title({ children }: TextProps) {
  return <Text style={styles.text}>{children}</Text>
}

SubmitButton.Title = Title

export { SubmitButton }
