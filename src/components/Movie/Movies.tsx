import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Alert } from 'react-native';
import { useQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { moviesQuery } from '../../services/queries/moviesQuery';
import { Loading, MovieItem, Error } from '../shared';
import { AllFilmsQueryResult } from 'src/__generated__/graphql';
import { MovieStackParamList } from '../../navigation/stacks/MovieStack';
import { errorTitle, errorMessage } from '../../constants/appTexts';

type MoviesProps = NativeStackScreenProps<MovieStackParamList, 'Movie'>;

export const Movies = ({ navigation }: MoviesProps) => {
  const { loading, data, error }: AllFilmsQueryResult = useQuery(moviesQuery);

  const navigateToDetails = (id?: string) => {
    if (id) {
      navigation.navigate('MovieDetail', { movieID: id });
    } else {
      Alert.alert(errorTitle, errorMessage);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={data?.allFilms?.edges}
          contentContainerStyle={styles.container}
          renderItem={({ item: edge }) => (
            <MovieItem film={edge?.node} onPress={navigateToDetails} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
