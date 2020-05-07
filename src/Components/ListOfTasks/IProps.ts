import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {MNote} from 'src/models/note.model';
import {MListOfTasks} from 'src/models/listOfTasks.model';

export interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;

  getTasks(): Promise<void>;

  tasksReducer: {
    tasks: MListOfTasks;

    loadingGetTasks: boolean;
    errorGetTasks: null | any;

    loadingRegisterTask: boolean;
    errorRegisterTask: null | any;

    loadingUpdateTask: boolean;
    errorUpdateTask: null | any;
  };
}
