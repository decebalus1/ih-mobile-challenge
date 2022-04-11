import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Movies } from '../../components/Movie/Movies';
import { MovieDetail } from '../../components/Movie/MovieDetail';
import { tabBackgroundColor } from '../../constants/colors';

export type MovieStackParamList = {
  Movie: undefined;
  MovieDetail: { movieID: string };
};

const Stack = createNativeStackNavigator();

export const MovieStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerBackTitle: '',
        headerStyle: { backgroundColor: tabBackgroundColor },
      }}
    >
      <Stack.Screen name="Movie" component={Movies} />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
};
