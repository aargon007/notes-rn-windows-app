import { initDatabase } from "@/db/database";
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

        initDatabase(isMounted, setDb, setInitialized).then();

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