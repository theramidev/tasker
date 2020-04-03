import {StyleSheet} from 'react-native';
import {theme} from '../../assets/themes';

export const styles = StyleSheet.create({
  containerItem: {
    width: 170,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 80,
  },
  info: {
    padding: 10,
    backgroundColor: theme().light,
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
  },
  noteText: {
    color: theme().text,
    textAlign: 'left',
  }
});
