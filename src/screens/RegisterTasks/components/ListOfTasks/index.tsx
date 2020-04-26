import React, {FC, useState} from 'react';
import {FlatList, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {IProps, Ttask} from './IProps';
import Ripple from 'react-native-material-ripple';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Task} from '../Task';

export const ListOfTasks: FC<IProps> = ({
  tasks = [],
  onAddTask,
  onChangeTask,
}) => {
  const [newTasks, setNewTasks] = useState<Ttask[]>([]);

  const _onChangeTask = (text: string, isCompleted: boolean, index: number) => {
    console.log({text, isCompleted, index});

    onChangeTask({text, isCompleted}, index);
  };

  const addNewTask = () => {
    onAddTask({
      isCompleted: false,
      text: '',
    });
  };

  const _renderItem = ({item, index}: {item: Ttask; index: number}) => {
    return (
      <Task
        index={index}
        isCompleted={item.isCompleted}
        text={item.text}
        onChange={_onChangeTask}
      />
    );
  };

  return (
    <FlatList
      data={tasks}
      renderItem={_renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={() => {
        return (
          <Ripple rippleDuration={500} onPress={addNewTask}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 60,
              }}>
              <Ionicons name="ios-add" color="#cdcdcd" size={25} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  color: '#cdcdcd',
                  fontStyle: 'italic',
                }}>
                Agregar tarea
              </Text>
            </View>
          </Ripple>
        );
      }}
      extraData={newTasks}
    />
  );
};
