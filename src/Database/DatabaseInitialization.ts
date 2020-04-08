import {SQLiteDatabase, Transaction} from 'react-native-sqlite-storage';

class DatabaseInitialization {

    public updateDatabaseTables(database: SQLiteDatabase): Promise<Transaction> {
        // First: create tables if they do not already exist
        return database.transaction(this.createTables);
    }

    private createTables(transaction: Transaction): void {
        // transaction.executeSql(`DROP TABLE IF EXISTS note`);
        // transaction.executeSql(`DROP TABLE IF EXISTS note_complement`);

        // note table
        transaction.executeSql(
            `CREATE TABLE IF NOT EXISTS note(
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                message TEXT NOT NULL,
                tag TEXT,
                color TEXT,
                isFavorite INTEGER NOT NULL,
                isFixed INTEGER NOT NULL,
                date_reminder INTEGER,
                date_update INTEGER NOT NULL,
                date_register INTEGER NOT NULL
            )`,
        );

        //note complement
        transaction.executeSql(
            `CREATE TABLE IF NOT EXISTS note_complement(
                id INTEGER PRYMARY KEY,
                note_id INTEGER NOT NULL,
                type TEXT NOT NULL,
                path TEXT NOT NULL,
                CONSTRAINT fk_note
                  FOREIGN KEY (note_id)
                  REFERENCES note(id)
                  ON DELETE CASCADE
            )`
        );

        console.log('Database Created!');
        
    }
}

export default DatabaseInitialization;