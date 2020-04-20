import {Dispatch} from 'redux';

import notesTypes from '../types/notesTypes';
import NoteController from '../../Database/controllers/Note';

/**
 * @description se obtienen las notas de la base de datos
 */
export const getAllNotes = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: notesTypes.loadingGetNotes,
    });

    const notes = await NoteController.getAllNotes();

    dispatch({
      type: notesTypes.updateNotes,
      payload: notes,
    });
  } catch (err) {
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
      complements: [
        {path: image, type: 'Image'},
        {path: audio, type: 'Audio'},
        {path: video, type: 'Video'},
      ],
    });

    console.log(noteId);

    dispatch({
      type: notesTypes.updateNotes,
      payload: [...notes],
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
