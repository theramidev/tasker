import { ResultSet } from "react-native-sqlite-storage";
import Database from "../..";
import { noteComplement, noteCreateParam } from '.';

const noteTable = 'note';
const complementTable = 'note_complement';

export const setNoteComplement = ({path, type}: noteComplement, noteId: number) => {
    return Database.sentence(
        `INSERT INTO ${complementTable} (note_id, type, path) VALUES (?, ?, ?)`,
        [noteId, type, path]
    );
}

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
         dateReminder?.getTime(), Date.now(), Date.now()]
    );
}