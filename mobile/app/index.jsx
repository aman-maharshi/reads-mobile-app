import { Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image"
import styles from "@/styles/create.styles"
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Link href="/(auth)">Login</Link>
    </View>
  )
}

