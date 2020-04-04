import React, {Component, Fragment} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FloatingAction} from 'react-native-floating-action';

import {styles} from './styles';
import {ListOfNotes} from '../../Components/ListOfNotes';
import {Layout} from '../../Components/Layout';
import {Header} from '../../Components/Header';
import {IProps} from './interfaces/IProps';

class HomeScreen extends Component<IProps, {}> {
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
      <Fragment>
        <Layout>
          <Header
            navigation={this.props.navigation}
            title="Tasker"
            mode="none"
          />
          <View style={styles.container}>
            <ListOfNotes />
          </View>
        </Layout>
        <FloatingAction
          actions={options}
          onPressItem={(name) => {
            console.log(`selected button: ${name}`);
          }}
          animated={!__DEV__}
        />
      </Fragment>
    );
  }
}

export default HomeScreen;
