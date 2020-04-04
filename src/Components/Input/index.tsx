import React, {FC} from 'react';
import {TextInput, View, Text} from 'react-native';
import {IProps} from './IProps';
import {styles} from './styles';

export const Input: FC<IProps> = ({title, value, onChange}: IProps) => {
  return (
    <View style={styles.input}>
      <Text style={styles.label}>{title}</Text>

      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 20,
          backgroundColor: 'gray',
          width: 1,
          marginHorizontal: 10,
        }}
      />

      <TextInput
        style={styles.search}
        placeholder={title}
        underlineColorAndroid="transparent"
        placeholderTextColor={styles.label.color}
        value={value}
        onChange={onChange}
      />
    </View>
  );
};
