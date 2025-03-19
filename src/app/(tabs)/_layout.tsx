import React, { useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { Drawer } from '@/components/drawer'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <Tabs>
        <Tabs.Screen
          name='index'
          options={{
            title: 'Tab One',
            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
            headerRight: () => (
              <Pressable onPress={() => setIsDrawerOpen(true)}>
                {({ pressed }) => (
                  <FontAwesome
                    name='bars' // Ícone de menu
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            ),
          }}
        />
      </Tabs>
    </Drawer>
  )
}
