import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from '@react-native-elements/themed';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import { MainNavigator } from './navigation/MainNavigator';
import { client } from './services/client';

export const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />
      <ThemeProvider>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </ApolloProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
