import SQLite, { type SQLiteDatabase } from "react-native-sqlite-storage"
// Enable promise-based SQLite
SQLite.enablePromise(true);

export const db = await SQLite.openDatabase({
    name: "notes.db",
    location: "default",
})