import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';

import {IProps} from './interfaces/IProps';
import {IState} from './interfaces/IState';
import {styles} from './style';
import {theme} from '../../assets/themes';

import {Header} from '../../components/Header';
import {Layout} from '../../components/Layout';
import {Input} from '../../components/Input';
import {DateTimeModal} from '../../components/DateTimeModal';
import {DateAlarm} from '../../components/DateAlarm';
import {ListOfTasks} from './components/ListOfTasks';
import {Ttask} from './components/ListOfTasks/IProps';
import {ModalColors} from '../../components/ModalColors';

class RegisterTasksScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      openModalColors: false,
      openModalDate: false,

      isFavorite: false,
      isFixed: false,
      title: '',
      colorFixed: null,
      tasks: [],
      dateNote: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string,
  ) => {
    //@ts-ignore
    this.setState({[name]: event.nativeEvent.text});
  };

  private updateTask = (task: Ttask, index: number) => {
    this.state.tasks[index] = task;

    this.setState({tasks: this.state.tasks});
  };

  render() {
    const {
      openModalColors,
      isFavorite,
      isFixed,
      title,
      colorFixed,
      tasks,
      openModalDate,
    } = this.state;
    return (
      <Layout>
        <Header
          navigation={this.props.navigation}
          title="Registrar lista"
          iconLibrary="Material"
          iconName="note-add"
          textIcon="Guardar"
          backgroundColor={colorFixed || undefined}
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
              {backgroundColor: colorFixed || '#E3E3E3'},
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
          onChange={(e) => {
            this.handleChange(e, 'title');
          }}
        />

        <ListOfTasks
          tasks={tasks}
          onChangeTask={this.updateTask}
          onAddTask={(task) => {
            this.setState({tasks: [...tasks, task]});
          }}
        />

        {this.state.dateNote && (
          <DateAlarm
            date={this.state.dateNote}
            openModalDate={() => this.setState({openModalDate: true})}
            clearDate={() => this.setState({dateNote: null})}
          />
        )}

        {/* Options */}
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => this.setState({openModalDate: true})}>
            <IonIcons name="md-alarm" size={25} color="#BEBEBE" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.setState({openModalColors: true})}>
            <MaterialCommunityIcons name="palette" size={25} color="#BEBEBE" />
          </TouchableOpacity>
        </View>

        {/* Modal de alarma */}
        <DateTimeModal
          show={this.state.openModalDate}
          onClose={() => {
            this.setState({openModalDate: false});
          }}
          onConfirm={(date) => this.setState({dateNote: date})}
        />

        <ModalColors
          openModal={openModalColors}
          onClose={(data) => {
            if (data) this.setState({openModalColors: false, colorFixed: data});
            else this.setState({openModalColors: false});
          }}
        />
      </Layout>
    );
  }
}

export default RegisterTasksScreen;
