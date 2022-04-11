import * as React from 'react';
import { Dimensions, ScrollView, View, StyleSheet } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card, Image, Text } from '@react-native-elements/themed';

import { movieQuery } from '../../services/queries/movieQuery';
import { Loading, Error, Row } from '../shared';
import { MovieStackParamList } from '../../navigation/stacks';
import { formatDate } from '../../utils/date';

const screenWidth = Dimensions.get('window').width;

type MovieDetailProps = NativeStackScreenProps<
  MovieStackParamList,
  'MovieDetail'
>;

export const MovieDetail = ({ navigation, route }: MovieDetailProps) => {
  const [noOfLines, setNoOfLines] = React.useState(3);
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

  const { film } = data || {};

  const releasedDate = React.useMemo(
    () => formatDate(film?.releaseDate),
    [film?.releaseDate],
  );

  const producers = React.useMemo(() => {
    if (film?.producers && film?.producers?.length) {
      return film.producers.join(', ');
    }
  }, [film?.producers]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }
  const getStringWithoutLineBreaks = (text: string) => {
    return text.replace(/(\r\n|\n|\r)/gm, '');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
      >
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require('../../assets/movie_default.png')}
        />
        <View style={styles.infoContainer}>
          {!!film?.openingCrawl && (
            <>
              <Text numberOfLines={noOfLines}>
                {getStringWithoutLineBreaks(film?.openingCrawl)}
              </Text>
              <Text
                style={styles.link}
                onPress={() => setNoOfLines(noOfLines === 0 ? 3 : 0)}
              >
                {noOfLines ? 'See More' : 'See Less'}
              </Text>
            </>
          )}
          <Text h4 style={styles.header}>
            Production
          </Text>
          <Card containerStyle={styles.card}>
            {!!film?.director && (
              <>
                <Row leftText="Director" rightText={film.director} />
                <Card.Divider />
              </>
            )}
            {!!releasedDate && (
              <>
                <Row leftText="ReleaseDate" rightText={releasedDate} />
                <Card.Divider />
              </>
            )}
            {!!producers && <Row leftText="Producers" rightText={producers} />}
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  image: {
    height: 230,
    width: screenWidth,
    left: 0,
    right: 0,
  },
  infoContainer: {
    marginTop: 10,
    padding: 8,
  },
  header: {
    marginTop: 10,
  },
  card: {
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  link: {
    color: 'blue',
  },
});
