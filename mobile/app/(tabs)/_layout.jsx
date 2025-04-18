import { Tabs } from 'expo-router'
import { View, Text } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import COLORS from "../../constants/colors"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const TabsLayout = () => {
  const insets = useSafeAreaInsets()

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      headerTitleStyle: {
        color: COLORS.textPrimary,
        fontWeight: 600
      },
      headerShadowVisible: false,
      tabBarStyle: {
        backgroundColor: COLORS.cardBackground,
        borderTopWidth: 0,
        // borderTopColor: COLORS.border,
        paddingTop: 5,
        paddingBottom: insets.bottom,
        height: 60 + insets.bottom,
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout