import { StyleSheet, Text, View, Switch } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import React from "react"
import { useTheme } from "../Theme/ThemeContext"

const Settings = () => {
  const { theme, themeType, toggleTheme } = useTheme()

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Settings
        </Text>
      </View>

      <View
        style={[
          styles.settingItem,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.settingLabel}>
          <Text style={[styles.labelText, { color: theme.colors.text }]}>
            Theme
          </Text>
          <Text style={[styles.labelSubtext, { color: theme.colors.text }]}>
            {themeType === "dark" ? "Dark" : "Light"} Theme
          </Text>
        </View>
        <Switch
          value={themeType === "dark"}
          onValueChange={toggleTheme}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={theme.colors.card}
        />
      </View>

      <StatusBar style={themeType === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  )
}

export default Settings

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
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  settingLabel: {
    flex: 1,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  labelSubtext: {
    fontSize: 14,
    opacity: 0.6,
  },
})