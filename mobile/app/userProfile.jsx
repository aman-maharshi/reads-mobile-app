import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from "../styles/profile.styles"
import { useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Ionicons } from "@expo/vector-icons"
import COLORS from '../constants/colors';
import { router } from 'expo-router';

const UserProfile = () => {
  const route = useRoute();
  const { userId, username, profileImage } = route.params

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

      {/* <View style={styles.booksHeader}>
        <Text style={styles.bookTitle}>Books by {username} 📚</Text>
        <Text style={styles.booksCount}>5 books</Text>
      </View> */}
    </View>
  )
}

export default UserProfile