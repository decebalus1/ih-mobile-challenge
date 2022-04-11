import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Search } from '../components/Search/Search';
import { TabBarIcon } from './TabBarIcon';
import { tabBackgroundColor, spaceBlue } from '../constants/colors';
import { Tabs } from '../constants/navigation';
import { MovieStack, CharactersStack } from './stacks';

const Tab = createBottomTabNavigator();

export function MainNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <TabBarIcon routeName={route.name} color={color} size={size} />
        ),
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: spaceBlue,
        headerStyle: {
          backgroundColor: tabBackgroundColor,
        },
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: tabBackgroundColor,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 8,
        },
        headerShown: route.name === Tabs.SEARCH,
      })}
    >
      <Tab.Screen name={Tabs.MOVIES} component={MovieStack} />
      <Tab.Screen name={Tabs.CHARACTERS} component={CharactersStack} />
      <Tab.Screen name={Tabs.SEARCH} component={Search} />
    </Tab.Navigator>
  );
}
