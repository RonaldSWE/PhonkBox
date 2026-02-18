import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeType = "light" | "dark";

export interface Theme {
  type: ThemeType;
  colors: {
    primary: string;
    background: string;
    text: string;
    border: string;
    card: string;
  };
}

export const lightTheme: Theme = {
  type: "light",
  colors: {
    primary: "rgb(128, 0, 255)",
    background: "rgb(255, 255, 255)",
    text: "rgb(0, 0, 0)",
    border: "rgb(229, 229, 234)",
    card: "rgb(242, 242, 247)",
  },
};

export const darkTheme: Theme = {
  type: "dark",
  colors: {
    primary: "rgb(128, 0, 255)",
    background: "rgb(0, 0, 0)",
    text: "rgb(255, 255, 255)",
    border: "rgb(56, 56, 58)",
    card: "rgb(28, 28, 30)",
  },
};

interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  toggleTheme: () => void;
  setThemeType: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeType, setThemeTypeState] = useState<ThemeType>(
    systemColorScheme === "dark" ? "dark" : "light",
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved theme preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("appTheme");
        if (savedTheme === "dark" || savedTheme === "light") {
          setThemeTypeState(savedTheme);
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadTheme();
  }, []);

  const setThemeType = async (newThemeType: ThemeType) => {
    try {
      setThemeTypeState(newThemeType);
      await AsyncStorage.setItem("appTheme", newThemeType);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const toggleTheme = () => {
    const newThemeType = themeType === "light" ? "dark" : "light";
    setThemeType(newThemeType);
  };

  const theme = themeType === "light" ? lightTheme : darkTheme;

  if (!isInitialized) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        toggleTheme,
        setThemeType,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
