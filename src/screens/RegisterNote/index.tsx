import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import Textarea from 'react-native-textarea';
import {connect} from 'react-redux';
import fs from 'react-native-fs';

import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Input} from '../../components/Input';
import {Header} from '../../components/Header';
import {IProps} from './interfaces/IProps';
import {styles} from './styles';
import {RecorderAudio} from './components/RecorderAudio';
import {IState} from './interfaces/IState';
import {Options} from './components/Options';
import {DateTimeModal} from '../../components/DateTimeModal';
import {DateAlarm} from '../../components/DateAlarm';
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
import {registerNote, updateNote} from '../../redux/actions/notesActions';
import {MNote} from 'src/models/note.model';
import {arrayToObject} from '../../utils/arrayToObject';

class RegisterNoteScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const note: MNote = this.props.navigation.getParam('item');
    let noteComplements = null;
    if (note) {
      noteComplements = arrayToObject(note.complements, 'type');
    }

    this.state = {
      openModalColors: false,
      openModalDate: false,
      openActionSheet: false,
      openModalTags: false,
      openAudioPlayer: false,

      headerColor: note ? note.color : null,
      title: note ? note.title : '',
      message: note ? note.message : '',
      favorite: note ? note.isFavorite : false,
      fixed: note ? note.isFixed : false,
      tag: note ? note.tag : null,
      dateNote: note ? note.dateReminder : null,
      audioNote: noteComplements
        ? noteComplements.Audio
          ? noteComplements.Audio.path
          : null
        : null,
      imageNote: noteComplements
        ? noteComplements.Image
          ? noteComplements.Image.path
          : null
        : null,
      videoNote: noteComplements
        ? noteComplements.Video
          ? noteComplements.Video.path
          : null
        : null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getTags();
  }

  componentWillUnmount() {
    fs.unlink(`${fs.ExternalDirectoryPath}/auxImage/`).catch(() =>
      console.log('no se elimino la carpeta'),
    );
  }

  handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string,
  ) => {
    //@ts-ignore
    this.setState({[name]: event.nativeEvent.text});
  };

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
        this.setState({
          imageNote: uri,
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
      .then((uri) => {
        this.setState({
          imageNote: uri,
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
      title,
      message,
      headerColor,
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
      }/audio/audio${new Date().getTime()}.ogg`;

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

    this.props.registerNote({
      title,
      message,
      headerColor,
      favorite,
      fixed,
      tag,
      dateNote,
      image,
      video,
      audio,
    });
  };

  updateNote = async () => {
    const note: MNote = this.props.navigation.getParam('item');
    const index: number = this.props.navigation.getParam('index');
    const noteComplements = arrayToObject(note.complements, 'type');

    const {audioNote, imageNote, videoNote} = this.state;
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
      }/audio/audio${new Date().getTime()}.ogg`;

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

    await this.props.updateNote(
      {...this.state, image, video, audio},
      noteComplements,
      index,
    );
  };

  render() {
    const {
      title,
      message,
      favorite,
      fixed,
      headerColor,
      tag,
      openAudioPlayer,
      videoNote,
      imageNote,
    } = this.state;
    const {tags} = this.props.tagsReducer;
    const {loadingRegisterNote, loadingUpdateNote} = this.props.notesReducer;
    const colorFixed = headerColor || theme().primary;
    const note: MNote = this.props.navigation.getParam('item');

    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          title="Registrar nota"
          mode="back"
          iconLibrary="Material"
          iconName={note ? 'note' : 'note-add'}
          textIcon={note ? 'Editar' : 'Guardar'}
          backgroundColor={this.state.headerColor || undefined}
          onPress={note ? this.updateNote : this.saveNote}
          loading={note ? loadingUpdateNote : loadingRegisterNote}
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
            value={title}
            placeholder="Titulo"
            onChange={(e) => {
              this.handleChange(e, 'title');
            }}
            style={{marginTop: 0}}
          />

          <View style={{marginHorizontal: 10}}>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              defaultValue={message}
              maxLength={150}
              placeholder={'Descripcion'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
              onChange={(e: any) => {
                this.handleChange(e, 'message');
              }}
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
                onPress={() => {
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

const mapStateToProps = ({tagsReducer, notesReducer}: any) => {
  return {
    tagsReducer,
    notesReducer,
  };
};

const mapDispatchToProps = {
  getTags,

  registerNote,
  updateNote,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterNoteScreen);
