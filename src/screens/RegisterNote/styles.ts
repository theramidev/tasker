import {StyleSheet} from 'react-native';
import {theme} from '../../assets/themes';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: 40,
  },

  inputTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: theme(0.05).text,
    borderRadius: 10,
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: theme().text,
  },

  button: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: theme().primary,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: theme().light,
    fontSize: 16,
    marginLeft: 5,
  },

  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  option: {},
});
