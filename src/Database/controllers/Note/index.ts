import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote
} from './store';
import {INote, MNote} from '../../../models/note.model';
import { noteCreateParam } from './model';

class NoteController {
  
  /**
   * @description Elimina una nota de la base de datos
   * @param noteId ID de la nota que va a ser eliminada
   * @return Promise<boolean>
   */
  public static async deleteNote(noteId: number): Promise<boolean> {
    try {
      const {rowsAffected} = await deleteNote(noteId);
      return Promise.resolve(rowsAffected > 0);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * @description Actualiza una nota
   * @param note Nota ACTUALIZADA que se va a guardar en la base de datos
   * @param updateComplements Condicional para actualizar los complementos. Default: true
   */
  public static async updateNote(
    note: MNote,
  ): Promise<MNote> {
    try {
      await updateNote(note);
      const noteResult: INote = (await getNoteById(note.noteId)).rows.item(0);
      return Promise.resolve(new MNote(noteResult));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * @description Busca una nota por su ID
   * @param noteId Id de la nota que se va a buscar
   * @return Promise<MNote>
   */
  public static async getNoteById(noteId: number): Promise<MNote> {
    try {
      const noteResult: INote = await (await getNoteById(noteId)).rows.item(
        0,
      );
      return Promise.resolve(new MNote(noteResult));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * @description Obtiene todas las notas de la base de datos
   * @return Promise<MNote[]>
   */
  public static async getAllNotes(): Promise<MNote[]> {
    try {
      const notesResult: INote[] = (await getAllNotes()).rows.raw();
      const notes: MNote[] = notesResult.map(note => new MNote(note));
      return Promise.resolve(notes);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * @description Crea una nota en la base de datos
   * @return Promise<number> <- ID de la nota
   */
  public static async createNote({
    title,
    message,
    tagId = null,
    dateReminder = null,
    color = null,
    isFavorite = 0,
    isFixed = 0,
    audio = null,
    image = null,
    video = null
  }: noteCreateParam): Promise<number> {
    try {
      const result = await createNote({
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
      });

      return Promise.resolve(result.rowsAffected ? result.insertId : 0);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default NoteController;
