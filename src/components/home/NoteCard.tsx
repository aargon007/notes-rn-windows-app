import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { StackNavigation } from '@/navigators/RootNavigator';
import { useNavigation } from '@react-navigation/native';
import type { TNote } from '@/types/note';
import BookmarkIcon from '@/icons/BookmarkIcon';

const NoteCard = ({ item, isWideScreen, colors }: { item: TNote; isWideScreen?: boolean; colors: any }) => {
    const { navigate } = useNavigation<StackNavigation>();
    const formattedDate = item?.updated_at;

    const stripHtml = (html: string) => {
        if (!html) return '';
        return html
            .replace(/<[^>]*>?/gm, '') // Remove tags
            .replace(/&nbsp;/g, ' ')   // Replace common entities
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .trim();
    };

    return (
        <TouchableOpacity
            style={[styles.noteItem, { backgroundColor: colors.card }, isWideScreen && styles.noteItemWide]}
            onPress={() => navigate("SingleNote", item)}
            activeOpacity={0.5}
        >
            <View style={styles.noteContent}>
                <Text style={[styles.noteTitle, { color: colors.text }]} numberOfLines={1}>
                    {item?.title || "Untitled Note"}
                </Text>
                <Text style={[styles.notePreview, { color: colors.secondaryText }]} numberOfLines={2}>
                    {stripHtml(item?.content)}
                </Text>
                <View style={styles.noteFooter}>
                    <Text style={[styles.noteDate, { color: colors.tertiaryText }]}>{formattedDate}</Text>
                    {item.is_favorite ? <BookmarkIcon /> : null}
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