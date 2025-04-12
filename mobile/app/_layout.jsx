import { useEffect } from "react";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import SafeScreen from "@/components/SafeScreen"
import Toast from "react-native-toast-message";
import { useAuthStore } from "@/store/authStore"
import { useFonts } from "expo-font"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const router = useRouter()
  const segments = useSegments()
  // console.log(segments, "segments")

  const { user, token, authCheck } = useAuthStore()

  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("@/assets/fonts/JetBrainsMono-Medium.ttf"),
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])
  

  // get user and token from AsyncStorage if available
  useEffect(() => {
    authCheck()
  }, [])

  useEffect(() => {
    const onAuthScreen = segments[0] === "(auth)"
    const isSignedIn = user && token

    if (!onAuthScreen && !isSignedIn) {
      router.replace("/(auth)")
    } else if (isSignedIn && onAuthScreen) {
      router.replace("/(tabs)")
    }

  }, [user, token, segments])

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
