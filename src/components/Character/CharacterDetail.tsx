import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { personQuery } from '../../services/queries/personQuery';
import { Loading, Error } from '../shared';
import { CharacterStackParamList } from '../../navigation/stacks';

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

  return (
    <View style={styles.container}>
      <Text>Character Detail</Text>
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
