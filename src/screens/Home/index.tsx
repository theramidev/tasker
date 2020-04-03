import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FloatingAction} from 'react-native-floating-action';

import {styles} from './styles';
import {ListOfNotes} from '../../Components/ListOfNotes';

class HomeScreen extends Component<{}, {}> {
  render() {
    const options = [
      {
        text: 'Agregar nota',
        name: 'newNote',
        position: 4,
        icon: require('../../assets/icons/note.png'),
      },
    ];

    return (
      <View style={styles.container}>
        <ListOfNotes />
        <FloatingAction
          actions={options}
          onPressItem={(name) => {
            console.log(`selected button: ${name}`);
          }}
          animated={!__DEV__}
        />
      </View>
    );
  }
}

export default HomeScreen;
