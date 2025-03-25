import { create } from "zustand"

import AsyncStorage from "@react-native-async-storage/async-storage"

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,

  register: async (username, email, password) => {
    set({ loading: true })

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      await AsyncStorage.setItem("token", data.token)
      await AsyncStorage.setItem("user", JSON.stringify(data.user))

      set({ user: data.user, token: data.token, loading: false })

      return { success: true }

    } catch (error) {
      console.log(error)
      set({ loading: false })
      return { success: false, error: error.message }
    }
  }
}))