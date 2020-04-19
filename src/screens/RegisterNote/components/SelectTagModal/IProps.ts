import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

export interface IProps {
  navigation: any;
  openModal: boolean;
  closeModal: (tag: string[] | null) => void;
}
