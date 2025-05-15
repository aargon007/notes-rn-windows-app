import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import SQLite, { type SQLiteDatabase } from "react-native-sqlite-storage";

// Enable SQLite promise API
SQLite.enablePromise(true);

// Define context type
interface DatabaseContextType {
    db: SQLiteDatabase | null;
    initialized: boolean;
}

// Create context
const DatabaseContext = createContext<DatabaseContextType>({
    db: null,
    initialized: false,
});

// Hook to use context
export const useDatabase = () => useContext(DatabaseContext);

// Provider component
export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
    const [db, setDb] = useState<SQLiteDatabase | null>(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const initDatabase = async () => {
            try {
                const database = await SQLite.openDatabase({
                    name: "notes.db",
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

        initDatabase();

        return () => {
            isMounted = false;
            db?.close()
                .then(() => console.log("Database closed 🔒"))
                .catch((err) => console.error("Error closing DB:", err));
        };
    }, []);

    return (
        <DatabaseContext.Provider value={{ db, initialized }}>
            {children}
        </DatabaseContext.Provider>
    );
};

export default DatabaseProvider