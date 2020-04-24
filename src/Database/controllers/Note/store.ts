import {ResultSet} from 'react-native-sqlite-storage';
import Database from '../..';
import {noteCreateParam} from './model';
import {MNote} from '../../../models/note.model';

const noteTable = 'note';
const complementTable = 'note_complement';
const tagTable = 'tag';

/**
 * @description Cambia el campo de eliminación
 */
export const updateNoteDelete = (noteId: number, isDelete: boolean): Promise<ResultSet> => {
    return Database.sentence(
        `UPDATE ${noteTable} SET isDelete = ? WHERE id = ?`,
        [isDelete ? 1 : 0, noteId]
    );
}

/**
 * @description Elimina una nota de la base de datos
 */
export const deleteNote = (noteId: number): Promise<ResultSet> => {
  return Database.sentence(`DELETE FROM ${noteTable} WHERE id = ?`, [noteId]);
};

/**
 * @description Elmina los complemento de una nota
 */
export const deleteComplement = (noteId: number): Promise<ResultSet> => {
  return Database.sentence(`DELETE FROM ${complementTable} WHERE note_id = ?`, [
    noteId,
  ]);
};

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
  isFixed,
  audio,
  image,
  video,
  isDelete
}: MNote): Promise<ResultSet> => {
  return Database.sentence(
    `UPDATE ${noteTable} SET title = ?, message = ?, tag_id = ?, color = ?, date_reminder = ?, 
        date_update = ?, isFavorite = ?, isFixed = ?, audio = ?, image = ?, video = ?, isDelete = ? 
        WHERE id = ?`,
    [
      title,
      message,
      tag?.tagId,
      color,
      dateReminder?.toDateString(),
      new Date().toDateString(),
      isFavorite,
      isFixed,
      audio,
      image,
      video,
      isDelete,
      noteId,
    ],
  );
};

/**
 * @description Obtiene una nota de la base de datos
 */
export const getNoteById = (noteId: number): Promise<ResultSet> => {
    return Database.sentence(
        `SELECT * FROM ${noteTable} AS a LEFT JOIN ${tagTable} AS b ON a.tag_id = b.tag_id WHERE id = ?`,
        [noteId]
    );
}

/**
 * @description Obtiene las notas de la base de datos
 */
export const getAllNotes = (): Promise<ResultSet> => {
    return Database.sentence(
        `SELECT * FROM ${noteTable} AS a LEFT JOIN ${tagTable} AS b ON a.tag_id = b.tag_id`,
  );
};

/**
 * @description Crea una nota en la base de datos
 */
export const createNote = ({
  title,
  message,
  tagId,
  dateReminder,
  color,
  isFavorite,
  isFixed,
  audio,
  image,
  video
}: noteCreateParam): Promise<ResultSet> => {
    return Database.sentence(
        `INSERT INTO ${noteTable} (title, message, tag_id, color, isFavorite, isFixed, 
          date_reminder, date_update, date_register, isDelete, image, video, audio) 
          VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [title, message, tagId, color, isFavorite, isFixed, dateReminder, new Date().toDateString(), 
          new Date().toDateString(), 0, image, video, audio]
    );
}
