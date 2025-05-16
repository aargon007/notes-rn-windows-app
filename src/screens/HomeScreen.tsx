import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput,  SafeAreaView } from "react-native"
import { VirtualizedList } from "react-native-windows"
import { useNavigation } from "@react-navigation/native"
import { useDatabase } from "../context/DatabaseContext"
import { useTheme } from "../context/ThemeContext"
import { fetchNotes } from "@/db/notes.service"
import NoteCard from "@/components/home/NoteCard"
import { type StackNavigation } from "@/navigators/RootNavigator"
import { type TNote } from "@/types/note"
import SearchIcon from "@/icons/SearchIcon"
import PlusIcon from "@/icons/PlusIcon"
import DocumentIcon from "@/icons/DocumentIcon"

const HomeScreen = () => {
    const [notes, setNotes] = useState<TNote[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { navigate } = useNavigation<StackNavigation>();
    const { db, initialized } = useDatabase();
    const { colors } = useTheme();
    // Responsive layout for Windows
    const [isWideScreen, setIsWideScreen] = useState(false);

    useEffect(() => {
        fetchNotes(db!, setNotes)
    }, [initialized]);

    const getItem = (data: TNote[], index: number): TNote => data[index];
    const getItemCount = (data: TNote[]) => data?.length;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.header}>
                    <View style={styles.searchContainer}>
                        <View style={styles.searchIcon}>
                            <SearchIcon
                                color={colors.secondaryText}
                            />
                        </View>

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


                <VirtualizedList
                    data={notes}
                    getItemCount={getItemCount}
                    getItem={notes.length > 0 ? getItem : undefined}
                    renderItem={({ item }) => (
                        <NoteCard colors={colors} isWideScreen={isWideScreen} item={item} />
                    )}
                    keyExtractor={(item, index) => item?.id?.toString() || `note-${index}`}
                    contentContainerStyle={[styles.listContainer, isWideScreen && styles.listContainerWide]}
                    showsVerticalScrollIndicator={true}
                    key="grid"
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <DocumentIcon color={colors.secondaryText} />
                            <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
                                {searchQuery ? "No matching notes found" : "No notes yet"}
                            </Text>
                            <Text style={[styles.emptySubtext, { color: colors.tertiaryText }]}>
                                {searchQuery ? "Try a different search term" : "Create a new note to get started"}
                            </Text>
                        </View>
                    }
                />

                <TouchableOpacity
                    style={[styles.fab, { backgroundColor: colors.primary }]}
                    onPress={() => navigate("AddNote")}
                    activeOpacity={0.5}
                >
                    <PlusIcon color="#FFFFFF" />
                </TouchableOpacity>
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
        position: "relative"
    },
    searchIcon: {
        position: "absolute",
        left: 10,
        zIndex: 1,
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
