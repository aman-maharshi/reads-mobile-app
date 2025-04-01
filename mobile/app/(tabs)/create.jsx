import { useState } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import styles from "../../styles/create.styles"
import COLORS from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import RatingPicker from '../../components/RatingPicker'
import * as ImagePicker from 'expo-image-picker'

const Create = () => {
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [rating, setRating] = useState(3)
  const [image, setImage] = useState(null) // preview image
  const [imageBase64, setImageBase64] = useState(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const selectImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== "granted") {
          Alert.alert("Sorry, we need camera roll permissions to upload an image.")
          return
        }
      }

    } catch (error) {
      console.log("Error selecting image:", error)
    }
  }

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

            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              <RatingPicker
                rating={rating}
                setRating={setRating}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Image</Text>

              <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={styles.previewImage}
                  />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                    <Text style={styles.placeholderText}>Tap to select image</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

          </View>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Create