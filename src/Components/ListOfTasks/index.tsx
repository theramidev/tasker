import React, {FC, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  RecyclerViewBackedScrollView,
} from 'react-native';
import {connect} from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {styles} from './styles';
import {IProps} from './IProps';

const ListOfTasksComponent: FC<IProps> = ({
  navigation,
  tasksReducer: {tasks},
}) => {

  useEffect(() => {
    console.log(tasks);
  }, [tasks])

  const cutText = (txt: string) => {
    if (txt.length > 100) {
      return txt.substr(0, 100) + '...';
    }

    return txt;
  };

  const cardNote = ({item, index}: {item: string | any; index: number}) => {
    return (
      <TouchableOpacity
        /* style={[
          styles.containerItem,
          {
            marginTop: index === 0 ? 10 : 0,
            borderBottomColor: notes[item].color || '#BEBEBE',
            borderBottomWidth: notes[item].color ? 3 : 0,
          },
        ]}
        onPress={() =>
          navigation.navigate('RegisterNote', {item: notes[item], index: item})
        } */>
      </TouchableOpacity>
    );
  };

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
          data={Object.keys(tasks).filter((item, index) =>
            index % 2 ? false : true,
          )}
          renderItem={(item) => cardNote(item)}
          scrollEnabled={false}
          keyExtractor={(item) => item.toString()}
        />
        <FlatList
          style={{marginHorizontal: 5}}
          data={Object.keys(tasks).filter((item, index) =>
            index % 2 ? true : false,
          )}
          renderItem={(item) => cardNote(item)}
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

const mapDispatchToProps = {
};

export const ListOfNotes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListOfTasksComponent);
