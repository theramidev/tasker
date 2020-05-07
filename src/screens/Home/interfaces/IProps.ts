import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import { MNote } from 'src/models/note.model';

export interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;

  notesReducer: {
    notes: MNote[];

    loadingGetNotes: boolean;
    errorGetNotes: any | null;

    loadingRegisterNote: boolean;
    errorRegisterNote: any | null;

    loadingUpdateNote: boolean;
    errorUpdateNote: any | null;
  };

  /**
   * @description se obtienen las notas de la base de datos
   */
  getAllNotes(): Promise<void>;

  /**
   * @description se obtienen las tareas de la base de datos
   */
  getTasks(): Promise<void>;
}
