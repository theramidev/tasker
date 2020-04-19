import React, {FC, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {styles} from './styles';
import {MTag} from 'src/models/tag.model';
import {IProps} from './IProps';
import {ModalColors} from '../../../../components/ModalColors';

const _renderItem: FC<{
  tag: MTag;
  index: number;
  updateTag: any;
  deleteTag: any;
}> = ({tag, index, updateTag, deleteTag}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <View>
      <View style={styles.tag}>
        <Text style={{color: tag.color}}>{tag.name}</Text>

        <View style={styles.tagActions}>
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <MaterialCommunityIcons name="palette" size={20} color="#ffff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => {
              deleteTag(tag.tagId, index);
            }}>
            <MaterialCommunityIcons name="close" size={20} color="#FF2222" />
          </TouchableOpacity>
        </View>
      </View>

      <ModalColors
        openModal={openModal}
        onClose={(data) => {
          if (data) {
            setOpenModal(false);
            updateTag({...tag, color: data}, index);
          } else {
            setOpenModal(false);
          }
        }}
      />
    </View>
  );
};

export const ListOfTags: FC<IProps> = ({listTags, updateTag, deleteTag}) => {
  return (
    <FlatList
      data={listTags}
      renderItem={({item, index}) => (
        <_renderItem
          tag={item}
          index={index}
          updateTag={updateTag}
          deleteTag={deleteTag}
        />
      )}
      ItemSeparatorComponent={() => <View style={{margin: 5}}></View>}
      keyExtractor={(item) => item.tagId.toString()}
    />
  );
};
