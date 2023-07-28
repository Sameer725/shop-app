import { BaseTheme, composeRestyleFunctions, layout, LayoutProps, spacing, SpacingProps } from '@shopify/restyle';
import { PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import theme, { Theme } from '@assets/theme/theme';

export interface SocialButtonProps extends PressableProps, SpacingProps<Theme>, LayoutProps<Theme> {
  style?: StyleProp<ViewStyle>;
}

export type SocialButtonRestyleProps = SpacingProps<Theme> &
  LayoutProps<Theme> & {
    style?: StyleProp<ViewStyle>;
  };

export const socialButtonRestyleFunctions = composeRestyleFunctions<BaseTheme, SocialButtonRestyleProps>([
  layout,
  spacing,
]);

export const socialButtonStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: theme.radii.md,
    height: theme.spacing.s12,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.s4,
  },
  loader: {
    flex: 1,
  },
});
