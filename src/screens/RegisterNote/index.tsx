import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';
import Textarea from 'react-native-textarea';

import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';

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
import {ActionSheet} from '../../components/ActionSheet';
import {
  takePictureFromCamera,
  takePictureFromGallery,
  takeVideo,
} from '../../utils/camera';
import {Video} from '../../components/Video';
import {theme} from '../../assets/themes';

export default class RegisterNoteScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      headerColor: undefined,
      openModalColors: false,
      openModalDate: false,
      openActionSheet: false,
      favorite: false,
      fixed: false,
      dateNote: null,
      imageNote: null,
      videoNote: null,
    };
  }

  getVideo = (): void => {
    takeVideo()
      .then((uri) => {
        this.setState({videoNote: uri});
        this.setState({openActionSheet: false});
      })
      .catch((err) => {
        console.log(err);
        this.setState({openActionSheet: false});
      });
  };

  getImageCamera = () => {
    takePictureFromCamera()
      .then((uri) => {
        this.setState({imageNote: uri});
        this.setState({openActionSheet: false});
      })
      .catch((err) => {
        console.log(err);
        this.setState({openActionSheet: false});
      });
  };

  getImageGalery = () => {
    takePictureFromGallery()
      .then((uri) => {
        this.setState({imageNote: uri});
        this.setState({openActionSheet: false});
      })
      .catch((err) => {
        console.log(err);
        this.setState({openActionSheet: false});
      });
  };

  render() {
    const {favorite, fixed, headerColor} = this.state;
    const colorFixed = headerColor || theme().primary;

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
          <View style={styles.optionsHeader}>
            <TouchableOpacity
              onPress={() => this.setState({favorite: !favorite})}
              style={[
                styles.optionHeader,
                {backgroundColor: favorite ? '#FFFAB0' : '#E3E3E3'},
              ]}>
              <AntDesign
                name="star"
                size={25}
                color={favorite ? '#FFEF00' : '#BEBEBE'}
                style={styles.iconOption}
              />
              <Text
                style={[
                  styles.textOption,
                  {color: favorite ? theme().text : '#BEBEBE'},
                ]}>
                Favorito
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({fixed: !fixed})}
              style={[
                styles.optionHeader,
                {backgroundColor: fixed ? colorFixed : '#E3E3E3'},
              ]}>
              <AntDesign
                name="pushpino"
                size={25}
                color={fixed ? theme().light : '#BEBEBE'}
                style={styles.iconOption}
              />
              <Text
                style={[
                  styles.textOption,
                  {color: fixed ? theme().light : '#BEBEBE'},
                ]}>
                Fijar nota
              </Text>
            </TouchableOpacity>
          </View>

          <Input
            value=""
            placeholder="Titulo"
            onChange={() => {}}
            style={{marginTop: 0}}
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

          {this.state.imageNote && (
            <View style={{position: 'relative'}}>
              <TouchableOpacity
                style={{position: 'absolute', top: 15, left: 15, zIndex: 10}}
                onPress={() => this.setState({imageNote: null})}>
                <AntDesign name="close" size={20} color="#FF3737" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({openActionSheet: true})}>
                <Image
                  style={{height: 200, margin: 10, borderRadius: 10}}
                  source={{
                    uri: 'file://' + this.state.imageNote,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}

          {this.state.videoNote && (
            <View style={{position: 'relative'}}>
              <TouchableOpacity
                style={{position: 'absolute', top: 15, left: 15, zIndex: 10}}
                onPress={() => this.setState({videoNote: null})}>
                <AntDesign name="close" size={20} color="#FF3737" />
              </TouchableOpacity>

              <View style={{margin: 10, borderRadius: 20}}>
                <Video uri={this.state.videoNote} height={200} />
              </View>
            </View>
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

          <ActionSheet
            isVisible={this.state.openActionSheet}
            title="Seleccionar"
            onClose={() => this.setState({openActionSheet: false})}
            options={[
              {
                title: 'Imagen de galeria',
                icon: <IonIcons name="ios-image" color="#868686" size={20} />,
                onPress: () => {
                  this.getImageGalery();
                },
              },
              {
                title: 'Tomar foto',
                icon: <IonIcons name="md-camera" color="#868686" size={20} />,
                onPress: () => {
                  this.getImageCamera();
                },
              },
            ]}
          />

          <Options
            openModalColors={() => this.setState({openModalColors: true})}
            openModalDate={() => this.setState({openModalDate: true})}
            openActionSheet={() => this.setState({openActionSheet: true})}
            openTakeVideo={() => this.getVideo()}
          />
        </ScrollView>
      </View>
    );
  }
}
