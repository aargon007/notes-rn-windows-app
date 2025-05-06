import { Appearance } from "react-native"
import { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Define theme colors
const themes = {
    light: {
        background: "#F9F9FB",
        card: "#FFFFFF",
        text: "#000000",
        secondaryText: "#6B6B6B",
        tertiaryText: "#ACACAC",
        border: "#E5E5E5",
        icon: "#007AFF",
        primary: "#007AFF",
        primaryTransparent: "rgba(0, 122, 255, 0.2)",
        inputBackground: "#EEEEF0",
        switchThumb: "#FFFFFF",
        error: "#FF3B30",
    },
    dark: {
        background: "#1C1C1E",
        card: "#2C2C2E",
        text: "#FFFFFF",
        secondaryText: "#ADADAD",
        tertiaryText: "#636366",
        border: "#38383A",
        icon: "#0A84FF",
        primary: "#0A84FF",
        primaryTransparent: "rgba(10, 132, 255, 0.2)",
        inputBackground: "#38383A",
        switchThumb: "#ADADAD",
        error: "#FF453A",
    },
}

// Create context
const ThemeContext = createContext<any>(null);

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext)

// Provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const deviceTheme = Appearance.getColorScheme()
    const [theme, setTheme] = useState(deviceTheme || "light")

    // Load saved theme from storage on initial render
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem("theme")
                if (savedTheme) {
                    setTheme(savedTheme as "light" | "dark")
                }
            } catch (error) {
                console.error("Error loading theme from storage:", error)
            }
        }

        loadTheme()
    }, [])

    // Save theme to storage when it changes
    useEffect(() => {
        const saveTheme = async () => {
            try {
                await AsyncStorage.setItem("theme", theme)
            } catch (error) {
                console.error("Error saving theme to storage:", error)
            }
        }

        saveTheme()
    }, [theme])

    const value = {
        theme,
        colors: themes[theme],
        setTheme,
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
