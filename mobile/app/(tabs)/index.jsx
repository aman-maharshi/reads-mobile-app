import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from "../../store/authStore"

const Home = () => {
  const { user, token, logout } = useAuthStore()


  const handleLogout = () => {
    logout()
  }

  return (
    <View>
      <Text>Home</Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home