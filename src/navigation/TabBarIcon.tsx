import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ICON_MAP } from '../constants/navigation';

interface TabBarIconProps {
  color: string;
  children?: React.ReactNode;
  routeName: string;
  size: number;
}

export const TabBarIcon = ({ routeName, color, size }: TabBarIconProps) => {
  return (
    <MaterialCommunityIcons
      name={ICON_MAP[routeName]}
      size={size}
      color={color}
    />
  );
};
