import tagsTypes from '../types/tagsTypes';

const INITIAL_STATE = {
  tags: [],

  loadingGetTags: false,
  errorGetTags: null,

  loadingRegisterTag: false,
  errorRegisterTag: null,
};

export default (state = INITIAL_STATE, {type, payload}: any) => {
  switch (type) {
    case tagsTypes.updateTags:
      return {
        ...state,
        tags: payload,
        loadingRegisterTag: false,
        loadingGetTags: false,
      };

    case tagsTypes.loadingGetTags:
      return {
        ...state,
        loadingGetTags: true,
      };
    case tagsTypes.errorGetTags:
      return {
        ...state,
        loadingGetTags: false,
        errorGetTags: payload,
      };

    case tagsTypes.loadingRegisterTag:
      return {
        ...state,
        loadingRegisterTag: true,
      };
    case tagsTypes.errorRegisterTag:
      return {
        ...state,
        loadingRegisterTag: false,
        errorRegisterTag: payload,
      };

    default:
      return state;
  }
};
