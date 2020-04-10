import { ResultSet } from "react-native-sqlite-storage";
import Database from "../..";
import { noteComplement, noteCreateParam } from '.';

const noteTable = 'note';
const complementTable = 'note_complement';

/**
 * @description Obtiene una nota de la base de datos
 */
export const getNoteById = (noteId: number): Promise<ResultSet> => {
    return Database.sentence(
        `SELECT * FROM ${noteTable} WHERE id = ?`,
        [noteId]
    );
}

/**
 * @description Obtiene los complementos de una nota
 */
export const getNoteComplements = (noteId: number): Promise<ResultSet> => { 
    return Database.sentence(
        `SELECT * FROM ${complementTable} WHERE note_id = ?`,
        [noteId]
    );
}   

/**
 * @description Obtiene las notas de la base de datos
 */
export const getAllNotes = (): Promise<ResultSet> => {
    return Database.sentence(
        `SELECT * FROM ${noteTable}`
    );
}

/**
 * @description Setea un complemento de la nota en la base de datos
 */
export const setNoteComplement = ({path, type}: noteComplement, noteId: number): Promise<ResultSet> => {
    return Database.sentence(
        `INSERT INTO ${complementTable} (note_id, type, path) VALUES (?, ?, ?)`,
        [noteId, type, path]
    );
}

/**
 * @description Crea una nota en la base de datos
 */
export const createNote = ({
    title,
    message,
    tag,
    dateReminder,
    color,
    isFavorite,
    isFixed,
}: noteCreateParam): Promise<ResultSet> => {
    return Database.sentence(
        `INSERT INTO ${noteTable} (title, message, tag, color, isFavorite, isFIxed, 
        date_reminder, date_update, date_register) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title.trim(), message.trim(), tag?.trim(), color?.toLowerCase(), isFavorite, isFixed,
         dateReminder?.getTime(), new Date().toDateString(), new Date().toDateString()]
    );
}