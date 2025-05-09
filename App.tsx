import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./src/context/ThemeContext";
import { DatabaseProvider } from "./src/context/DatabaseContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootNavigator from "@/navigators/RootNavigator";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <DatabaseProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </DatabaseProvider>
        </ThemeProvider>
    </GestureHandlerRootView>
  )
}