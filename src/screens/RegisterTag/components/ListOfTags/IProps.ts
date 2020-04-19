import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {MTag} from 'src/models/tag.model';

export interface IProps {
  navigation?: NavigationScreenProp<NavigationState, NavigationParams>;

  listTags: MTag[];

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
