import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native'
import { styles } from './styles'

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
            <TouchableOpacity
              onPress={() => router.navigate('/(private)/overview')}
              style={styles.dropdownItem}
            >
              <Text>📊 Overview</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.navigate('/(auth)/login')}
              style={[styles.dropdownItem, styles.logout]}
            >
              <Text style={styles.logoutText}>🚪 Log out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}
