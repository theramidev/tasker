import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-view';
// import NotificationManager from 'react-native-check-notification-enable';
import SplashScreen from 'react-native-splash-screen';

import { Provider, store } from './store';

import Routes from './Routes';

const App = () => {

  useEffect(() => {
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
        <Routes />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
