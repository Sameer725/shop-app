import { createTheme } from '@shopify/restyle';
import { DefaultTheme } from 'react-native-paper';

import { colors, darkThemeColors } from './colors';
import { borderWidth, radii, spacing } from './sizes';
import { textVariants } from './textVariants';

const theme = createTheme({
  colors,

  spacing,
  borderWidth,
  radii,

  textVariants,

  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type Theme = typeof theme;

export default theme;

export const paperTheme: typeof DefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    error: colors.error500,
    primary: colors.primary500,
  },
};

export const darkTheme: Theme = {
  ...theme,

  colors: darkThemeColors,
};
