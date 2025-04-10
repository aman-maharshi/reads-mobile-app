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
import ScreenLoader from '../../components/ScreenLoader'

const Profile = () => {
  const { user, token, logout } = useAuthStore()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  const router = useRouter()

  const fetchUserBooks = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${BASE_URL}/api/books/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch books")
      }

      setBooks(data)

    } catch (error) {
      console.error(error)
      Alert.alert("Error", "Failed to fetch books")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserBooks()
  }, [])

  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Image
        source={item.image}
        style={styles.bookImage}
      />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookCaption}>{item.caption}</Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: item.rating }, (_, index) => (
            <Ionicons key={index} name="star" size={16} color="#FFD700" />
          ))}
          {Array.from({ length: 5 - item.rating }, (_, index) => (
            <Ionicons key={index} name="star-outline" size={16} color="#FFD700" />
          ))}
        </View>

        <Text style={styles.bookDate}>
          {formatDate(item.createdAt)}
        </Text>
      </View>

      <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* <View style={styles.themeRow}>
        <TouchableOpacity onPress={() => setIsDarkTheme(!isDarkTheme)}>
          <Ionicons
            name={isDarkTheme ? "moon-outline" : "sunny-outline"}
            size={24}
            color={COLORS.textSecondary}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View> */}

      <ProfileHeader />
      <LogoutButton />

      <View style={styles.booksHeader}>
        <Text style={styles.bookTitle}>Your Books 📚</Text>
        <Text style={styles.booksCount}>{books.length} books</Text>
      </View>

      {loading ? <ScreenLoader /> : (
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
      )}
    </View>
  )
}

export default Profile