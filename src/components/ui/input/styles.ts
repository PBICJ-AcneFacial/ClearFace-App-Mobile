import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: colors.gray[900],
    fontFamily: fontFamily.regular,
  },
})
