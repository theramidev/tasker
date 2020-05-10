import React, {FC, useEffect, useRef, useState} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import {IProps} from './IProps';

import {CardTaks} from '../CardTaks';

const ListOfTasksComponent: FC<IProps> = ({
  navigation,
  tasksReducer: {tasks},
}) => {
  return (
    <ScrollView style={{marginBottom: 90}}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        <FlatList
          style={{marginHorizontal: 5}}
          data={Object.keys(tasks)}
          renderItem={({item, index}) => (
            <CardTaks
              navigation={navigation}
              tasks={tasks}
              item={item}
              index={index}
            />
          )}
          scrollEnabled={false}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = ({tasksReducer}: any) => {
  return {
    tasksReducer,
  };
};

const mapDispatchToProps = {};

export const ListOfTasks = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListOfTasksComponent);
