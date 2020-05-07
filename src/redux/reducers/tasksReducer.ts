import tasksTypes from '../types/tasksTypes';

const INITIAL_STATE = {
  tasks: {},

  loadingGetTasks: false,
  errorGetTasks: null,

  loadingRegisterTask: false,
  errorRegisterTask: null,

  loadingUpdateTask: false,
  errorUpdateTask: null,
};

export default (state = INITIAL_STATE, {type, payload}: any) => {
  switch (type) {
    case tasksTypes.updateTasks:
      return {
        ...state,
        tasks: payload,
        loadingGetTasks: false,
        loadingRegisterTask: false,
      };

    case tasksTypes.loadingGetTasks:
      return {
        ...state,
        loadingGetTasks: true,
      };
    case tasksTypes.errorGetTasks:
      return {
        ...state,
        loadingGetTasks: false,
        errorGetTasks: payload,
      };

    case tasksTypes.loadingRegisterTask:
      return {
        ...state,
        loadingRegisterTask: true,
      };
    case tasksTypes.errorRegisterTask:
      return {
        ...state,
        loadingRegisterTask: false,
        errorRegisterTask: payload,
      };

    default:
      return state;
  }
};
