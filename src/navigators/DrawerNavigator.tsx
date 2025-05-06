import FavoritesScreen from "@/screens/FavoritesScreen";
import HomeScreen from "@/screens/HomeScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer"
import Icon from "react-native-vector-icons/Ionicons"

// For Windows, we'll use a drawer navigation instead of tabs for a more desktop-like experience
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={({ route }) => ({
                drawerIcon: ({ focused, color, size }) => {
                    let iconName

                    if (route.name === "Notes") {
                        iconName = focused ? "document-text" : "document-text-outline"
                    } else if (route.name === "Favorites") {
                        iconName = focused ? "star" : "star-outline"
                    } else if (route.name === "Settings") {
                        iconName = focused ? "settings" : "settings-outline"
                    }

                    return <Icon name={iconName!} size={size} color={color} />
                },
                drawerActiveTintColor: "#007AFF",
                drawerInactiveTintColor: "gray",
                headerShown: true,
            })}
        >
            <Drawer.Screen
                name="Notes"
                component={HomeScreen}
                options={{
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }}
            />
            <Drawer.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;