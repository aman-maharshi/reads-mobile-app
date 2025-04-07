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

  const fetchUserBooks = async () => { }

  useEffect(() => {
    fetchUserBooks()
  }, [])

  const renderBookItem = ({ item }) => { }


  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />

      <View style={styles.booksHeader}>
        <Text style={styles.bookTitle}>Your Books 📚</Text>
        <Text style={styles.booksCount}>{books.length} books</Text>
      </View>

      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item => item._id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.booksList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={50} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No books yet</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/create')}>
              <Text style={styles.addButtonText}>Add your first Book</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  )
}

export default Profile