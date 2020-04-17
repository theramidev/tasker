import {StyleSheet} from 'react-native';
import {theme} from '../../assets/themes';

export const styles = StyleSheet.create({
  container: {
    height: '101%',
  },
  add: {
    backgroundColor: theme().primary,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 40,
    height: 40,
    bottom: 20,
    right: 20,
  },
  icon: {
    color: theme().light,
  },
});
