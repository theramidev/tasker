import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Header} from '../../components/Header';
import {IProps} from './interfaces/IProps';
import {IState} from './interfaces/IState';
import {Input} from '../../components/Input';
import {styles} from './styles';
import {ModalColors} from '../../components/ModalColors';
import {theme} from '../../assets/themes';
import {
  getTags,
  registerTag,
  updateTag,
  deleteTag,
} from '../../redux/actions/tagsActions';
import {ListOfTags} from './components/ListOfTags';

class RegisterTagScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      openModalColors: false,
      colorTag: null,
      visibleLoading: false,

      tag: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getTags();
  }

  handleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
    name: string,
  ) => {
    //@ts-ignore
    this.setState({[name]: event.nativeEvent.text});
  };

  register = async () => {
    const {tag, colorTag} = this.state;
    await this.props.registerTag("#"+tag, colorTag);
    this.setState({tag: ''});
  };

  render() {
    const {tag, openModalColors, colorTag} = this.state;
    const {loadingGetTags, loadingRegisterTag, tags} = this.props.tagsReducer;

    return (
      <View>
        <Header navigation={this.props.navigation} title="Tags" mode="back" />

        <View style={styles.input}>
          <Input
            placeholder="Nuevo tag. ej: #Inspiracion"
            style={{width: '70%'}}
            value={tag}
            onChange={(e) => {
              this.handleChange(e, 'tag');
            }}
          />

          <TouchableOpacity
            style={styles.palette}
            onPress={() => this.setState({openModalColors: true})}>
            <MaterialCommunityIcons name="palette" size={25} color="#ffff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.palette}
            onPress={this.register}
            disabled={loadingRegisterTag}>
            {!loadingRegisterTag ? (
              <AntDesign name="plus" size={25} color="#ffff" />
            ) : (
              <ActivityIndicator size="small" color={theme().light} />
            )}
          </TouchableOpacity>
        </View>

        {tag !== '' && (
          <View style={{position: 'relative', height: 40}}>
            <View style={styles.newTag}>
              <Text style={{color: colorTag || theme().text}}>
                #{tag.trim()}
              </Text>
            </View>
          </View>
        )}

        {loadingGetTags && (
          <View style={{marginTop: 40}}>
            <ActivityIndicator size="large" color={theme().primary} />
          </View>
        )}

        <ListOfTags
          listTags={tags}
          updateTag={this.props.updateTag}
          deleteTag={this.props.deleteTag}
        />

        {/* Modal de colores */}
        <ModalColors
          openModal={openModalColors}
          onClose={(data) => {
            if (data) this.setState({openModalColors: false, colorTag: data});
            else this.setState({openModalColors: false});
          }}
        />
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
  registerTag,
  updateTag,
  deleteTag,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterTagScreen);
