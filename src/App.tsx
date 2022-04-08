import React from 'react';
import RootComponent from './root-component';
import { ThemeProvider } from '@react-native-elements/themed';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache(),
});

const App = () => (
  <SafeAreaProvider>
    <ThemeProvider>
      <ApolloProvider client={client}>
        <RootComponent />
      </ApolloProvider>
    </ThemeProvider>
  </SafeAreaProvider>
);

export default App;
