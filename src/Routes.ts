import {createAppContainer} from 'react-navigation';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from 'react-navigation-stack';

import HomeScreen from './screens/Home';
import RegisterNoteScreen from './screens/RegisterNote';

const Routes = createStackNavigator(
  {
    Home: HomeScreen,
    RegisterNote: {
        screen: RegisterNoteScreen,
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default createAppContainer(Routes);
