import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import { useAuthStore } from "../store/authStore"
import styles from "../styles/profile.styles"
import { formatDate } from '../lib/utils'

const ProfileHeader = () => {
  const { user } = useAuthStore()

  return (
    <View style={styles.profileHeader}>
      <Image
        source={{ uri: user?.profileImage }}
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        {user?.createdAt && (
          <Text style={styles.memberSince}>
            🗓️ Joined {formatDate(user?.createdAt)}
          </Text>
        )}
      </View>
    </View>
  )
}

export default ProfileHeader