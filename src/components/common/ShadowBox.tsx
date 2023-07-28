import {
  backgroundColor,
  BackgroundColorProps,
  BaseTheme,
  border,
  BorderProps,
  composeRestyleFunctions,
  layout,
  LayoutProps,
  opacity,
  OpacityProps,
  position,
  PositionProps,
  spacing,
  SpacingProps,
  useRestyle,
  visible,
  VisibleProps,
} from '@shopify/restyle';
import React from 'react';
import { ShadowStyleIOS, StyleProp, ViewStyle } from 'react-native';

import { Theme } from '@assets/theme/theme';
import { Box } from './Box';

export enum ShadowType {
  NONE = 'NONE',
  BASE = 'BASE',
}

interface Props extends RestyleProps {
  children: React.ReactNode;
  type?: ShadowType;
  containerViewStyle?: StyleProp<ViewStyle>;
}

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  PositionProps<Theme> & {
    style?: StyleProp<ViewStyle>;
  };

const restyleFunctions = composeRestyleFunctions<BaseTheme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
  layout,
  opacity,
  visible,
  position,
]);

export const ShadowBox: React.FC<Props> = (props) => {
  const { children, type = ShadowType.BASE, containerViewStyle, ...rest } = props;
  const boxProps = useRestyle(restyleFunctions, rest);

  return (
    <Box
      alignSelf="stretch"
      style={[shadowStyles[type]?.style, containerViewStyle as ViewStyle]}
      elevation={shadowStyles[type]?.elevation}
      backgroundColor={rest.backgroundColor ?? 'white'}
      borderRadius={rest.borderRadius}
    >
      <Box {...boxProps}>{children}</Box>
    </Box>
  );
};

export const shadowStyles: { [key in ShadowType]: { style: ShadowStyleIOS; elevation: number } } = {
  // Shadow Generator: https://ethercreative.github.io/react-native-shadow-generator/
  [ShadowType.BASE]: {
    style: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1, // Value changed to better match the shadow on Android
      shadowRadius: 0.75, // Value changed to better match the shadow on Android
    },
    elevation: 1,
  },
  [ShadowType.NONE]: {
    style: {},
    elevation: 0,
  },
};
