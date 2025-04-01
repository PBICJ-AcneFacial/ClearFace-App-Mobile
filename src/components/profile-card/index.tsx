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
import { BookOpen, ChartLine, LogOut, UserPen } from 'lucide-react-native'
import { colors } from '@/styles/theme'

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
        <Text style={styles.username} numberOfLines={1}>
          Ismael Henrique
        </Text>
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
            <Text style={styles.dropdownLabel} numberOfLines={1}>
              ismael.henrique.dev@gmail.com
            </Text>
            <View style={styles.separator} />

            <TouchableOpacity style={styles.dropdownItem}>
              <UserPen color={colors.gray[900]} size={20} />
              <Text style={styles.dropdownItemText}>
                Alterar email ou senha
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <BookOpen color={colors.gray[900]} size={20} />
              <Text style={styles.dropdownItemText}>Documentação</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.navigate('/(private)/overview')}
              style={styles.dropdownItem}
            >
              <ChartLine color={colors.gray[900]} size={20} />
              <Text style={styles.dropdownItemText}>Overview</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.navigate('/(auth)/login')}
              style={[styles.dropdownItem, styles.logout]}
            >
              <LogOut color={colors.gray[900]} size={20} />
              <Text style={styles.dropdownItemText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}
