import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
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
        />

        <ScrollView>
          <View style={styles.inputTitle}>
            <Input
              title="Titulo"
              value=""
              onChange={() => {}}
              style={{marginTop: 10, width: '75%'}}
            />

            <TouchableOpacity style={{marginRight: 10}}>
              <AntDesign name="star" size={25} color="#F7DC6F" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight: 10}}>
              <AntDesign name="pushpino" size={25} color="#BEBEBE" />
            </TouchableOpacity>
          </View>

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

          <TouchableOpacity style={styles.option}>
            <Foundation name="photo" size={25} color="#BEBEBE" />
            <Text style={styles.textOption}>Agregar imagen</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <AntDesign name="sound" size={25} color="#BEBEBE" />
            <Text style={styles.textOption}>Agregar audio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <AntDesign name="clockcircleo" size={25} color="#BEBEBE" />
            <Text style={styles.textOption}>Recordatorio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <AntDesign name="tagso" size={25} color="#BEBEBE" />
            <Text style={styles.textOption}>Recordatorio</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="note-add" size={20} color="#ffff" />
          <Text style={styles.textButton}>Agregar nota</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
