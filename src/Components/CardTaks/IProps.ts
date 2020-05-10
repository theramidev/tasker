import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {MNote} from 'src/models/note.model';
import {MListOfTasks} from 'src/models/listOfTasks.model';

export interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;

  tasks: MListOfTasks[];
  item: string | any;
  index: number;
}
