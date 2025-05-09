import type { SQLiteDatabase } from "react-native-sqlite-storage"

export const fetchNotes = (db: SQLiteDatabase) => {
    db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM notes ORDER BY updated_at DESC;",
            [],
            (_, { rows }) => {
                // setNotes(rows._array)
                return rows
            },
            (_, error) => {
                console.error("Error fetching notes:", error)
                return false
            },
        )
    })
}

export const deleteNote = (db: SQLiteDatabase, id: number) => {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM notes WHERE id = ?;",
            [id],
            (_, result) => {
                return result
            },
            (_, error) => {
                console.error("Error deleting note:", error)
                return false
            },
        )
    })
};

export const toggleFavorite = (db: SQLiteDatabase, id: number, currentValue: boolean) => {
    const newValue = currentValue ? 0 : 1

    db.transaction((tx) => {
        tx.executeSql(
            "UPDATE notes SET is_favorite = ? WHERE id = ?;",
            [newValue, id],
            (_, result) => {
                return result
            },
            (_, error) => {
                console.error("Error updating favorite status:", error)
                return false
            },
        )
    })
}