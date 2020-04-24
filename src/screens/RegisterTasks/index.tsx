import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { IProps } from './interfaces/IProps';
import { IState } from './interfaces/IState';
import { styles } from './style';
import { theme } from '../../assets/themes';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Header} from '../../components/Header';
import { Layout } from '../../components/Layout';
import { Input } from '../../components/Input';
import { ListOfTasks } from './components/ListOfTasks';

class RegisterTasksScreen extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      isFavorite: false,
      isFixed: false,
      title: '',
      colorFixed: '#E3E3E3',
      tasks: []
    }
  }

  render() {
    const { isFavorite, isFixed, title, colorFixed, tasks } = this.state;
    return(
      <Layout>
        <Header 
          navigation={this.props.navigation}
          title="Registrar lista"
          iconLibrary="Material"
          iconName="note-add"
          textIcon="Guardar"
        />

        <View style={styles.optionsHeader}>
          <TouchableOpacity
            onPress={() => this.setState({isFavorite: !isFavorite})}
            style={[
              styles.optionHeader,
              {backgroundColor: isFavorite ? '#FFFAB0' : '#E3E3E3'},
            ]}>
            <AntDesign
              name="star"
              size={25}
              color={isFavorite ? '#FFEF00' : '#BEBEBE'}
              style={styles.iconOption}
            />
            <Text
              style={[
                styles.textOption,
                {color: isFavorite ? theme().text : '#BEBEBE'},
              ]}>
              Favorito
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.setState({isFixed: !isFixed})}
            style={[
              styles.optionHeader,
              {backgroundColor: isFixed ? colorFixed : '#E3E3E3'},
            ]}>
            <AntDesign
              name="pushpino"
              size={25}
              color={isFixed ? theme().light : '#BEBEBE'}
              style={styles.iconOption}
            />
            <Text
              style={[
                styles.textOption,
                {color: isFixed ? theme().light : '#BEBEBE'},
              ]}>
              Fijar nota
            </Text>
          </TouchableOpacity>
        </View>

        <Input
          value={title}
          placeholder="Titulo"
          style={{marginTop: 0}}
          onChange={() => console.log('')}
        />

        <ListOfTasks 
          tasks={tasks}
          onAddTask={(task) => tasks.push(task)}
        />
      </Layout>
    );
  }
}

export default RegisterTasksScreen;
