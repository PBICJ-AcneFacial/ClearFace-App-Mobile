import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.gray[900],
    padding: 24,
    borderRadius: 24,
    gap: 20,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.gray[50],
    fontFamily: fontFamily.semiBold,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[50],
    fontFamily: fontFamily.semiBold,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: fontFamily.semiBold,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.gray[50],
    fontFamily: fontFamily.regular,
  },
})
