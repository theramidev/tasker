import {SQLiteDatabase, Transaction} from 'react-native-sqlite-storage';

class DatabaseInitialization {

    public updateDatabaseTables(database: SQLiteDatabase): Promise<Transaction> {
        // First: create tables if they do not already exist
        return database.transaction(this.createTables);
    }

    private createTables(transaction: Transaction): void {
        // transaction.executeSql(`DROP TABLE IF EXISTS note`);
        // transaction.executeSql(`DROP TABLE IF EXISTS note_complement`);
        // transaction.executeSql(`DROP TABLE IF EXISTS things_to_do`);
        // transaction.executeSql(`DROP TABLE IF EXISTS task`);

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
                date_reminder TEXT,
                date_update TEXT NOT NULL,
                date_register TEXT NOT NULL
            )`,
        );

        //note complement
        transaction.executeSql(
            `CREATE TABLE IF NOT EXISTS note_complement(
                id INTEGER PRIMARY KEY NOT NULL,
                note_id INTEGER NOT NULL,
                type TEXT NOT NULL,
                path TEXT NOT NULL,
                CONSTRAINT fk_note
                  FOREIGN KEY (note_id)
                  REFERENCES note(id)
                  ON DELETE CASCADE
            )`
        );

        // Things To Do
        transaction.executeSql(
            `CREATE TABLE IF NOT EXISTS things_to_do(
                list_id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                tag TEXT,
                color TEXT,
                isFavorite INTEGER NOT NULL,
                isFixed INTEGER NOT NULL,
                date_reminder TEXT,
                date_update TEXT NOT NULL,
                date_register TEXT NOT NULL
            )`
        );

        // Task
        transaction.executeSql(
            `CREATE TABLE IF NOT EXISTS task(
                task_id INTEGER PRIMARY KEY NOT NULL,
                list_id INTEGER NOT NULL,
                text TEXT NOT NULL,
                isCompleted INTEGER NOT NULL DEFAULT 0,
                CONSTRAINT fk_task
                  FOREIGN KEY (list_id)
                  REFERENCES things_to_do(list_id)
                  ON DELETE CASCADE
            )`
        );

        console.log('Database Created!');
        
    }
}

export default DatabaseInitialization;