import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RowProps {
  leftText: string;
  rightText?: string;
}

export const Row = ({ leftText, rightText }: RowProps) => (
  <View style={styles.details}>
    <Text>{leftText}</Text>
    {!!rightText && <Text>{rightText}</Text>}
  </View>
);

const styles = StyleSheet.create({
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});
