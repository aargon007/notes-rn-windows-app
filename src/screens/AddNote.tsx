import { useState, useRef } from "react"
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, useWindowDimensions, Text, SafeAreaView, } from "react-native"
import { WebView, type WebViewMessageEvent } from 'react-native-webview';
import { type StackNavigation } from "@/navigators/RootNavigator"
import { useDatabase } from "../context/DatabaseContext"
import { useTheme } from "../context/ThemeContext"
import htmlContent from "@/utils/htmlContent";
import BackIcon from "@/icons/BackIcon"

const AddNote = ({ navigation }: { navigation: StackNavigation }) => {
    const [title, setTitle] = useState("")
    const [editorContent, setEditorContent] = useState('');
    const [pendingSave, setPendingSave] = useState(false);
    const webviewRef = useRef<WebView>(null);

    const { db } = useDatabase()
    const { colors } = useTheme()
    const dimensions = useWindowDimensions()

    // Responsive layout for Windows
    const isWideScreen = dimensions.width > 800

    const getContent = () => {
        webviewRef.current?.injectJavaScript(`
          if (window.getContent) window.getContent();
          true;
        `);
    };

    const onMessage = (event: WebViewMessageEvent) => {
        const html = event.nativeEvent.data; // 🔐 Capture immediately
        setEditorContent(html);

        // If we are waiting to save, do it now
        if (pendingSave) {
            const now = new Date().toISOString();
            db!.transaction((tx: any) => {
                tx.executeSql(
                    "INSERT INTO notes (title, content, is_favorite, created_at, updated_at) VALUES (?, ?, ?, ?, ?);",
                    [title, html, 0, now, now],
                    () => {
                        navigation.goBack();
                        // Alert.alert("Note Saved", "Your note has been saved successfully.", [{ text: "OK" }]);
                    },
                    (error: any) => {
                        console.error("Error creating note:", error)
                        return false
                    },
                )
            });
            setPendingSave(false);
        }
    };

    const saveNote = () => {
        setPendingSave(true);
        getContent();
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.headerButtons}>
                <TouchableOpacity
                    style={[{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10
                    }]}
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                >
                    <BackIcon />
                    <Text style={{ color: colors.text, fontSize: 18, fontWeight: "600" }}>
                        Home
                    </Text>
                </TouchableOpacity>

                <Text style={{ color: colors.text }}>New Note</Text>

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
                        <WebView
                            ref={webviewRef}
                            originWhitelist={['*']}
                            source={{ html: htmlContent }}
                            onMessage={onMessage}
                            javaScriptEnabled={true}
                            style={styles.richEditor}
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
    richEditor: {
        minHeight: 300,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
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
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    headerButton: {
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

export default AddNote


//     < RichToolbar
// editor = { richTextRef }
// actions = {
//     [
//     actions.undo,
//     actions.redo,
//     actions.setBold,
//     actions.setItalic,
//     actions.setUnderline,
//     actions.setStrikethrough,
//     actions.insertImage,
//     actions.alignLeft,
//     actions.alignCenter,
//     actions.alignRight,
//     actions.blockquote,
//     actions.insertBulletsList,
//     actions.insertOrderedList
//     ]}
//     /> 