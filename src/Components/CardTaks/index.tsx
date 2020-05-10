import React, {FC, useState, useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  Animated,
  View,
  Text,
  Easing,
  FlatList,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {MListOfTasks} from 'src/models/listOfTasks.model';
import {styles} from './styles';
import {MTask} from 'src/models/task.model';
import {theme} from '../../assets/themes';
import {IProps} from './IProps';

export const CardTaks: FC<IProps> = ({tasks, item, index, navigation}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expanded = useRef(new Animated.Value(40)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  /* useEffect(() => {
    console.log(tasks[item]);
  }, []); */

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const animated = (
    value: Animated.Value,
    toValue: number,
    isExpanded: boolean | null,
    duration: number = 400,
    useNativeDriver: boolean = false,
  ) => {
    Animated.timing(value, {
      toValue,
      duration,
      easing: Easing.linear,
      useNativeDriver, // To make use of native driver for performance
    }).start(() => {
      isExpanded !== null && setIsExpanded(isExpanded);
    });
  };

  const open = () => {
    const maxHeight: number = tasks[item].tasks.length * 30 + 40;

    animated(spinValue, 1, null, 400, true);
    animated(expanded, maxHeight, true);
  };

  const close = () => {
    animated(spinValue, 0, null, 400, true);
    animated(expanded, 40, false);
  };

  const tasksComponent = ({item, index}: {item: MTask; index: number}) => {
    return (
      <View style={styles.task}>
        {item.isCompleted ? (
          <AntDesign name="checksquare" color={theme().success} size={16} />
        ) : (
          <View style={styles.point}></View>
        )}
        <Text style={styles.taskText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <Animated.View
      style={[
        styles.containerItem,
        {
          height: expanded,
          marginTop: index === 0 ? 10 : 0,
          borderBottomColor: tasks[item].color || '#BEBEBE',
          borderBottomWidth: tasks[item].color ? 3 : 0,
        },
      ]}>
      <View>
        <View style={styles.headerTask}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterTasks', {
                item: tasks[item],
                index: item,
              });
            }}>
            <Text style={styles.title}>{tasks[item].title}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              isExpanded ? close() : open();
            }}>
            <Animated.View style={{transform: [{rotate: spin}]}}>
              <AntDesign name="down" size={20} color={theme().text} />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{marginHorizontal: 5, marginTop: 10}}
          data={tasks[item].tasks}
          renderItem={(item) => tasksComponent(item)}
          scrollEnabled={false}
          keyExtractor={(item) => item.taskId.toString()}
          ItemSeparatorComponent={() => (
            <View style={{marginVertical: 5}}></View>
          )}
        />
      </View>
    </Animated.View>
  );
};
