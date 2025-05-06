import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import NoteScreen from '@/screens/NoteScreen';

const Stack = createNativeStackNavigator();

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
