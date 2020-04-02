import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-view';

import { Provider, store } from './store';

import Routes from './Routes';

const App = () => {
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
