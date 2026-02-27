import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle; // Custom background/border styles
  textStyle?: TextStyle; // Custom font styles
}

const AppButton: React.FC<Props> = ({ title, onPress, style, textStyle }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(128, 0, 255)",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // Shadow for Android
    shadowColor: "rgb(0, 0, 0)", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  text: {
    color: "rgb(255, 255, 255)",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default AppButton