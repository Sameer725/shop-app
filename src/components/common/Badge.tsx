import {
  BaseTheme,
  BoxProps,
  composeRestyleFunctions,
  spacing,
  SpacingProps,
  TextProps,
  useRestyle,
} from '@shopify/restyle';
import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import theme, { Theme } from '@assets/theme/theme';
import { Box } from './Box';
import { Text } from './Text';

export enum BadgeSize {
  MD = 'md',
  LG = 'lg',
}

interface BadgeProps extends SpacingProps<Theme> {
  children: React.ReactNode;
  color?: BoxProps<Theme>['backgroundColor'];
  fontColor?: TextProps<Theme>['color'];
  size?: BadgeSize;
}

type RestyleProps = SpacingProps<Theme> & {
  style?: StyleProp<ViewStyle>;
};
const restyleFunctions = composeRestyleFunctions<BaseTheme, RestyleProps>([spacing]);

export const Badge = (props: BadgeProps) => {
  const { color = 'secondary500', children, fontColor = 'defaultTextColor', size = BadgeSize.MD, ...rest } = props;
  const [textVariant, setTextVariant] = useState<'text-2xs-sb' | 'heading-sm'>('text-2xs-sb');

  const themeProps = useRestyle(restyleFunctions, rest as RestyleProps);

  useEffect(() => {
    switch (size) {
      case BadgeSize.MD:
        setTextVariant('text-2xs-sb');
        break;
      case BadgeSize.LG:
        setTextVariant('heading-sm');
        break;
    }
  }, [size]);

  return (
    <Box {...themeProps}>
      <Box
        justifyContent="center"
        alignItems="center"
        borderRadius={theme.radii.base}
        backgroundColor={color}
        style={styles[size]}
      >
        <Text variant={textVariant} color={fontColor}>
          {children}
        </Text>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  xs: {
    paddingHorizontal: theme.spacing.s1,
    height: theme.spacing.s4,
  },
  md: { paddingHorizontal: theme.spacing.s2, height: theme.spacing.s6 },
  lg: { paddingHorizontal: theme.spacing.s2, height: theme.spacing.s8 },
});
