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
}
