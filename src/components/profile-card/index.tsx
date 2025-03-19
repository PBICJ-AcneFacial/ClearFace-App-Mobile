import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native'

export function ProfileCard() {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [profileWidth, setProfileWidth] = useState(0)

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setProfileWidth(width)
  }

  return (
    <View>
      {/* Botão que abre o dropdown */}
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={() => setDropdownOpen(true)}
        onLayout={handleLayout} 
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>IH</Text>
        </View>
        <Text style={styles.username}>Ismael Henrique</Text>
      </TouchableOpacity>

      {/* Dropdown como Modal */}
      <Modal
        transparent
        visible={isDropdownOpen}
        animationType='slide'
        
        onRequestClose={() => setDropdownOpen(false)}
        
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setDropdownOpen(false)}
        >
          <View style={[styles.dropdownMenu, { width: profileWidth }]}>
            <Text style={styles.dropdownLabel}>
              ismael.henrique.dev@gmail.com
            </Text>
            <View style={styles.separator} />

            <TouchableOpacity style={styles.dropdownItem}>
              <Text>🔑 Alterar email ou senha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text>📖 Documentação</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text>📊 Overview</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.dropdownItem, styles.logout]}>
              <Text style={styles.logoutText}>🚪 Log out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
