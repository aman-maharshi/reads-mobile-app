import { Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image"
import styles from "@/styles/create.styles"

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <View style={styles.card}>

        <View style={styles.header}>
          <Text style={styles.title}>Create a new post</Text>
          <Text style={styles.subtitle}>Fill in the form below to create a new post</Text>
        </View>
      </View>
    </View>
  )
}

