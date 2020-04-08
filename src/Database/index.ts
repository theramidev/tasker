import SQLite, {SQLiteDatabase, ResultSet} from 'react-native-sqlite-storage';
import { IDatabase } from './interface/IDatabase';
import DatabaseInitialization from './DatabaseInitialization';

class Database implements IDatabase {
    private database: SQLiteDatabase | undefined;
    private dbName: string = 'db_tasker';

    public static sentence(statement: string, params: any[] | undefined = undefined): Promise<ResultSet> {
        return new Promise(async (resolve, reject) => {
            try {
                // @ts-ignore
                const [result]: [ResultSet] = await this.database.executeSql(statement, params);
                resolve(result);
            } catch (error) {
                reject(error)
            }
        })
    }

    public async open(): Promise<SQLiteDatabase> {
        return new Promise(async resolve => {
            try {
              SQLite.DEBUG(false);
              SQLite.enablePromise(true);
              const db: SQLiteDatabase = await SQLite.openDatabase({
                name: this.dbName,
                location: 'default',
              });
              const initialization: DatabaseInitialization = new DatabaseInitialization();
              if (db) {
                console.log('Database Open!');
                this.database = db;
                initialization.updateDatabaseTables(this.database);
              }
              resolve(db);
            } catch (error) {
              console.log('[Open DB Error]', error);
            }
          });
    }

    public close(): Promise<void> | undefined {
        return this.database?.close();
    }
}

export default new Database();