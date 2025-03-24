import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  profileContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  username: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 20,
    borderRadius: 10,
    padding: 10,
    marginBottom: 112,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  dropdownItem: {
    paddingVertical: 10,
  },
  logout: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
  },
})
