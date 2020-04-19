import React, {FC, useState} from 'react';
import Modal from 'react-native-modal';

import {styles} from './styles';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {IProps} from './IProps';

export const SelectTagModal: FC<IProps> = ({
  openModal,
  closeModal,
  navigation,
}) => {
  const [tags] = useState([
    {id: '1', tag: '#endregion', checked: false},
    {id: '2', tag: '#region', checked: true},
    {id: '3', tag: '#perro', checked: false},
  ]);

  const goToTegisterTag = () => {
    closeModal(null);
    navigation();
  };

  const _renderChecks = ({item, index}: any) => {
    return (
      <TouchableOpacity style={styles.check}>
        <Text style={styles.label}>{item.tag}</Text>
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
        <Text style={styles.title}>Seleccionar tags</Text>

        <TouchableOpacity style={styles.addtag} onPress={goToTegisterTag}>
          <Text style={styles.textTag}>Agregar etiqueta</Text>
        </TouchableOpacity>

        <FlatList
          keyExtractor={(item) => item.id}
          data={tags}
          renderItem={(item) => _renderChecks(item)}
        />
      </View>
    </Modal>
  );
};
