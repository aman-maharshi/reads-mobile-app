import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from "../styles/create.styles"
import COLORS from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const RatingPicker = ({rating, setRating}) => {
  const stars = []

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <TouchableOpacity
        key={i}
        style={styles.starButton}
        onPress={() => setRating(i)}
      >
        <Ionicons 
          name={i <= rating ? "star" : "star-outline"}
          size={32}
          color={ i <= rating ? "#f4b400" : COLORS.textSecondary }
        />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.ratingContainer}>
      {stars}
    </View>
  ) 
}

export default RatingPicker