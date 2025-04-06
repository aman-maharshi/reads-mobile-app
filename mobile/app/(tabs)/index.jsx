import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useAuthStore } from "../../store/authStore"
import styles from "../../styles/home.styles"
import { BASE_URL } from '../../constants/apiUrl'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'

const Home = () => {
  const { user, token, logout } = useAuthStore()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchBooks = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true)
      } else if (pageNum === 1) {
        setLoading(true)
      }

      const response = await fetch(`${BASE_URL}/api/books/all?page=${pageNum}&limit=2`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch books")
      }

      setBooks((prevBooks) => [...prevBooks, ...data.books])
      setHasMore(pageNum < data.totalPages)
      setPage(pageNum)

    } catch (error) {
      console.error("Error fetching books:", error)
    } finally {
      if (refresh) {
        setRefreshing(false)
      } else {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])


  const bookCard = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: item.user.profileImage }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
      </View>

      <View style={styles.bookImageContainer}>
        <Image
          source={item.image}
          style={styles.bookImage}
          contentFit="cover"
        />
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="black" />}
      <FlatList
        data={books}
        renderItem={bookCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default Home