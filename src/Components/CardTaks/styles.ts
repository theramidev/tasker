import {StyleSheet} from 'react-native';
import {theme} from '../../assets/themes';

export const styles = StyleSheet.create({
  containerItem: {
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: theme().light
  },
  headerTask: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    color: theme().text,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskText: {
    marginLeft: 4,
    fontSize: 15,
  },
  point: {
    width: 10,
    height: 10,
    backgroundColor: theme().text,
    borderRadius: 10,
  }
});
