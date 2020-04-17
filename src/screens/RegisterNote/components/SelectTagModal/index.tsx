import React, {FC, useState} from 'react';
import Modal from 'react-native-modal';
import CheckBox from '@react-native-community/checkbox';

import {styles} from './styles';
import {View, Text, FlatList} from 'react-native';

interface IProps {
  openModal: boolean;
  closeModal: (tag: string[] | null) => void;
}

export const SelectTagModal: FC<IProps> = ({openModal, closeModal}) => {
  const [tags, setstate] = useState([
    {id: '1', tag: '#endregion', checked: false},
    {id: '2', tag: '#region', checked: true},
    {id: '3', tag: '#perro', checked: false},
  ]);

  const checkThisBox = (itemID: number) => {
    let list = tags;
    list[itemID].checked = !list[itemID].checked;
  };

  const _renderChecks = ({item, index}: any) => {
    return (
      <View style={styles.check}>
        <CheckBox
          value={item.checked}
          disabled={false}
          onPress={() => checkThisBox(index)}
        />
        <Text style={styles.label}>{item.tag}</Text>
      </View>
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

        <View style={styles.addtag}>
          <Text>Agregar etiqueta</Text>
        </View>

        <FlatList
          keyExtractor={(item) => item.id}
          data={tags}
          renderItem={(item) => _renderChecks(item)}
        />
      </View>
    </Modal>
  );
};
