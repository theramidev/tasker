import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import NotificationManager from 'react-native-check-notification-enable';

import { Provider, store } from './store';

import Routes from './Routes';

const App = () => {

  useEffect(() => {
    // Para verificar loas notifications settings
    // NotificationManager.retrieveGlobalNotificationSettings()
    // .then((settings: any) => {
    //   console.log(settings);
    // })
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <Routes />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
