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

  /**
   * @description registra un tag en la base de datos
   * @param tagName
   * @param color
   */
  registerTag(tagName: string, color: string | null): Promise<void>;

  /**
   * @description modifica un tag
   * @param tag
   * @param index
   */
  updateTag(tag: MTag, index: number): Promise<void>;

  /**
 * @description elimina un tag
 * @param idTag
 * @param index
 */
  deleteTag(idTag: number, index: number): Promise<void>;
}
