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
        // transaction.executeSql(`DROP TABLE IF EXISTS tag`);

        // note table
        transaction.executeSql(
            `CREATE TABLE IF NOT EXISTS note(
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                message TEXT NOT NULL,
                tag_id INTEGER,
                color TEXT,
                isFavorite INTEGER NOT NULL,
                isFixed INTEGER NOT NULL,
                date_reminder INTEGER,
                date_update INTEGER NOT NULL,
                date_register INTEGER NOT NULL,
                isDelete INTEGER NOT NULL,
                image TEXT,
                video TEXT,
                audio TEXT,
                CONSTRAINT fk_tag
                  FOREIGN KEY (tag_id)
                  REFERENCES note(id)
                  ON UPDATE CASCADE
            )`,
        );

        // Tag
        transaction.executeSql(
            `CREATE TABLE IF NOT EXISTS tag(
                tag_id INTEGER PRIMARY KEY NOT NULL,
                tag_name TEXT NOT NULL UNIQUE,
                tag_color TEXT NOT NULL
            )`
        );

        // Things To Do
        transaction.executeSql(
            `CREATE TABLE IF NOT EXISTS things_to_do(
                list_id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                tag INTEGER,
                color TEXT,
                isFavorite INTEGER NOT NULL,
                isFixed INTEGER NOT NULL,
                date_reminder INTEGER,
                date_update INTEGER NOT NULL,
                date_register INTEGER NOT NULL,
                isDelete INTEGER NOT NULL DEFAULT 0
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