import React, {Component, Fragment} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IProps} from './interfaces/IProps';
import {IState} from './interfaces/IState';
import {FloatingAction} from 'react-native-floating-action';
import {connect} from 'react-redux';

import {styles} from './styles';
import {ListOfNotes} from '../../components/ListOfNotes';
import {Layout} from '../../components/Layout';
import {Header} from '../../components/Header';
import {Tabs} from './components/Tabs';
import {getAllNotes} from '../../redux/actions/notesActions';

class HomeScreen extends Component<IProps, IState> {
  componentDidMount() {
    this.props.getAllNotes();
  }

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
    const {notes} = this.props.notesReducer;
    const options = [
      {
        text: 'Agregar nota',
        name: 'RegisterNote',
        position: 4,
        icon: require('../../assets/icons/note.png'),
      },
    ];

    return (
      <Layout>
        <Header navigation={this.props.navigation} title="Tasker" mode="menu" />
        <View style={styles.container}>
          <Tabs notes={notes} navigation={this.props.navigation} />
        </View>
        <FloatingAction
          actions={options}
          // @ts-ignore
          onPressItem={this.goTo}
          animated={!__DEV__}
        />
      </Layout>
    );
  }
}

const mapStateToProps = ({notesReducer}: any) => {
  return {
    notesReducer,
  };
};

const mapDispatchToProps = {
  getAllNotes,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
