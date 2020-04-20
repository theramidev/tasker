import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {MTag} from 'src/models/tag.model';

export interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;

  tagsReducer: {
    tags: MTag[];

    loadingGetTags: boolean;
    errorGetTags: any | null;

    loadingRegisterTag: boolean;
    errorRegisterTag: any | null;
  };

  /**
   * @description obtiene todos los tags de la base de datos
   */
  getTags(): Promise<void>;
}
