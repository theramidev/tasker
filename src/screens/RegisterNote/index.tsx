import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import Textarea from 'react-native-textarea';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';

import {Input} from '../../components/Input';
import {Header} from '../../components/Header';
import {IProps} from './interfaces/IProps';
import {styles} from './styles';
import {RecorderAudio} from './components/RecorderAudio';
import {ModalColors} from './components/ModalColors';
import {IState} from './interfaces/IState';
import {DateTimeModal} from './components/DateTimeModal';
import {Options} from './components/Options';
import {DateAlarm} from './components/DateAlarm';

export default class RegisterNoteScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      headerColor: undefined,
      openModalColors: false,
      openModalDate: false,
      dateNote: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          title="Registrar nota"
          mode="back"
          iconLibrary="Material"
          iconName="note-add"
          textIcon="Guardar"
          backgroundColor={this.state.headerColor}
        />

        <ScrollView>
          <Input
            value=""
            placeholder="Titulo"
            onChange={() => {}}
            style={{marginTop: 10}}
          />

          <View style={{marginHorizontal: 10}}>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              defaultValue={''}
              maxLength={150}
              placeholder={'Descripcion'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
            />
          </View>

          <RecorderAudio show={false} />

          {this.state.dateNote && (
            <DateAlarm
              date={this.state.dateNote}
              openModalDate={() => this.setState({openModalDate: true})}
              clearDate={() => this.setState({dateNote: null})}
            />
          )}

          <ModalColors
            openModal={this.state.openModalColors}
            onClose={(data) => {
              this.setState({openModalColors: false, headerColor: data});
            }}
          />

          <DateTimeModal
            show={this.state.openModalDate}
            onClose={() => {
              this.setState({openModalDate: false});
            }}
            onConfirm={(date) => this.setState({dateNote: date})}
          />

          <Options
            openModalColors={() => this.setState({openModalColors: true})}
            openModalDate={() => this.setState({openModalDate: true})}
          />
        </ScrollView>
      </View>
    );
  }
}
