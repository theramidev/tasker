import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Textarea from 'react-native-textarea';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';

import {Input} from '../../components/Input';
import {Header} from '../../components/Header';
import {IProps} from './interfaces/IProps';
import {styles} from './styles';
import {RecorderAudio} from './components/RecorderAudio';

export default class RegisterNoteScreen extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
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

          <View style={styles.options}>
            <TouchableOpacity style={styles.option}>
              <AntDesign name="star" size={25} color="#F7DC6F" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.option]}>
              <AntDesign name="pushpino" size={25} color="#BEBEBE" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <Foundation name="photo" size={25} color="#BEBEBE" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <AntDesign name="sound" size={25} color="#BEBEBE" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <AntDesign name="clockcircleo" size={25} color="#BEBEBE" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <AntDesign name="tagso" size={25} color="#BEBEBE" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
