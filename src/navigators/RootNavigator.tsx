import React from 'react';
import type { NavigationProp } from '@react-navigation/native';
import NoteScreen from '@/screens/NoteScreen';
import HomeScreen from '@/screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';

export type ScreenNames = ["main", "note"];

export type RootStackParamList = {
    main: undefined;
    note: { isNew: boolean };
};

export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="main"
                component={DrawerNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="note"
                component={NoteScreen}
                options={({ route }) => ({
                    title: route.params?.isNew ? "New Note" : "Edit Note",
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "#F9F9FB",
                    },
                })}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
