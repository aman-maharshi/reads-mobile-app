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
import ProfileHeader from '../../components/ProfileHeader'
import LogoutButton from '../../components/LogoutButton'

const Profile = () => {
  const { user, token, logout } = useAuthStore()
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const router = useRouter()

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />
    </View>
  )
}

export default Profile