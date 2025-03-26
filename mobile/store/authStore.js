import { create } from "zustand"

import AsyncStorage from "@react-native-async-storage/async-storage"

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,

  register: async (username, email, password) => {
    set({ loading: true })

    try {
      const response = await fetch("https://reads-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      })

      const data = await response.json()

      // console.log(data, "data")
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      await AsyncStorage.setItem("token", data.token)
      await AsyncStorage.setItem("user", JSON.stringify(data.user))

      set({ user: data.user, token: data.token, loading: false })

      return { success: true }

    } catch (error) {
      console.log(error, "register error")
      set({ loading: false })
      return { success: false, error: error.message }
    }
  },

  login: async (email, password) => {
    set({ loading: true })

    try {
      const response = await fetch("https://reads-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      await AsyncStorage.setItem("token", data.token)
      await AsyncStorage.setItem("user", JSON.stringify(data.user))

      set({ user: data.user, token: data.token, loading: false })

      return { success: true }

    } catch (error) {
      console.log(error, "login error")
      set({ loading: false })
      return { success: false, error: error.message }
    }
  },

  authCheck: async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      const userJson = await AsyncStorage.getItem("user")
      const user = userJson ? JSON.parse(userJson) : null
      // console.log(token, user)

      set({ token, user })
    } catch (error) {
      console.log(error, "authCheck error")
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token")
    await AsyncStorage.removeItem("user")

    set({ user: null, token: null })
  }
}))