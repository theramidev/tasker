import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {MTag} from 'src/models/tag.model';

export interface IProps {
  navigation: any;
  openModal: boolean;
  tags: MTag[];
  closeModal: (tag: MTag | null) => void;
}
