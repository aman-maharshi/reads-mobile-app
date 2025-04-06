import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native'
import { Image } from 'expo-image'
import { useAuthStore } from "../../store/authStore"
import { useRouter } from "expo-router"
import styles from "../../styles/profile.styles"
import { BASE_URL } from '../../constants/apiUrl'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '../../constants/colors'
import { formatDate } from '../../lib/utils'

const Profile = () => {
  const { user, token, logout } = useAuthStore()
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const router = useRouter()

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Logout",
        onPress: () => logout(),
        style: "destructive"
      }
    ])
  }

  return (
    <View style={styles.container}>
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

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={confirmLogout}
      >
        <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile