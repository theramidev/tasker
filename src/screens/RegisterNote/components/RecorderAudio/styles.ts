import {StyleSheet} from 'react-native';
import {theme} from '../../../../assets/themes';

export const styles = StyleSheet.create({
  container: {
    margin: 10,
  },

  recorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recorderTime: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme(0.3).primary,
    padding: 5,
    borderRadius: 5,
  },
  recorderAudio: {
    backgroundColor: theme().primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 50,
  },
});
