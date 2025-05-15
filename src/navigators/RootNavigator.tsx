import React from 'react';
import type { NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NoteScreen from '@/screens/NoteScreen';
import DrawerNavigator from './DrawerNavigator';

export type ScreenNames = ["Main", "Note"];

export type RootStackParamList = {
    Main: undefined;
    Note: { isNew: boolean, noteId?: number };
};

export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={DrawerNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Note"
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
