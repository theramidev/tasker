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
import {connect} from 'react-redux';
import fs, {stat} from 'react-native-fs';

import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Input} from '../../components/Input';
import {Header} from '../../components/Header';
import {IProps} from './interfaces/IProps';
import {styles} from './styles';
import {RecorderAudio} from './components/RecorderAudio';
import {IState} from './interfaces/IState';
import {DateTimeModal} from './components/DateTimeModal';
import {Options} from './components/Options';
import {DateAlarm} from './components/DateAlarm';
import {ActionSheet} from '../../components/ActionSheet';
import {ModalColors} from '../../components/ModalColors';
import {
  takePictureFromCamera,
  takePictureFromGallery,
  takeVideo,
} from '../../utils/camera';
import {Video} from '../../components/Video';
import {theme} from '../../assets/themes';
import {SelectTagModal} from './components/SelectTagModal';
import {getTags} from '../../redux/actions/tagsActions';

class RegisterNoteScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      headerColor: undefined,
      openModalColors: false,
      openModalDate: false,
      openActionSheet: false,
      openModalTags: false,
      openAudioPlayer: false,

      favorite: false,
      fixed: false,
      tag: null,
      dateNote: null,
      audioNote: null,
      imageNote: null,
      videoNote: null,
    };
  }

  componentDidMount() {
    this.props.getTags();
  }

  componentWillUnmount() {
    if (this.state.imageNote) {
      fs.unlink(this.state.imageNote).catch(() => {
        console.log('no se elimino');
      });
    }
  }

  getVideo = (): void => {
    takeVideo()
      .then(async (uri) => {
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
      .then(async (uri) => {
        if (!(await fs.exists(`${fs.ExternalDirectoryPath}/auxImage`))) {
          await fs.mkdir(`${fs.ExternalDirectoryPath}/auxImage`);
        }

        if (this.state.imageNote) {
          await fs.unlink('file://' + this.state.imageNote);
        }

        const pathImage = `${
          fs.ExternalDirectoryPath
        }/auxImage/image${new Date().getTime()}.jpg`;

        await fs.copyFile(uri, pathImage);

        this.setState({
          imageNote: pathImage,
        });
        this.setState({openActionSheet: false});
      })
      .catch((err) => {
        console.log(err);
        this.setState({openActionSheet: false});
      });
  };

  getImageGalery = () => {
    takePictureFromGallery()
      .then(async (uri) => {
        if (!(await fs.exists(`${fs.ExternalDirectoryPath}/auxImage`))) {
          await fs.mkdir(`${fs.ExternalDirectoryPath}/auxImage`);
        }

        if (this.state.imageNote) {
          await fs.unlink('file://' + this.state.imageNote);
        }

        const pathImage = `${
          fs.ExternalDirectoryPath
        }/auxImage/image${new Date().getTime()}.jpg`;

        await fs.copyFile(uri, pathImage);

        this.setState({
          imageNote: pathImage,
        });
        this.setState({openActionSheet: false});
      })
      .catch((err) => {
        console.log(err);
        this.setState({openActionSheet: false});
      });
  };

  saveNote = async () => {
    const {
      favorite,
      fixed,
      tag,
      dateNote,
      audioNote,
      imageNote,
      videoNote,
    } = this.state;
    let image = imageNote;
    let audio = audioNote;
    let video = videoNote;

    if (image) {
      const pathImage = `${
        fs.ExternalDirectoryPath
      }/images/image${new Date().getTime()}.jpg`;

      await fs.copyFile(image, pathImage);
      image = pathImage;
    }

    if (audio) {
      const pathAudio = `${
        fs.ExternalDirectoryPath
      }/song/audio${new Date().getTime()}.jpg`;

      await fs.copyFile(audio, pathAudio);
      audio = pathAudio;
    }

    if (video) {
      const pathVideo = `${
        fs.ExternalDirectoryPath
      }/videos/video${new Date().getTime()}.jpg`;

      await fs.copyFile(video, pathVideo);
      video = pathVideo;
    }

    
  };

  render() {
    const {
      favorite,
      fixed,
      headerColor,
      tag,
      openAudioPlayer,
      videoNote,
      imageNote,
    } = this.state;
    const {tags} = this.props.tagsReducer;
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

          {/* Componente de audio */}
          <RecorderAudio
            show={openAudioPlayer}
            clearNote={() =>
              this.setState({openAudioPlayer: false, audioNote: null})
            }
            saveNote={(path) => {
              this.setState({audioNote: path});
            }}
          />

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
                onPress={async () => {
                  await fs.unlink('file://' + this.state.imageNote);
                  this.setState({imageNote: null});
                }}>
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

          {tag && (
            <View style={{position: 'relative', height: 40, marginTop: 10}}>
              <View style={styles.newTag}>
                <Text style={{color: tag.color}}>{tag.name}</Text>
                <TouchableOpacity onPress={() => this.setState({tag: null})}>
                  <MaterialCommunityIcons
                    name="close"
                    size={20}
                    color="#FF2222"
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Modal de los colores de la nota */}
          <ModalColors
            openModal={this.state.openModalColors}
            onClose={(data) => {
              if (data)
                this.setState({openModalColors: false, headerColor: data});
              else this.setState({openModalColors: false});
            }}
          />

          {/* MODAL TAGS */}
          <SelectTagModal
            openModal={this.state.openModalTags}
            closeModal={(data) => {
              console.log(data);
              if (data) this.setState({openModalTags: false, tag: data});
              else this.setState({openModalTags: false});
            }}
            navigation={() => this.props.navigation.navigate('RegisterTag')}
            tags={tags}
          />

          {/* Modal de alarma */}
          <DateTimeModal
            show={this.state.openModalDate}
            onClose={() => {
              this.setState({openModalDate: false});
            }}
            onConfirm={(date) => this.setState({dateNote: date})}
          />

          {/* opciones de camara */}
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
            hideImage={videoNote !== null || imageNote !== null}
            hideVideo={
              imageNote !== null || openAudioPlayer || videoNote !== null
            }
            hideaudio={videoNote !== null || openAudioPlayer}
            openModalColors={() => this.setState({openModalColors: true})}
            openModalDate={() => this.setState({openModalDate: true})}
            openActionSheet={() => this.setState({openActionSheet: true})}
            openTakeVideo={() => this.getVideo()}
            openModalTags={() => this.setState({openModalTags: true})}
            openAudio={() => this.setState({openAudioPlayer: true})}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({tagsReducer}: any) => {
  return {
    tagsReducer,
  };
};

const mapDispatchToProps = {
  getTags,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterNoteScreen);
