import React, { FC, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { IProps, IOpton } from './IProps';
import style from './style';
import Modal from 'react-native-modal';
import Ripple from 'react-native-material-ripple';
import IonIcons from 'react-native-vector-icons/Ionicons';

export const ActionSheet: FC<IProps> = ({isVisible = false, onClose, options, title}) => {

    if (options[options.length - 1].title !== 'Cancelar') {
        options.push({
            icon: <IonIcons name="md-close" color="red" size={20} />,
            title: 'Cancelar',
            onPress: onClose
        });
    }

    const _renderItem = ({onPress, title, icon}: IOpton) => {
        return(
            <Ripple onPress={() => {onPress(); onClose()}} rippleDuration={500}>
                <View style={style.optionContainer}>
                    <View style={style.iconContainer}>
                        {icon}
                    </View>
                    <Text style={style.optionTitle}>
                        {title}
                    </Text>
                </View>
            </Ripple>
        )
    }

    return(
        <Modal
            isVisible={isVisible}
            hasBackdrop={true}
            backdropOpacity={0.5}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            useNativeDriver={true}
            style={{margin: 0}}
            animationInTiming={500}
            animationOutTiming={1000}
        >
            <View style={style.container}>
                <Text style={style.actionTitle}>
                    {title}
                </Text>
                <FlatList 
                    data={options}
                    renderItem={({item}) => _renderItem(item)}
                    keyExtractor={(item) => item.title}
                />
            </View>
        </Modal>
    )
}