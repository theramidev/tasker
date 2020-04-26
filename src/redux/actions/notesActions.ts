import {Dispatch} from 'redux';
import fs, {stat} from 'react-native-fs';

import notesTypes from '../types/notesTypes';
import NoteController from '../../Database/controllers/Note';
import {MNote} from 'src/models/note.model';
import { arrayToObject } from '../../utils/arrayToObject';

/**
 * @description se obtienen las notas de la base de datos
 */
export const getAllNotes = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: notesTypes.loadingGetNotes,
    });

    const notes = await NoteController.getAllNotes();
    const objNotes = arrayToObject(notes, 'noteId');

    dispatch({
      type: notesTypes.updateNotes,
      payload: objNotes,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: notesTypes.errorGetNotes,
      payload: err,
    });

    dispatch({
      type: notesTypes.errorGetNotes,
      payload: null,
    });
  }
};

/**
 * @description registra una nota en la base de datos
 * @param note
 */
export const registerNote = (note: any) => async (
  dispatch: Dispatch,
  getState: any,
) => {
  try {
    dispatch({
      type: notesTypes.loadingRegisterNote,
    });

    const {
      headerColor: color,
      title,
      message,
      favorite: isFavorite,
      fixed: isFixed,
      tag,
      dateNote: dateReminder,
      image,
      audio,
      video,
    } = note;
    const {notes} = getState().notesReducer;

    const noteId = await NoteController.createNote({
      title,
      message,
      tagId: tag ? tag.tagId : null,
      color,
      dateReminder,
      isFavorite,
      isFixed,
      image,
      audio,
      video,
    });

    const newNote: MNote = {
      noteId,
      color,
      dateRegister: new Date(),
      dateUpdate: new Date(),
      dateReminder,
      isFavorite,
      isFixed,
      title,
      message,
      tag,
      isDelete: false,
      image,
      audio,
      video,
    };

    dispatch({
      type: notesTypes.updateNotes,
      payload: {...notes, [noteId]: newNote},
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: notesTypes.errorRegisterNote,
      payload: err,
    });

    dispatch({
      type: notesTypes.errorRegisterNote,
      payload: null,
    });
  }
};

/**
 * @description modifica una nota
 * @param note 
 * @param index 
 */
export const updateNote = (note: any, index: number) => async (
  dispatch: Dispatch,
  getState: any,
) => {
  try {
    dispatch({
      type: notesTypes.loadingUpdateNote,
    });
    
    const {notes} = getState().notesReducer;

    const {
      headerColor: color,
      title,
      message,
      favorite: isFavorite,
      fixed: isFixed,
      tag,
      dateNote: dateReminder,
      image,
      audio,
      video,
    } = note;

    const oldDataNote: MNote = notes[index];
    const noteUpdated: MNote = {
      ...oldDataNote,
      color,
      dateReminder,
      isFavorite,
      isFixed,
      title,
      message,
      tag,
      image,
      audio,
      video,
    }
    
    const noteUpdatedDB = await NoteController.updateNote(noteUpdated);
    //console.log(noteUpdatedDB);
    
    if (oldDataNote.image !== noteUpdatedDB.image) {
      oldDataNote.image && await fs.unlink(oldDataNote.image);
    }

    if (oldDataNote.audio !== noteUpdatedDB.audio) {
      oldDataNote.audio && await fs.unlink(oldDataNote.audio);
    }

    if (oldDataNote.video !== noteUpdatedDB.video) {
      oldDataNote.video && await fs.unlink(oldDataNote.video);
    }
    
    notes[index] = noteUpdatedDB;

    dispatch({
      type: notesTypes.updateNotes,
      payload: notes,
    });
  } catch (err) {
    console.log(err);
    
    dispatch({
      type: notesTypes.errorUpdateNote,
      payload: err,
    });

    dispatch({
      type: notesTypes.errorUpdateNote,
      payload: null,
    });
  }
};
