import React from 'react';
import {StatusBar} from 'react-native';
import {RelayEnvironmentProvider} from 'react-relay';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

import environment from './environment';
import Navigation from './navigation';

const App = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <NavigationContainer>
        <SafeAreaProvider>
          <StatusBar
            animated={true}
            backgroundColor="#61dafb"
            barStyle="light-content"
            showHideTransition="slide"
          />
          <Navigation />
        </SafeAreaProvider>
      </NavigationContainer>
    </RelayEnvironmentProvider>
  );
};

export default App;
