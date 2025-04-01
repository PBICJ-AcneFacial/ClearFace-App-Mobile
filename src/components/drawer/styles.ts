import { colors, fontFamily } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const s = StyleSheet.create({
  flex1: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 280,
    height: '100%',
    backgroundColor: colors.gray[100],
    paddingHorizontal: 12,
    paddingTop: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: fontFamily.semiBold,
  },
  consultationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  consultationText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: fontFamily.medium,
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.gray[300],
    paddingTop: 16,
  }
})
