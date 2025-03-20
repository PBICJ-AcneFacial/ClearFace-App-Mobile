import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: colors.gray[900],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.gray[50],
    fontFamily: fontFamily.semiBold,
  },
})
