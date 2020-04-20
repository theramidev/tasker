import {StyleSheet} from 'react-native';
import {theme} from '../../assets/themes';

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

  container: {
    height: '100%',
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

  newTag: {
    position: 'absolute',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#E3E3E3',
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
});
