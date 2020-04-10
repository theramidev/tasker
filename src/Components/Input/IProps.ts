import {NativeSyntheticEvent, TextInputChangeEventData, ViewStyle} from 'react-native';

export interface IProps {
  title: string;
  placeholder?: string;
  value?: string;
  style?: ViewStyle;
  onChange(e: NativeSyntheticEvent<TextInputChangeEventData>): void;
}