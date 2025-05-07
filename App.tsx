import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./src/context/ThemeContext";
import { DatabaseProvider } from "./src/context/DatabaseContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootNavigator from "@/navigators/RootNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <DatabaseProvider>
          <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootNavigator />
            </GestureHandlerRootView>
          </NavigationContainer>
        </DatabaseProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}