import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../../../../assets/themes';

export const styles = StyleSheet.create({
  modalContainer: {
    padding: 10,
    paddingHorizontal: 30
  },
  modal: {
    backgroundColor: theme().light,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20
  },

  title: {
    color: theme().text,
    fontSize: 20,
    marginBottom: 10,
  },

  addtag: {
    padding: 10,
    backgroundColor: theme().primary,
    borderRadius: 30,
    marginBottom: 10,
  },
  textTag: {
    color: theme().light,
    fontWeight: '800',
    textAlign: 'center',
  },

  check: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme(0.1).text,
    padding: 5,
    borderRadius: 10,
  },
  label: {color: theme().text},
});
