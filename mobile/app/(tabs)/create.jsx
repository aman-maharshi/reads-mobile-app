import { useState } from 'react'
import {
  View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity,
  Alert, Image,
  ActivityIndicator
} from 'react-native'
import { useRouter } from 'expo-router'
import styles from "../../styles/create.styles"
import COLORS from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import RatingPicker from '../../components/RatingPicker'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useAuthStore } from '../../store/authStore'
import { BASE_URL } from '../../constants/apiUrl'

const Create = () => {
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [rating, setRating] = useState(0)
  const [image, setImage] = useState(null) // preview image
  const [imageBase64, setImageBase64] = useState(null)
  const [loading, setLoading] = useState(false)

  const { user, token } = useAuthStore()

  const router = useRouter()

  const selectImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== "granted") {
          Alert.alert("Sorry, we need camera roll permissions to upload an image.")
          return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
          base64: true,
        })

        if (!result.canceled) {
          setImage(result.assets[0].uri)

          if (result.assets[0].base64) {
            setImageBase64(result.assets[0].base64)
          } else {
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
              encoding: FileSystem.EncodingType.Base64,
            })
            setImageBase64(base64)
          }
        }
      }
    } catch (error) {
      console.log("Error selecting image:", error)
    }
  }

  const handleSubmit = async () => {
    if (!title || !caption || !imageBase64 || !rating) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      // get file extension
      const imageExtension = image.split(".").pop()
      const imageType = `image/${imageExtension}` || `image/jpeg`

      const imageDataUrl = `data:${imageType};base64,${imageBase64}`

      const response = await fetch(`${BASE_URL}/api/books/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(),
          image: imageDataUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      Alert.alert("Success", "Book recommendation added successfully")
      setTitle("")
      setCaption("")
      setImage(null)
      setImageBase64(null)
      setRating(0)
      router.push("/")

    } catch (error) {
      console.log(error)
      Alert.alert("Error", error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
      keyboardVerticalOffset={100}
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

            <View style={styles.formGroup}>
              {/* <Text style={styles.label}>Caption</Text> */}
              <Text style={styles.label}>Author</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Write your review or thoughts about this book..."
                placeholderTextColor={COLORS.placeholderText}
                value={caption}
                onChangeText={setCaption}
                // multiline
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Share</Text>
                </>
              )}

            </TouchableOpacity>

          </View>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Create