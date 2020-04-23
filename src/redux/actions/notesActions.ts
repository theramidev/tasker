import {Dispatch} from 'redux';

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
