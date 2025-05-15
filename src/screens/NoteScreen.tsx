import { useState, useEffect, useRef } from "react"
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, useWindowDimensions, Text, } from "react-native"
import { type RootStackParamList, type StackNavigation } from "@/navigators/RootNavigator"
import { SafeAreaView } from "react-native-safe-area-context"
import { type RouteProp } from "@react-navigation/native"
import { useDatabase } from "../context/DatabaseContext"
import { useTheme } from "../context/ThemeContext"

const NoteScreen = ({ navigation, route }: { navigation: StackNavigation, route: RouteProp<RootStackParamList, "Note"> }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isFavorite, setIsFavorite] = useState(false)
    const { db } = useDatabase()
    const { colors } = useTheme()
    const contentInputRef = useRef(null)
    const dimensions = useWindowDimensions()

    // Responsive layout for Windows
    const isWideScreen = dimensions.width > 800

    const { noteId, isNew } = route.params || {}

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerButtons}>
                    <TouchableOpacity
                        style={[styles.headerButton, {
                            backgroundColor: colors.primary
                        }]}
                        activeOpacity={0.5}
                        onPress={saveNote}
                    >
                        <Text style={styles.headerButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [title, content, isFavorite, colors.primary]);

    const saveNote = () => {
        const now = new Date().toISOString();

        // Create new note
        db!.transaction((tx: any) => {
            tx.executeSql(
                "INSERT INTO notes (title, content, is_favorite, created_at, updated_at) VALUES (?, ?, ?, ?, ?);",
                [title, content, isFavorite ? 1 : 0, now, now],
                () => {
                    navigation.goBack();
                    Alert.alert("Note Saved", "Your note has been saved successfully.", [{ text: "OK" }]);
                },
                (error: any) => {
                    console.error("Error creating note:", error)
                    return false
                },
            )
        })
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "windows" ? undefined : "padding"}
                style={styles.keyboardAvoid}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <ScrollView
                    style={styles.scrollView}
                    keyboardDismissMode="interactive"
                    contentContainerStyle={isWideScreen && styles.wideScrollContent}
                >
                    <View style={[styles.noteContainer, isWideScreen && styles.wideNoteContainer]}>
                        <TextInput
                            style={[styles.titleInput, { color: colors.text }, isWideScreen && styles.wideTitleInput]}
                            placeholder="Title"
                            placeholderTextColor={colors.secondaryText}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                            multiline
                            returnKeyType="next"
                        />
                        <TextInput
                            ref={contentInputRef}
                            style={[styles.contentInput, { color: colors.text }, isWideScreen && styles.wideContentInput]}
                            placeholder="Start typing..."
                            placeholderTextColor={colors.secondaryText}
                            value={content}
                            onChangeText={setContent}
                            multiline
                            textAlignVertical="top"
                            autoFocus={isNew}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    wideScrollContent: {
        flexGrow: 1,
        alignItems: "center",
    },
    noteContainer: {
        flex: 1,
        padding: 20,
    },
    wideNoteContainer: {
        width: "80%",
        maxWidth: 800,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 20,
        paddingVertical: 8,
        paddingLeft: 10
    },
    wideTitleInput: {
        fontSize: 28,
    },
    contentInput: {
        fontSize: 16,
        lineHeight: 24,
        flex: 1,
        minHeight: 300,
    },
    wideContentInput: {
        fontSize: 18,
        lineHeight: 28,
    },
    headerButtons: {
        flexDirection: "row",
    },
    headerButton: {
        marginRight: 15,
        backgroundColor: "blue",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    headerButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600"
    }
})

export default NoteScreen
