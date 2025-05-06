import { createContext, useContext, useState, useEffect } from "react"
import SQLite, { type SQLiteDatabase } from "react-native-sqlite-storage"

// Enable promise-based SQLite
SQLite.enablePromise(true)

// Create context
const DatabaseContext = createContext<any>(null);

// Custom hook to use the database context
export const useDatabase = () => useContext(DatabaseContext)

// Provider component
export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
    const [db, setDb] = useState<SQLiteDatabase | null>(null);
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        const initDatabase = async () => {
            try {
                // Open the database
                const database = await SQLite.openDatabase({
                    name: "notes.db",
                    location: "default",
                })

                setDb(database)

                // Initialize the database schema
                await database.executeSql(
                    `CREATE TABLE IF NOT EXISTS notes (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        title TEXT,
                        content TEXT NOT NULL,
                        is_favorite INTEGER DEFAULT 0,
                        created_at TEXT,
                        updated_at TEXT
                    );`,
                )

                console.log("Database and tables initialized successfully")
                setInitialized(true)
            } catch (error) {
                console.error("Error initializing database:", error)
            }
        }

        initDatabase()

        return () => {
            // Close the database when the component unmounts
            if (db) {
                db.close()
                    .then(() => console.log("Database closed"))
                    .catch((error) => console.error("Error closing database:", error))
            }
        }
    }, [])

    const value = {
        db,
        initialized,
    }

    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}
