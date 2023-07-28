import { ResponsiveValue } from '@shopify/restyle/dist/types';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import theme, { Theme } from '@assets/theme/theme';
import { Box } from './Box';

interface Props {
  thickness?: number;
  color?: ResponsiveValue<keyof Theme['colors'], Theme>;
  width?: string | number | ResponsiveValue<keyof Theme['spacing'], Theme> | undefined;
  style?: StyleProp<ViewStyle>;
}

export const Divider: React.FC<Props> = (props) => {
  const { thickness = theme.borderWidth.b1, color = 'gray300', width = '100%', style } = props;

  return <Box borderTopWidth={thickness} borderColor={color} style={style} width={width} />;
};
