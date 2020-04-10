import React, { useEffect, useContext } from 'react';
import { Easing, YellowBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-view';
// import NotificationManager from 'react-native-check-notification-enable';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
import Drawer from 'react-native-drawer-menu';

import { Provider, store } from './store';

import Routes from './Routes';
import { Menu } from './components/Menu';
import { MenuContext } from './MenuContext';
import Database from './Database';


const App = () => {
  const { setRef } = useContext(MenuContext);
  // Necesario para ignorar este warning
  YellowBox.ignoreWarnings(['Calling `getNode()`']);
  useEffect(() => {
    Orientation.lockToPortrait();

    // Open Database
    Database.open();

    // Para verificar loas notifications settings
    // NotificationManager.retrieveGlobalNotificationSettings()
    // .then((settings: any) => {
    //   console.log(settings);
    // })


    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Drawer 
          type={Drawer.types.Overlay}
          drawerContent={<Menu />}
          easingFunc={Easing.ease}
          duration={300}
          ref={(ref: any) => {
            if (setRef) {
              setRef(ref)
            }
          }}
        >
          <Routes />
        </Drawer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
