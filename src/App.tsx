import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-view';

import Routes from './Routes';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <Routes />
    </SafeAreaProvider>
  );
};

export default App;
