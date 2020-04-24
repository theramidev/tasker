import {
  createNote,
  setNoteComplement,
  getAllNotes,
  getNoteComplements,
  getNoteById,
  updateNote,
  deleteComplement,
  deleteNote,
} from './store';
import {INote, MNote} from '../../../models/note.model';
import {
  INoteComplement,
  MNoteComplement,
} from '../../../models/noteComplement.model';

export type noteComplement = {type: 'Audio' | 'Video' | 'Image'; path: string};
export type noteCreateParam = {
  title: string;
  message: string;
  tagId?: number | string | null;
  dateReminder?: Date | null;
  color?: string | null;
  isFavorite?: 0 | 1;
  isFixed?: 0 | 1;
  complements?: noteComplement[] | null;
};

class NoteController {
  /**
   * @description Elimina una nota de la base de datos
   * @param noteId ID de la nota que va a ser eliminada
   * @return Promise<boolean>
   */
  public static deleteNote(noteId: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const {rowsAffected} = await deleteNote(noteId);

        resolve(rowsAffected > 0);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @description Actualiza una nota
   * @param note Nota ACTUALIZADA que se va a guardar en la base de datos
   * @param updateComplements Condicional para actualizar los complementos. Default: true
   */
  public static updateNote(
    note: MNote,
    updateComplements: boolean = true,
  ): Promise<MNote> {
    return new Promise(async (resolve, reject) => {
      try {
        await updateNote(note);

        if (note.complements.length > 0 && updateComplements) {
          await deleteComplement(note.noteId);
          for (const {path, type} of note.complements) {
            await setNoteComplement({path, type}, note.noteId);
          }
        }

        const noteResult: INote = (await getNoteById(note.noteId)).rows.item(0);
        const complementsResult: INoteComplement[] = (
          await getNoteComplements(note.noteId)
        ).rows.raw();
        const complements: MNoteComplement[] = complementsResult.map(
          (complement) => {
            return new MNoteComplement(complement);
          },
        );

        console.log(noteResult);

        resolve(new MNote(noteResult, complements));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @description Busca una nota por su ID
   * @param noteId Id de la nota que se va a buscar
   * @return Promise<MNote>
   */
  public static getNoteById(noteId: number): Promise<MNote> {
    return new Promise(async (resolve, reject) => {
      try {
        const noteResult: INote = await (await getNoteById(noteId)).rows.item(
          0,
        );
        const complementsResult: INoteComplement[] = (
          await getNoteComplements(noteId)
        ).rows.raw();
        const complements: MNoteComplement[] = complementsResult.map(
          (complement) => new MNoteComplement(complement),
        );

        resolve(new MNote(noteResult, complements));
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @description Obtiene todas las notas de la base de datos
   * @return Promise<MNote[]>
   */
  public static getAllNotes(): Promise<MNote[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const notesResult: INote[] = (await getAllNotes()).rows.raw();

        const notes: MNote[] = await Promise.all(
          notesResult.map(async (note) => {
            const complementsResult: INoteComplement[] = (
              await getNoteComplements(note.id)
            ).rows.raw();
            const complements: MNoteComplement[] = complementsResult.map(
              (complement) => new MNoteComplement(complement),
            );
            return new MNote(note, complements);
          }),
        );

        resolve(notes);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @description Crea una nota en la base de datos
   * @param title Titulo de la nota
   * @param message Mensaje de la nota
   * @param tag tag de la nota
   * @param color color de la nota HEX: #FFFFFF. Default null
   * @param isFavorite Si es una nota favorita. Default 0
   * @param isFixed Si es una nota fijada. Default 0
   * @param dateReminder Fecha del recordatorio. Default null
   * @param complements Complementos audiovisuales de la nota
   * @return Promise<number> <- ID de la nota
   */
  public static createNote({
    title,
    message,
    tagId = null,
    dateReminder = null,
    color = null,
    isFavorite = 0,
    isFixed = 0,
    complements = null,
  }: noteCreateParam): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await createNote({
          title,
          message,
          tagId,
          dateReminder,
          color,
          isFavorite,
          isFixed,
        });

        if (complements) {
          for (const complement of complements) {
            if (complement.path)
              await setNoteComplement(complement, result.insertId);
          }
        }

        resolve(result.rowsAffected ? result.insertId : 0);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default NoteController;
