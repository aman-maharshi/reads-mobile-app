import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import styles from "../../styles/login.styles"
// import { Image } from "expo-image"
import { Ionicons } from "@expo/vector-icons"
import COLORS from '../../constants/colors'

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topIllustration}>
        <Image
          source={require("../../assets/images/illustration.png")}
          style={styles.illustrationImage}
          resizeMode='contain'
        />
      </View>
      <View style={styles.card}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput 
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.placeholderText}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

        </View>
      </View>
    </View>
  )
}

export default Login