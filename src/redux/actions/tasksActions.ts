import {Dispatch} from 'redux';
import TaskController from '../../Database/controllers/Tasks';
import tasksTypes from '../types/tasksTypes';

/**
 * @description obtiene todos los tasks de la base de datos
 */
export const getTasks = () => (dispatch: Dispatch) => {
  try {
    dispatch({
      type: tasksTypes.loadingRegisterTask,
    });

    const tasks = TaskController.getAllListsOfTasks();

    dispatch({
      type: tasksTypes.updateTasks,
      payload: tasks,
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * @description obtiene todos los tasks de la base de datos
 * @param tasksData
 */
export const registerTasks = (tasksData: any) => async (
  dispatch: Dispatch,
  getState: any,
) => {
  try {
    dispatch({
      type: tasksTypes.loadingRegisterTask,
    });

    const {
      isFavorite,
      isFixed,
      title,
      colorFixed: color,
      tasks,
      dateNote: dateReminder,
    } = tasksData;
    const {tasks: tasksState} = getState().tasksReducer;

    const idList = await TaskController.createListOfTasks(
      {
        title,
        color,
        dateReminder,
        isFavorite,
        isFixed,
      },
      tasks,
    );

    dispatch({
      type: tasksTypes.updateTasks,
      payload: [
        ...tasksState,
        {idList, title, color, dateReminder, isFavorite, isFixed},
      ],
    });
  } catch (err) {
    console.log(err);
  }
};
