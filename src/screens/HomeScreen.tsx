import { useState, useCallback } from "react"
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput,
    Animated,
    KeyboardAvoidingView,
    Platform,
    useWindowDimensions,
} from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { useDatabase } from "../context/DatabaseContext"
import { useTheme } from "../context/ThemeContext"
import { SafeAreaView } from "react-native-safe-area-context"

const HomeScreen = () => {
    const [notes, setNotes] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const navigation = useNavigation()
    const { db, initialized } = useDatabase()
    const { theme, colors } = useTheme()
    const dimensions = useWindowDimensions()

    // Responsive layout for Windows
    const isWideScreen = dimensions.width > 800

    useFocusEffect(
        useCallback(() => {
            if (initialized) {
                fetchNotes()
            }
            return () => { }
        }, [initialized]),
    )

    const fetchNotes = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM notes ORDER BY updated_at DESC;",
                [],
                (_, { rows }) => {
                    setNotes(rows._array)
                },
                (_, error) => {
                    console.error("Error fetching notes:", error)
                    return false
                },
            )
        })
    }

    const filteredNotes = notes?.filter(
        (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

    const deleteNote = (id) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM notes WHERE id = ?;",
                [id],
                (_, result) => {
                    fetchNotes()
                },
                (_, error) => {
                    console.error("Error deleting note:", error)
                    return false
                },
            )
        })
    }

    const toggleFavorite = (id, currentValue) => {
        const newValue = currentValue ? 0 : 1

        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE notes SET is_favorite = ? WHERE id = ?;",
                [newValue, id],
                (_, result) => {
                    fetchNotes()
                },
                (_, error) => {
                    console.error("Error updating favorite status:", error)
                    return false
                },
            )
        })
    }

    const renderItem = ({ item }) => {
        const formattedDate = item.updated_at

        return (
                <TouchableOpacity
                    style={[styles.noteItem, { backgroundColor: colors.card }, isWideScreen && styles.noteItemWide]}
                    onPress={() => navigation.navigate("note", { noteId: item.id })}
                >
                    <View style={styles.noteContent}>
                        <Text style={[styles.noteTitle, { color: colors.text }]} numberOfLines={1}>
                            {item.title || "Untitled Note"}
                        </Text>
                        <Text style={[styles.notePreview, { color: colors.secondaryText }]} numberOfLines={2}>
                            {item.content}
                        </Text>
                        <View style={styles.noteFooter}>
                            <Text style={[styles.noteDate, { color: colors.tertiaryText }]}>{formattedDate}</Text>
                            {item.is_favorite ? <Icon name="star" size={14} color="#FFD700" /> : null}
                        </View>
                    </View>
                </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView behavior={Platform.OS === "windows" ? undefined : "padding"} style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={styles.searchContainer}>
                        <Icon name="search" size={20} color={colors.secondaryText} style={styles.searchIcon} />
                        <TextInput
                            style={[
                                styles.searchInput,
                                { backgroundColor: colors.inputBackground, color: colors.text },
                                isWideScreen && styles.searchInputWide,
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
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={[styles.listContainer, isWideScreen && styles.listContainerWide]}
                        showsVerticalScrollIndicator={true}
                        numColumns={isWideScreen ? 2 : 1}
                        key={isWideScreen ? "grid" : "list"}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Icon name="document-text-outline" size={64} color={colors.secondaryText} />
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
                    onPress={() => navigation.navigate("note", { isNew: true })}
                >
                    <Icon name="add" size={24} color="white" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

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
        borderRadius: 10,
        paddingHorizontal: 36,
        fontSize: 16,
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
    noteItem: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: "100%",
    },
    noteItemWide: {
        width: "48%",
        marginHorizontal: "1%",
    },
    noteContent: {
        flex: 1,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 5,
    },
    notePreview: {
        fontSize: 14,
        marginBottom: 10,
    },
    noteFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    noteDate: {
        fontSize: 12,
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
