import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
import type { TNote } from '@/types/note';

const NoteCard = ({ item, isWideScreen }: { item: TNote; isWideScreen?: boolean }) => {
    const formattedDate = item.updated_at;
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.noteItem, { backgroundColor: colors.card }, isWideScreen && styles.noteItemWide]}
        // onPress={() => navigation.navigate("note", { noteId: item.id })}
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

const styles = StyleSheet.create({
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
})

export default NoteCard;