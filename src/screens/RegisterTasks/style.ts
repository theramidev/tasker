import {theme} from '../../assets/themes';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  optionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  optionHeader: {
    position: 'relative',
    width: '48%',
    padding: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOption: {position: 'absolute', left: 10},
  textOption: {fontSize: 12, fontWeight: '600', color: theme().text},
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});
