import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {MTag} from 'src/models/tag.model';
import { MNote } from 'src/models/note.model';

export interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;

  tagsReducer: {
    tags: MTag[];

    loadingGetTags: boolean;
    errorGetTags: any | null;

    loadingRegisterTag: boolean;
    errorRegisterTag: any | null;
  };

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
   * @description obtiene todos los tags de la base de datos
   */
  getTags(): Promise<void>;

  /**
   * @description registra una nota en la base de datos
   */
  registerNote(note: any): Promise<void>;
}
