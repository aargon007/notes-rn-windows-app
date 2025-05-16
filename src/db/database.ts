import SQLite, { type SQLiteDatabase } from "react-native-sqlite-storage";

export const initDatabase = async (isMounted: boolean, setDb: React.Dispatch<React.SetStateAction<SQLiteDatabase | null>>, setInitialized: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const database = await SQLite.openDatabase({
            name: "mknotes.db",
            location: "default",
        });

        await database.executeSql(`
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                content TEXT NOT NULL,
                is_favorite INTEGER DEFAULT 0,
                created_at TEXT,
                updated_at TEXT
            );
        `);

        if (isMounted) {
            setDb(database);
            setInitialized(true);
            console.log("Database initialized ✅");
        }
    } catch (error) {
        console.error("Failed to initialize DB ❌", error);
    }
};