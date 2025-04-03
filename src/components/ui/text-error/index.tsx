import { Text, TextProps } from 'react-native'
import { styles } from './styles'

type TextErrorProps = TextProps

export function TextError({ children, ...rest }: TextErrorProps) {
  return (
    <Text style={styles.textError} {...rest}>
      {children}
    </Text>
  )
}
