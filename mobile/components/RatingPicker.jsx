import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from "../styles/create.styles"
import COLORS from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const RatingPicker = ({ rating, setRating }) => {
  const stars = [1, 2, 3, 4, 5]

  return (
    <View style={styles.ratingContainer}>
      {stars.map((_, index) => {
        const starIndex = index + 1

        return (
          <TouchableOpacity
            key={starIndex}
            style={styles.starButton}
            onPress={() => setRating(starIndex)}
          >
            <Ionicons
              name={starIndex <= rating ? "star" : "star-outline"}
              size={27}
              color={starIndex <= rating ? "#f4b400" : COLORS.textSecondary}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default RatingPicker