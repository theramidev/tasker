import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

export interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;

  /**
   * @description se obtienen las notas de la base de datos
   */
  getAllNotes(): Promise<void>;
}
