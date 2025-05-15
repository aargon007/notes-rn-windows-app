import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    { name: 'notes.db', location: 'default' },
    () => console.log('Database opened'),
    error => console.log('Error opening database', error)
);

export default db;