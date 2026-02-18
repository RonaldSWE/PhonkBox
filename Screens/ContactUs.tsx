import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { useTheme } from "../Theme/ThemeContext"

const ContactUs = () => {
  const { theme, themeType } = useTheme()
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Contact Us
        </Text>
      </View>
      <StatusBar style={themeType === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  )
}

export default ContactUs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
})