import { useState } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import styles from "../../styles/create.styles"

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
              <Text style={styles.title}>Create a new post</Text>
              <Text style={styles.subtitle}>Share your thoughts with the world</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Create