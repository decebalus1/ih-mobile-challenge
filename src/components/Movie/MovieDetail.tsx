import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const MovieDetail = () => (
  <View style={styles.container}>
    <Text>Movie Detail</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
