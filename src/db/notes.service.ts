import type { TNote } from "@/types/note";
import type { SQLiteDatabase } from "react-native-sqlite-storage";

export const fetchNotes = (
    db: SQLiteDatabase,
    callback?: (notes: any[]) => void
): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM notes ORDER BY id DESC;",
                [],
                (_, results) => {
                    const notes = results.rows.raw();
                    callback?.(notes); // call only if provided
                    resolve(notes);
                },
                (tx, error) => {
                    console.error("Error fetching notes", error);
                    reject(error);
                    return true;
                }
            );
        });
    });
};


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

// import SQLite from 'react-native-sqlite-storage';

// const db = SQLite.openDatabase(
//     { name: 'users.db', location: 'default' },
//     () => console.log('Database opened'),
//     error => console.log('Error opening database', error)
// );

// export default db;