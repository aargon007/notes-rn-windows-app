import { useState, useCallback } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { useDatabase } from "../context/DatabaseContext"
import { useTheme } from "../context/ThemeContext"
import { fetchNotes } from "@/db/notes.service"
import NoteCard from "@/components/home/NoteCard"
import { type StackNavigation } from "@/navigators/RootNavigator"
import { type TNote } from "@/types/note"

const HomeScreen = () => {
    const [notes, setNotes] = useState<TNote[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { navigate } = useNavigation<StackNavigation>();
    const { db, initialized } = useDatabase();
    const { theme, colors } = useTheme();
    // Responsive layout for Windows
    const [isWideScreen, setIsWideScreen] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (initialized) {
                fetchNotes(db)
            }
            return () => { }
        }, [initialized]),
    );

    const filteredNotes = notes?.filter((note) =>
        note?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note?.content.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView behavior={Platform.OS === "windows" ? undefined : "padding"} style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={styles.searchContainer}>
                        <Icon
                            name="search"
                            size={20}
                            color={colors.secondaryText}
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={[
                                styles.searchInput,
                                { color: colors.text }
                            ]}
                            placeholder="Search notes..."
                            placeholderTextColor={colors.secondaryText}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {filteredNotes.length > 0 ? (
                    <FlatList
                        data={filteredNotes}
                        renderItem={NoteCard}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={[styles.listContainer, isWideScreen && styles.listContainerWide]}
                        showsVerticalScrollIndicator={true}
                        numColumns={isWideScreen ? 2 : 1}
                        key={isWideScreen ? "grid" : "list"}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Icon
                            name="document-text-outline"
                            size={64}
                            color={colors.secondaryText}
                        />
                        <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
                            {searchQuery ? "No matching notes found" : "No notes yet"}
                        </Text>
                        <Text style={[styles.emptySubtext, { color: colors.tertiaryText }]}>
                            {searchQuery ? "Try a different search term" : "Create a new note to get started"}
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.fab, { backgroundColor: colors.primary }]}
                    onPress={() => navigate("Note", { isNew: true })}
                >
                    <Icon name="add-sharp" size={24} color="white" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    searchIcon: {
        position: "absolute",
        zIndex: 1,
        left: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingVertical: 8,
        borderRadius: 10,
        paddingHorizontal: 36,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    searchInputWide: {
        maxWidth: 600,
        alignSelf: "center",
    },
    listContainer: {
        padding: 15,
    },
    listContainerWide: {
        alignItems: "flex-start",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 16,
        textAlign: "center",
    },
    emptySubtext: {
        fontSize: 14,
        marginTop: 8,
        textAlign: "center",
    },
    fab: {
        position: "absolute",
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    rightActions: {
        flexDirection: "row",
        width: 120,
        height: "100%",
    },
    actionButton: {
        width: 60,
        height: "85%",
        marginVertical: 4,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "#FF3B30",
    },
    favoriteButton: {
        backgroundColor: "#FFD700",
    },
})

export default HomeScreen
