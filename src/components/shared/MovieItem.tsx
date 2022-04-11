import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card, Icon } from '@react-native-elements/themed';

import { Film } from '../../__generated__/graphql';
import { spaceBlue } from '../../constants/colors';
import { formatDate } from '../../utils/date';

export interface MovieItemProps {
  film?: Film | null;
  onPress: (id?: string, title?: string) => void;
}

export const MovieItem = ({ film, onPress }: MovieItemProps) => {
  const formatedReleaseDate = formatDate(film?.releaseDate);
  return (
    <Card containerStyle={styles.card}>
      {film?.title && <Card.Title testID="film-title">{film.title}</Card.Title>}
      <Card.Divider />
      <Card.Image
        accessible={false}
        style={styles.cardImage}
        source={require('../../assets/movie_default.png')}
      />
      {film?.director && (
        <View style={styles.details}>
          <Text>Director</Text>
          <Text>{film.director}</Text>
        </View>
      )}
      {formatedReleaseDate && (
        <View style={styles.details}>
          <Text>Release date</Text>
          <Text>{formatedReleaseDate}</Text>
        </View>
      )}
      <Button
        icon={<Icon name="code" color={spaceBlue} iconStyle={styles.icon} />}
        buttonStyle={styles.button}
        testID="see-details"
        accessibilityRole="button"
        accessibilityHint={`See more details about ${film?.title}`}
        title="See details"
        onPress={() => onPress(film?.id, film?.title || '')}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  card: {
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 10,
    backgroundColor: spaceBlue,
  },
  icon: {
    marginRight: 10,
  },
  cardImage: {
    padding: 0,
  },
});
