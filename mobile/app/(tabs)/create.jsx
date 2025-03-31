import { useState } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import styles from "../../styles/create.styles"
import COLORS from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const Create = () => {
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [rating, setRating] = useState(0)
  const [image, setImage] = useState(null) // preview image
  const [imageBase64, setImageBase64] = useState(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const selectImage = async () => { }

  const handleSubmit = async () => { }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendataion</Text>
            <Text style={styles.subtitle}>Share your favoutie reads with others</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter book title"
                  value={title}
                  onChangeText={setTitle}
                  placeholderTextColor={COLORS.placeholderText}
                />
              </View>
            </View>
          </View>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Create