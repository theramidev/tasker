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
import { IState } from './interfaces/IState';


class HomeScreen extends Component<IProps, IState> {

  goTo = (name: string) => {
    switch (name) {
      case 'RegisterNote':
        this.props.navigation.navigate(name);
        break;
    
      default:
        break;
    }
  };

  render() {
    const options = [
      {
        text: 'Agregar nota',
        name: 'RegisterNote',
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
          mode="menu"
        />
        <View style={styles.container}>
          <ListOfNotes />
        </View>
        </Layout>
        <FloatingAction
          actions={options}
          // @ts-ignore
          onPressItem={this.goTo}
          animated={!__DEV__}
        />
      </Fragment>
    );
  }
}

export default HomeScreen;
