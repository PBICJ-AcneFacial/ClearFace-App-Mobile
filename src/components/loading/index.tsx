import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import { s } from './styles'

type LoadingProps = ActivityIndicatorProps

export function Loading({ ...rest }: LoadingProps) {
  return <ActivityIndicator style={s.container} {...rest} />
}
