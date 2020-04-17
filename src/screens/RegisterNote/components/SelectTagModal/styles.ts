import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../../../../assets/themes';

export const styles = StyleSheet.create({
  modalContainer: {
    padding: 10,
  },
  modal: {
    backgroundColor: theme().light,
    borderRadius: 20,
    padding: 10,
  },

  title: {
    color: theme().text,
    fontSize: 20,
    marginBottom: 10,
  },

  addtag: {
    
  },

  check: {flexDirection: 'row', alignItems: 'center'},
  label: {color: theme().text},
});
