import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.gray[900],
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    borderRadius: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  text: {
    color: colors.gray[100],
    fontWeight: '600',
    fontFamily: fontFamily.semiBold,
  },
})
