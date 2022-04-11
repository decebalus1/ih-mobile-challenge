import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorProps {
  message: string;
}

export const Error = ({ message }: ErrorProps) => (
  <View style={styles.errorContainer}>
    <Text>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
