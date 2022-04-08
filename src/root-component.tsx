import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import { Header, ListItem } from '@react-native-elements/themed';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useQuery, gql } from '@apollo/client';

import { AllPeopleQueryResult } from './__generated__/graphql';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const { data }: AllPeopleQueryResult = useQuery(gql`
    {
      allPeople {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header
        backgroundImageStyle={{}}
        barStyle="default"
        centerComponent={{
          text: 'IH Challenge',
          style: { color: '#fff' },
        }}
        centerContainerStyle={{}}
        leftComponent={{ icon: 'menu', color: '#fff' }}
        leftContainerStyle={{}}
        linearGradientProps={{}}
        placement="center"
        rightComponent={{ icon: 'home', color: '#fff' }}
        rightContainerStyle={{}}
        statusBarProps={{}}
      />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}
      >
        <FlatList
          data={data?.allPeople?.edges}
          renderItem={({ item: edge }) => (
            <ListItem Component={TouchableHighlight} key={edge?.node?.id}>
              <ListItem.Content>
                <ListItem.Title>{edge?.node?.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
