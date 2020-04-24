import React, { FC, useState } from 'react';
import { FlatList, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { IProps, Ttask } from './IProps';
import Ripple from 'react-native-material-ripple';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Task } from '../Task';

export const ListOfTasks: FC<IProps> = ({
    tasks = [],
    onAddTask
}) => {
    const [newTasks] = useState<Ttask[]>([]);

    const _onChangeTask = (text: string, isCompleted: boolean, index: number) => {
        const found = tasks.find(task => index === task.index);
        
        // console.log(found);
        if (found) {
            const task = tasks[index];
            tasks[index] = {
                ...task,
                text,
                isCompleted
            }
        } else {
            tasks.push({
                text,
                isCompleted,
                index
            });
        }
    }

    const addNewTask = () => {
        newTasks.push({
            index: tasks.length,
            isCompleted: false,
            text: ''
        });
    }

    const _renderItem = ({item}: {item: Ttask}) => {
        return <Task 
            index={item.index}
            isCompleted={item.isCompleted}
            text={item.text}
            onChange={_onChangeTask}
        />
    }

    return(
        <FlatList 
            data={tasks}
            renderItem={_renderItem}
            keyExtractor={(item) => item.index.toString()}
            ListFooterComponent={() => {
                return(
                    <Ripple
                        rippleDuration={500}
                        onPress={addNewTask}
                    >
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                            <Ionicons name="ios-add" color="#cdcdcd" size={25} />
                            <Text style={{marginLeft: 10, fontSize: 20, color: '#cdcdcd', fontStyle: 'italic'}}>
                                Agregar tarea
                            </Text>
                        </View>
                    </Ripple>
                )
            }}
            extraData={newTasks}
        />
    )
}