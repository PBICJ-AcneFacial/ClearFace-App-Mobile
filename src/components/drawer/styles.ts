import { fontFamily } from '@/styles/theme'
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
    backgroundColor: '#f3f4f6',
    padding: 20,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
  consultationText: { fontSize: 14, fontWeight: '500' },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    paddingTop: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1f2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: 'white', fontWeight: 'bold' },
  userName: { marginLeft: 12, fontSize: 14, fontWeight: 'bold' },
})
