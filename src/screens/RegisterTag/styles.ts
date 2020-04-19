import {StyleSheet} from 'react-native';
import {theme} from '../../assets/themes';

export const styles = StyleSheet.create({
  input: {
    marginRight: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  palette: {
    width: 37,
    height: 37,
    backgroundColor: theme().primary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  newTag: {
    position: 'absolute',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#E3E3E3',
    padding: 5,
    borderRadius: 10,
  },

  tag: {
    backgroundColor: '#ECECEC',
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagActions: {
    flexDirection: 'row',
  }
});
