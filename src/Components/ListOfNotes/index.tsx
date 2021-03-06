import React, {FC} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

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

import {styles} from './styles';
import {IProps} from './IProps';
import {MNote} from 'src/models/note.model';
import {arrayToObject} from '../../utils/arrayToObject';

const ListOfNotesComponent: FC<IProps> = ({
  notesReducer: {notes},
  navigation,
}) => {
  const cutText = (txt: string) => {
    if (txt.length > 100) {
      return txt.substr(0, 100) + '...';
    }

    return txt;
  };

  const cardNote = ({item, index}: {item: string | any; index: number}) => {
    return (
      <TouchableOpacity
        style={[
          styles.containerItem,
          {
            marginTop: index === 0 ? 10 : 0,
            borderBottomColor: notes[item].color || '#BEBEBE',
            borderBottomWidth: notes[item].color ? 3 : 0,
          },
        ]}
        onPress={() =>
          navigation.navigate('RegisterNote', {item: notes[item], index: item})
        }>
        {notes[item].image && (
          <Image
            style={styles.image}
            source={{uri: 'file://' + notes[item].image}}
          />
        )}
        <View style={styles.info}>
          <Text style={styles.title}>{notes[item].title}</Text>
          {notes[item].message !== '' && (
            <Text style={styles.noteText}>{cutText(notes[item].message)}</Text>
          )}

          <View style={styles.icons}>
            <View style={styles.icon}>
              {notes[item].audio && (
                <AntDesign
                  style={{marginRight: 10}}
                  name="sound"
                  size={15}
                  color={notes[item].color || '#BEBEBE'}
                />
              )}
              {notes[item].dateReminder && (
                <AntDesign
                  name="clockcircleo"
                  size={15}
                  color={notes[item].color || '#BEBEBE'}
                />
              )}
            </View>
            <View style={styles.icon}>
              {notes[item].isFavorite && (
                <AntDesign name="star" size={15} color={'#FFEF00'} />
              )}
              {(notes[item].color || notes[item].isFixed) && (
                <AntDesign
                  style={{marginLeft: 10}}
                  name="pushpino"
                  size={15}
                  color={notes[item].color || '#BEBEBE'}
                />
              )}
            </View>
          </View>
        </View>
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
          data={Object.keys(notes).filter((item, index) =>
            index % 2 ? false : true,
          )}
          renderItem={(item) => cardNote(item)}
          scrollEnabled={false}
          keyExtractor={(item) => item.toString()}
        />
        <FlatList
          style={{marginHorizontal: 5}}
          data={Object.keys(notes).filter((item, index) =>
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

const mapStateToProps = ({notesReducer}: any) => {
  return {
    notesReducer,
  };
};

const mapDispatchToProps = {};

export const ListOfNotes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListOfNotesComponent);
