import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from '@react-native-elements/themed';

import { Maybe, Person } from '../../__generated__/graphql';

interface CharacterItemProps {
  person?: Maybe<Person>;
  onPress: (id?: string) => void;
}

export const CharacterItem = ({ person, onPress }: CharacterItemProps) => {
  return (
    <ListItem
      Component={TouchableOpacity}
      key={person?.id}
      style={styles.element}
      containerStyle={styles.element}
      onPress={() => onPress(person?.id)}
    >
      <ListItem.Content>
        <ListItem.Title>{person?.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  element: {
    marginTop: 5,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
});
