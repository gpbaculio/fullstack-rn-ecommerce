import React from 'react';
import {StatusBar} from 'react-native';
import {RelayEnvironmentProvider} from 'react-relay';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

import environment from './environment';
import Navigation from './navigation';
import {Provider} from 'react-redux';
import {initializeStore} from '../store';

const store = initializeStore();

const App = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <StatusBar
              animated={true}
              backgroundColor="red"
              barStyle="light-content"
              showHideTransition="slide"
            />
            <Navigation />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </RelayEnvironmentProvider>
  );
};

export default App;
