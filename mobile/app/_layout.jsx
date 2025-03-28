import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import SafeScreen from "@/components/SafeScreen"
import Toast from "react-native-toast-message";
import { useAuthStore } from "@/store/authStore"

export default function RootLayout() {
  const router = useRouter()
  const segments = useSegments()
  // console.log(segments, "segments")

  const { user, token, authCheck } = useAuthStore()

  useEffect(() => {
    authCheck()

    if (user && token) {
      router.replace("/(tabs)")
    } else if (!user && !token && segments[0] !== "(auth)") {
      router.replace("/(auth)/login")
    }
  }, [])


  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>


      <StatusBar style="dark" />
      <Toast />
    </SafeAreaProvider>
  )
}
