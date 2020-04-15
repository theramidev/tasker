import { ResultSet } from "react-native-sqlite-storage";
import Database from "../..";
import { noteComplement, noteCreateParam } from '.';
import { MNote } from "../../../models/note.model";

const noteTable = 'note';
const complementTable = 'note_complement';

/**
 * @description Elimina una nota de la base de datos
 */
export const deleteNote = (noteId: number): Promise<ResultSet> => {
    return Database.sentence(
        `DELETE FROM ${noteTable} WHERE id = ?`,
        [noteId]
    );
}

/**
 * @description Elmina los complemento de una nota
 */
export const deleteComplement = (noteId: number): Promise<ResultSet> => {
    return Database.sentence(
        `DELETE FROM ${complementTable} WHERE note_id = ?`,
        [noteId]
    );
}

/**
 * @description Actualiza una nota en la base de datos
 */
export const updateNote = ({
    title,
    message,
    tag,
    color,
    dateReminder,
    noteId,
    isFavorite,
    isFixed
}: MNote): Promise<ResultSet> => {
    return Database.sentence(
        `UPDATE ${noteTable} SET title = ?, message = ?, tag = ?, color = ?, date_reminder = ?, 
        date_update = ?, isFavorite = ?, isFixed = ? WHERE id = ?`,
        [title, message, tag, color, dateReminder?.toDateString(), new Date().toDateString(), isFavorite,
        isFixed, noteId]
    );
}

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