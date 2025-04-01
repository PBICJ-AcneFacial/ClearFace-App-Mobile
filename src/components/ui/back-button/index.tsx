import { colors } from '@/styles/theme'
import { ArrowLeft } from 'lucide-react-native'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './styles'

type ButtonProps = TouchableOpacityProps

export function BackButton({ ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} {...rest}>
      <ArrowLeft color={colors.gray[50]} />
    </TouchableOpacity>
  )
}
