import React from 'react';
import type { NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteScreen from '@/screens/AddNote';
import HomeScreen from '@/screens/HomeScreen';

export type ScreenNames = ["Home", "AddNote"];

export type RootStackParamList = {
    Home: undefined;
    AddNote: undefined
};

export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="AddNote"
                component={NoteScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
