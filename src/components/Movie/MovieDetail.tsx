import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { movieQuery } from '../../services/queries/movieQuery';
import { Loading, Error } from '../shared';
import { MovieStackParamList } from '../../navigation/stacks';

type MovieDetailProps = NativeStackScreenProps<
  MovieStackParamList,
  'MovieDetail'
>;

export const MovieDetail = ({ navigation, route }: MovieDetailProps) => {
  const [getMovieDetails, { loading, data, error }] = useLazyQuery(movieQuery);

  React.useEffect(() => {
    getMovieDetails({
      variables: {
        filmId: route.params.movieID,
      },
    });
  }, [getMovieDetails, route.params.movieID]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    });
  }, [navigation, route.params.title]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <View style={styles.container}>
      <Text>Movie Detail</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
