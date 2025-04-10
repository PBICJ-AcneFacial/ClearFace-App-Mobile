import React, { useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler'
// import { ProfileCard } from './profile-card'
import { s } from './styles'
import { ProfileCard } from '../profile-card'
import { useConsultation } from '@/contexts/consultation-context'
import { formatDate, formatTime } from '@/utils/formmatters'
import { router } from 'expo-router'

const screenWidth = Dimensions.get('window').width
const DRAWER_WIDTH = 300

export function Drawer({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  const translateX = useSharedValue(isOpen ? 0 : -DRAWER_WIDTH)

  useEffect(() => {
    translateX.value = withTiming(isOpen ? 0 : -DRAWER_WIDTH, { duration: 300 })
  }, [isOpen])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const { consultations } = useConsultation()

  const handleConsultationClick = (consultationId: string) => {
    onClose()
    router.navigate({
      pathname: '/(app)/home',
      params: { consultationId },
    })
  }

  return (
    <GestureHandlerRootView style={s.flex1}>
      <View style={s.flex1}>{children}</View>

      {isOpen && <TouchableOpacity style={s.overlay} onPress={onClose} />}

      <PanGestureHandler onEnded={onClose}>
        <Animated.View style={[s.drawer, animatedStyle]}>
          <Text style={s.headerText}>Últimas consultas</Text>
          <FlatList
            data={consultations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={s.consultationItem}
                onPress={() => handleConsultationClick(item.id)}
              >
                <Text style={s.consultationText}>
                  {formatDate(item.created_at)}
                </Text>
                <Text style={s.consultationText}>
                  {formatTime(item.created_at)}
                </Text>
              </TouchableOpacity>
            )}
          />
          <ProfileCard />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}
