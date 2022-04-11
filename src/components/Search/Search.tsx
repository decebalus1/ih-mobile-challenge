import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, SearchBar } from '@react-native-elements/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { tabBackgroundColor } from '../../constants/colors';

export const Search = () => {
  const [search, setSearch] = React.useState('');

  const navigation = useNavigation();

  const searchFilterFunction = (searchText: string) => {
    setSearch(searchText);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => console.log('aaaa')}
          icon={
            <MaterialCommunityIcons
              name="filter-variant"
              color="white"
              size={25}
            />
          }
          buttonStyle={styles.filter}
        />
      ),
    });
  }, [navigation]);

  return (
    <>
      <SearchBar
        containerStyle={styles.searchBar}
        round
        searchIcon={{ size: 24 }}
        onChangeText={text => searchFilterFunction(text)}
        onClear={() => searchFilterFunction('')}
        placeholder="Type Here..."
        value={search}
      />
      <View style={styles.container}>
        <Text>Search</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: tabBackgroundColor,
  },
  searchBarText: {
    backgroundColor: 'white',
  },
  filter: {
    backgroundColor: 'transparent',
  },
});
