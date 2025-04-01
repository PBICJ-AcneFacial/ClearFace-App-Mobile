import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  profileContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopColor: colors.gray[300],
    borderTopWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[900],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.gray[50],
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    fontSize: 20,
  },
  username: {
    marginLeft: 10,
    color: colors.gray[900],
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    fontSize: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  dropdownMenu: {
    backgroundColor: colors.gray[200],
    alignSelf: 'flex-start',
    marginLeft: 12,
    borderRadius: 12,
    padding: 10,
    marginBottom: 75,
    elevation: 4,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: '500',
    paddingBottom: 8,
    fontFamily: fontFamily.medium,
    overflow: 'hidden',
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray[300],
    marginVertical: 8,
  },
  dropdownItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dropdownItemText: {
    fontFamily: fontFamily.regular,
    color: colors.gray[900],
    fontWeight: '400',
  },
  logout: {
    borderTopWidth: 1,
    borderColor: colors.gray[300],
    marginTop: 8,
  },
})
