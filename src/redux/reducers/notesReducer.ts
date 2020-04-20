import notesTypes from '../types/notesTypes';

const INITIAL_STATE = {
  notes: [],

  loadingGetNotes: false,
  errorGetNotes: null,

  loadingRegisterNote: false,
  errorRegisterNote: null,

  loadingUpdateNote: false,
  errorUpdateNote: null,
};

export default (state = INITIAL_STATE, {type, payload}: any) => {
  switch (type) {
    case notesTypes.updateNotes:
      return {
        ...state,
        notes: payload,
        loadingRegisterNote: false,
        loadingGetNotes: false,
      };

    case notesTypes.loadingGetNotes:
      return {
        ...state,
        loadingGetNotes: true,
      };
    case notesTypes.errorGetNotes:
      return {
        ...state,
        loadingGetNotes: false,
        errorGetNotes: payload,
      };

    case notesTypes.loadingRegisterNote:
      return {
        ...state,
        loadingRegisterNote: true,
      };
    case notesTypes.errorRegisterNote:
      return {
        ...state,
        loadingRegisterNote: false,
        errorRegisterNote: payload,
      };

    case notesTypes.loadingUpdateNote:
      return {
        ...state,
        loadingUpdateNote: true,
      };
    case notesTypes.errorUpdateNote:
      return {
        ...state,
        loadingUpdateNote: false,
        errorUpdateNote: payload,
      };

    default:
      return state;
  }
};
