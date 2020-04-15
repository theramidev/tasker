import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../../../../assets/themes';

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: theme().light,
    borderRadius: 20,
    maxHeight: 130,
    padding: 10,
  },

  colors: {
    flexDirection: "row",
    justifyContent: 'space-around',
  },
  color: {width: 50, height: 50, borderRadius: 50},
});
