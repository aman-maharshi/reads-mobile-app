import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image"
import styles from "@/styles/create.styles"
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Link href="/(auth)" asChild>
        <TouchableOpacity style={{ marginTop: 40, padding: 10, borderRadius: 10 }}>
          <Text style={{fontWeight: "bold", textAlign: "center", fontSize: 16}}>Login</Text>
        </TouchableOpacity>
      </Link>
      {/* <Link href="/(auth)/signup" asChild>
        <TouchableOpacity style={{ marginTop: 40 }}>
        <Text style={{fontWeight: "bold", textAlign: "center", fontSize: 16}}>Sign Up</Text>
        </TouchableOpacity>
      </Link> */}
    </View>
  )
}

