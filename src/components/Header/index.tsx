import React, {FC} from 'react';
import {View, Text} from 'react-native';

interface IProps {
  title: string;
}

export const Header: FC<IProps> = ({title}: IProps) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};
