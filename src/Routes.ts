import {createAppContainer} from 'react-navigation';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack';

import HomeScreen from './screens/Home';
import RegisterNoteScreen from './screens/RegisterNote';
import RegisterTagScreen from './screens/RegisterTag';
import RegisterTasksScreen from './screens/RegisterTasks';

const Routes = createStackNavigator(
  {
    Home: HomeScreen,
    RegisterNote: {
      screen: RegisterNoteScreen,
    },
    RegisterTag: {
      screen: RegisterTagScreen,
    },
    RegisterTasks: {
      screen: RegisterTasksScreen
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default createAppContainer(Routes);
