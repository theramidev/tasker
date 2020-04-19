import React, {FC, useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import Modal from 'react-native-modal';

import {styles} from './styles';
import {IProps} from './interfaces/IProps';

export const ModalColors: FC<IProps> = ({openModal, onClose}) => {
  const [palettes] = useState({
    line1: ['#FF1717', '#FFF117', '#17FF2C', '#17FFDF'],
    line2: ['#3717FF', '#D817FF', '#FF176F', '#858585'],
  });

  const closeModal = (palette: string) => {
    onClose(palette);
  };

  const itemPalette = (palette: string) => (
    <TouchableOpacity
      key={palette}
      style={[styles.color, {backgroundColor: palette}]}
      onPress={() => closeModal(palette)}
    />
  );

  return (
    <Modal
      isVisible={openModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection="right"
      backdropOpacity={0.1}
      onBackdropPress={() => onClose(null)}
      style={styles.modalContainer}>
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={styles.colors}
          data={palettes.line1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => itemPalette(item)}
        />

        <FlatList
          contentContainerStyle={styles.colors}
          data={palettes.line2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => itemPalette(item)}
        />
      </View>
    </Modal>
  );
};
