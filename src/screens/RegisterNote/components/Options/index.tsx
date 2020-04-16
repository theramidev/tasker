import React, {FC} from 'react';
import {View, TouchableOpacity} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';

import {styles} from './styles';
import {IProps} from './interfaces/IProps';

export const Options: FC<IProps> = ({openModalColors, openModalDate}) => {
  return (
    <View style={styles.options}>
      <TouchableOpacity style={styles.option}>
        <AntDesign name="star" size={25} color="#F7DC6F" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option]}>
        <AntDesign name="pushpino" size={25} color="#BEBEBE" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Foundation name="photo" size={25} color="#BEBEBE" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <AntDesign name="sound" size={25} color="#BEBEBE" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => openModalDate()}>
        <AntDesign name="clockcircleo" size={25} color="#BEBEBE" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <AntDesign name="tagso" size={25} color="#BEBEBE" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => openModalColors()}>
        <MaterialCommunityIcons name="palette" size={25} color="#BEBEBE" />
      </TouchableOpacity>
    </View>
  );
};
