import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card, Text } from '@react-native-elements/themed';

import { personQuery } from '../../services/queries/personQuery';
import { Loading, Error, Row } from '../shared';
import { CharacterStackParamList } from '../../navigation/stacks';
import { ScrollView } from 'react-native-gesture-handler';

type CharacterDetailProps = NativeStackScreenProps<
  CharacterStackParamList,
  'CharacterDetail'
>;

export const CharacterDetail = ({
  navigation,
  route,
}: CharacterDetailProps) => {
  const [getPersonDetails, { loading, data, error }] =
    useLazyQuery(personQuery);

  React.useEffect(() => {
    getPersonDetails({
      variables: {
        personId: route.params.personID,
      },
    });
  }, [getPersonDetails, route.params.personID]);

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

  const { person } = data || {};
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text h4 style={styles.header}>
          Personal Information
        </Text>
        <Card containerStyle={styles.card}>
          {!!person?.name && (
            <>
              <Row leftText="Name" rightText={person.name} />
              <Card.Divider />
            </>
          )}

          {!!person?.birthYear && (
            <>
              <Row leftText="Birth Year" rightText={person.birthYear} />
              <Card.Divider />
            </>
          )}
          {!!person?.eyeColor && (
            <>
              <Row leftText="Eye color" rightText={person.eyeColor} />
              <Card.Divider />
            </>
          )}
          {!!person?.hairColor && (
            <>
              <Row leftText="Hair color" rightText={person.hairColor} />
              <Card.Divider />
            </>
          )}
          {!!person?.height && (
            <>
              <Row leftText="Height" rightText={person.height} />
              <Card.Divider />
            </>
          )}
          {!!person?.skinColor && (
            <Row leftText="Skin color" rightText={person.skinColor} />
          )}
        </Card>
        {person?.homeworld && (
          <>
            <Text h4 style={styles.header}>
              Home World
            </Text>
            <Card containerStyle={styles.card}>
              <>
                {!!person?.homeworld.name && (
                  <>
                    <Row leftText="Name" rightText={person.homeworld.name} />
                    <Card.Divider />
                  </>
                )}
                {!!person?.homeworld.population && (
                  <Row
                    leftText="Population"
                    rightText={person.homeworld.population}
                  />
                )}
              </>
            </Card>
          </>
        )}
        {person?.species && (
          <>
            <Text h4 style={styles.header}>
              Species
            </Text>
            <Card containerStyle={styles.card}>
              <>
                {!!person?.species.name && (
                  <>
                    <Row leftText="Name" rightText={person.species.name} />
                    <Card.Divider />
                  </>
                )}
                {!!person?.species.language && (
                  <Row
                    leftText="Language"
                    rightText={person.species.language}
                  />
                )}
              </>
            </Card>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  card: {
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    marginTop: 10,
  },
});
