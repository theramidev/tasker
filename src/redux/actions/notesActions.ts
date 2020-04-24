import {Dispatch} from 'redux';
import fs, {stat} from 'react-native-fs';

import notesTypes from '../types/notesTypes';
import NoteController from '../../Database/controllers/Note';
import {MNote} from 'src/models/note.model';

/**
 * @description se obtienen las notas de la base de datos
 */
export const getAllNotes = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: notesTypes.loadingGetNotes,
    });

    const notes = await NoteController.getAllNotes();
    console.log(notes);

    dispatch({
      type: notesTypes.updateNotes,
      payload: notes,
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

    const complements: any[] = [
      {path: image, type: 'Image'},
      {path: audio, type: 'Audio'},
      {path: video, type: 'Video'},
    ].filter(({path}) => path !== null);

    const noteId = await NoteController.createNote({
      title,
      message,
      tagId: tag ? tag.tagId : null,
      color,
      dateReminder,
      isFavorite,
      isFixed,
      complements,
    });

    const newNote: MNote = {
      noteId,
      color,
      complements,
      dateRegister: new Date(),
      dateUpdate: new Date(),
      dateReminder,
      isFavorite,
      isFixed,
      title,
      message,
      tag,
    };

    dispatch({
      type: notesTypes.updateNotes,
      payload: [...notes, newNote],
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
export const updateNote = (note: any, noteComplements: any, index: number) => async (
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

    const complements: any[] = [
      {path: image, type: 'Image'},
      {path: audio, type: 'Audio'},
      {path: video, type: 'Video'},
    ].filter(({path}) => path !== null);

    const noteUpdated: MNote = {
      ...notes[index],
      color,
      complements,
      dateReminder,
      isFavorite,
      isFixed,
      title,
      message,
      tag,
    }
    console.log(noteUpdated);
    
    return
    const noteUpdatedDB = await NoteController.updateNote(noteUpdated);

    if (noteComplements.Image) {
      if (noteComplements.Image.path !== image) {
        await fs.unlink(noteComplements.Image.path);
      }
    }

    if (noteComplements.Video) {
      if (noteComplements.Video.path !== image) {
        await fs.unlink(noteComplements.Video.path);
      }
    }

    if (noteComplements.Audio) {
      if (noteComplements.Audio.path !== image) {
        await fs.unlink(noteComplements.Audio.path);
      }
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
