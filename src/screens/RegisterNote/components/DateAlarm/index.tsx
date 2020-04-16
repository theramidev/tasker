import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';

import {styles} from './styles';
import {useDateFormat} from '../../../../hooks/dateFormat';

interface IProps {
  date: Date | string | null;
  clearDate: () => void;
  openModalDate: () => void;
}

export const DateAlarm: FC<IProps> = ({date, clearDate, openModalDate}) => {
  const {getDateFormat} = useDateFormat(date);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={clearDate}>
        <AntDesign name="close" size={20} color="#FF3737" />
      </TouchableOpacity>

      <TouchableOpacity onPress={openModalDate} style={styles.recorder} >
        <Text>
          {getDateFormat().dateTime} - {getDateFormat().hours}
        </Text>
      </TouchableOpacity>

      <IonIcons name="md-alarm" color="#BEBEBE" size={20} />
    </View>
  );
};
