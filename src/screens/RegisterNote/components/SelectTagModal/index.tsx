import React, {FC, useState} from 'react';
import Modal from 'react-native-modal';

import {styles} from './styles';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {IProps} from './IProps';

export const SelectTagModal: FC<IProps> = ({
  openModal,
  closeModal,
  navigation,
  tags,
}) => {
  const goToTegisterTag = () => {
    closeModal(null);
    navigation();
  };

  const _renderChecks = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={styles.check}
        onPress={() => closeModal(item)}>
        <Text style={[styles.label, {color: item.color}]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      isVisible={openModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection="right"
      backdropOpacity={0.1}
      onBackdropPress={() => closeModal(null)}
      style={styles.modalContainer}>
      <View style={styles.modal}>
        <Text style={styles.title}>Seleccionar tag</Text>

        <TouchableOpacity style={styles.addtag} onPress={goToTegisterTag}>
          <Text style={styles.textTag}>Agregar etiqueta</Text>
        </TouchableOpacity>

        <FlatList
          keyExtractor={(item) => item.tagId.toString()}
          data={tags}
          ItemSeparatorComponent={() => <View style={{margin: 5}}></View>}
          renderItem={(item) => _renderChecks(item)}
        />
      </View>
    </Modal>
  );
};
