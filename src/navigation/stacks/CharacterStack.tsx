import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Characters } from '../../components/Character/Characters';
import { CharacterDetail } from '../../components/Character/CharacterDetail';
import { tabBackgroundColor } from '../../constants/colors';

export type CharacterStackParamList = {
  Characters: undefined;
  CharacterDetail: { personID: string; title: string };
};

const Stack = createNativeStackNavigator();

export const CharactersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerBackTitle: '',
        headerStyle: { backgroundColor: tabBackgroundColor },
      }}>
      <Stack.Screen name="Characters" component={Characters} />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetail}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
};
