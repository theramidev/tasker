import React, { FC, useState } from 'react';
import { View, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { IProps } from './IProps';
import { styles } from './style';

import { Input } from '../../../../components/Input';

export const Task: FC<IProps> = ({
    isCompleted,
    text = '',
    onChange,
    index
}) => {
    const [checked, setChecked] = useState(isCompleted);

    const changeText = (input: NativeSyntheticEvent<TextInputChangeEventData>) => {
        text = input.nativeEvent.text;
        onChange(text, isCompleted, index);
    }

    const _onChangeCheckBox = () => {
        setChecked(!checked);
        
        onChange(text, checked, index);
    }

    return(
        <View style={styles.container}>
            <CheckBox 
                value={checked}
                onValueChange={_onChangeCheckBox}
            />
            <Input 
                placeholder="Escribe tu tarea"
                value={text}
                onChange={changeText}
                style={styles.input}
            />
        </View>
    )
}