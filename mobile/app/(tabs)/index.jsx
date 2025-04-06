import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { useAuthStore } from "../../store/authStore"
import styles from "../../styles/home.styles"
import { BASE_URL } from '../../constants/apiUrl'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { formatDate } from '../../lib/utils'
import COLORS from '../../constants/colors'
import ScreenLoader from '../../components/ScreenLoader'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

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

      const response = await fetch(`${BASE_URL}/api/books/all?page=${pageNum}&limit=5`, {
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

      // will give not unique key (_id) error
      // setBooks((prevBooks) => [...prevBooks, ...data.books])

      // merge the existing books with data.books and filters out duplicates based on _id
      const uniqueBooks =
        refresh || pageNum === 1
          ? data.books
          : Array.from(
            new Set([...books, ...data.books].map(book => book._id))
          ).map(id =>
            [...books, ...data.books].find(book => book._id === id)
          )

      setBooks(uniqueBooks)

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

  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing) {
      // sleep(3000)
      await fetchBooks(page + 1)
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

      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.caption}>{item.caption}</Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: item.rating }, (_, index) => (
            <Ionicons key={index} name="star" size={16} color="#FFD700" />
          ))}
          {Array.from({ length: 5 - item.rating }, (_, index) => (
            <Ionicons key={index} name="star-outline" size={16} color="#FFD700" />
          ))}
        </View>
        <Text style={styles.date}>
          {formatDate(item.createdAt)}
        </Text>
      </View>
    </View>
  )

  if (loading) {
    return <ScreenLoader />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={bookCard}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.25}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchBooks(1, true)}
            colors={[COLORS.primary]} 
            tintColor={COLORS.primary}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Reads 📚</Text>
            <Text style={styles.headerSubtitle}>Discover great reads from the community👇</Text>
          </View>
        }
        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator
              style={styles.footerLoader}
              size={25}
              color={COLORS.primary}
            />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No book recommendations yet</Text>
            <Text style={styles.emptySubtext}>Be the first to share a book!</Text>
          </View>
        }
      />
    </View>
  )
}

export default Home