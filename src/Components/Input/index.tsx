import React, {FC} from 'react';
import {TextInput, View, Text} from 'react-native';
import {IProps} from './IProps';
import {styles} from './styles';

export const Input: FC<IProps> = ({title, placeholder, value, onChange, style}: IProps) => {
  return (
    <View style={[styles.input, style]}>
      {title && (
        <>
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
        </>
      )}

      <TextInput
        style={styles.search}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        placeholderTextColor={'#BFBFBF'}
        value={value}
        onChange={onChange}
      />
    </View>
  );
};
