import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  Alert,
} from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { peopleQuery } from '../../services/queries/peopleQuery';
import { Loading, CharacterItem, Error } from '../shared';
import { PAGE_LIMIT } from '../../constants/services';
import { SpeciesPeopleEdge } from '../../__generated__/graphql';
import { CharacterStackParamList } from '../../navigation/stacks/CharacterStack';
import { errorTitle, errorMessage } from '../../constants/appTexts';

type CharactersProps = NativeStackScreenProps<
  CharacterStackParamList,
  'Characters'
>;

export const Characters = ({ navigation }: CharactersProps) => {
  const [peopleData, setPeopleData] = React.useState<SpeciesPeopleEdge[]>([]);
  const [getPeople, { loading, data, error }] = useLazyQuery(peopleQuery);

  useEffect(() => {
    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data && peopleData.length < data?.allPeople?.totalCount) {
      setPeopleData((existingData: SpeciesPeopleEdge[]) => [
        ...existingData,
        ...data?.allPeople?.edges,
      ]);
    }
  }, [data, peopleData.length]);

  const fetchMoreData = () => {
    getPeople({
      variables: {
        first: PAGE_LIMIT,
        after: data?.allPeople?.pageInfo.endCursor,
      },
    });
  };

  const navigateToDetails = (id?: string) => {
    if (id) {
      navigation.navigate('CharacterDetail', { personID: id });
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
          data={peopleData}
          contentContainerStyle={styles.container}
          renderItem={({ item: edge }) => (
            <CharacterItem person={edge.node} onPress={navigateToDetails} />
          )}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchMoreData} />
          }
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
