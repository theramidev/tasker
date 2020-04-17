import React, {FC} from 'react';
import {View, TouchableOpacity} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';

import {styles} from './styles';
import {IProps} from './interfaces/IProps';

export const Options: FC<IProps> = ({
  openModalColors,
  openModalDate,
  openActionSheet,
  openTakeVideo,
  openModalTags,
}) => {
  return (
    <View style={styles.options}>
      <TouchableOpacity style={styles.option} onPress={openActionSheet}>
        <Foundation name="photo" size={25} color="#BEBEBE" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={openTakeVideo}>
        <Feather name="video" size={25} color="#BEBEBE" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <AntDesign name="sound" size={25} color="#BEBEBE" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={openModalDate}>
        <IonIcons name="md-alarm" size={25} color="#BEBEBE" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={openModalTags}>
        <AntDesign name="tagso" size={25} color="#BEBEBE" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={openModalColors}>
        <MaterialCommunityIcons name="palette" size={25} color="#BEBEBE" />
      </TouchableOpacity>
    </View>
  );
};
