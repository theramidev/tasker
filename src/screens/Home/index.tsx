import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import {IProps} from './interfaces/IProps';
import {IState} from './interfaces/IState';
import {FloatingAction} from 'react-native-floating-action';
import {connect} from 'react-redux';

import {styles} from './styles';
import {Layout} from '../../components/Layout';
import {Header} from '../../components/Header';
import {Tabs} from './components/Tabs';
import {getAllNotes} from '../../redux/actions/notesActions';

class HomeScreen extends Component<IProps, IState> {
  async componentDidMount() {
    this.props.getAllNotes();
    
  }

  goTo = (name: string) => {
    this.props.navigation.navigate(name);
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
      {
        text: 'Agregar lista de tareas',
        name: 'RegisterTasks',
        position: 4,
        icon: require('../../assets/icons/list.png'),
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
