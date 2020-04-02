import { createAppContainer } from 'react-navigation';
import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack';

import HomeScreen from './screens/Home';

const Routes = createStackNavigator(
    {
        Home: HomeScreen
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(Routes);