import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const EmptyResults = () => (
  <View style={styles.errorContainer}>
    <Text>No results found</Text>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
