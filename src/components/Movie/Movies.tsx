import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import { moviesQuery } from '../../services/queries/moviesQuery';
import { Loading, MovieItem, Error } from '../shared';
import { AllFilmsQueryResult } from 'src/__generated__/graphql';

export const Movies = () => {
  const { loading, data, error }: AllFilmsQueryResult = useQuery(moviesQuery);

  const navigateToDetails = () => {
    // TO DO
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
