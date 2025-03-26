import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image"
import styles from "@/styles/create.styles"
import { Link } from "expo-router";
import { useAuthStore } from '../store/authStore'

export default function Index() {
  const { user, logout } = useAuthStore()

  return (
    <View
      style={styles.container}
    >
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: "center" }}>
        Hello, {user?.username || "Guest"}
      </Text>
      <Link href="/(auth)" asChild>
        <TouchableOpacity style={{ marginTop: 40, padding: 10, borderRadius: 10 }}>
          <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 16 }}>Login</Text>
        </TouchableOpacity>
      </Link>
      {/* <Link href="/(auth)/signup" asChild>
        <TouchableOpacity style={{ marginTop: 40 }}>
        <Text style={{fontWeight: "bold", textAlign: "center", fontSize: 16}}>Sign Up</Text>
        </TouchableOpacity>
      </Link> */}


      <TouchableOpacity 
        style={{ marginTop: 40, backgroundColor: "gray", padding: 10, borderRadius: 10 }}
        onPress={logout} 
      >
        <Text style={{ textAlign: "center", fontWeight: "bold", color: "white" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

