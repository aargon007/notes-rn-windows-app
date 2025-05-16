import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./src/context/ThemeContext";
import { DatabaseProvider } from "./src/context/DatabaseContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootNavigator from "@/navigators/RootNavigator";

LogBox.ignoreLogs(['useCode() first argument should be a function that returns an animation node.']);

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