import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native'
import styles from "../styles/profile.styles"
import { useRoute } from '@react-navigation/native'
import { Image } from 'expo-image'
import { Ionicons } from "@expo/vector-icons"
import COLORS from '../constants/colors'
import { useRouter } from 'expo-router'
import { BASE_URL } from '../constants/apiUrl'
import { useAuthStore } from "../store/authStore"
import ScreenLoader from '../components/ScreenLoader'
import { formatDate } from '../lib/utils'

const UserProfile = () => {
  const route = useRoute()
  const { userId, username, profileImage } = route.params
  const { token } = useAuthStore()
  const router = useRouter()

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchBooksByUserId()
  }, [])

  const fetchBooksByUserId = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${BASE_URL}/api/books/user/${userId}`, {
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

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchBooksByUserId()
    setRefreshing(false)
  }

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
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.profileHeaderUser}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={25}
            color={COLORS.textPrimary}
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>

        <Image
          source={{ uri: profileImage }}
          style={styles.profileImageUser}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>

      {loading && !refreshing ? <ScreenLoader /> : (
        <>
          <View style={styles.booksHeader}>
            <Text style={styles.bookTitle}>Books</Text>
            <Text style={styles.booksCount}>{books.length} books</Text>
          </View>

          <FlatList
            data={books}
            renderItem={renderBookItem}
            keyExtractor={(item => item._id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.booksList}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[COLORS.primary]}
                tintColor={COLORS.primary}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="book-outline" size={50} color={COLORS.textSecondary} />
                <Text style={styles.emptyText}>No books added by {username} yet!</Text>
              </View>
            }
          />
        </>

      )}
    </View>
  )
}

export default UserProfile