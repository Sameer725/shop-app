import { StackNavigationOptions } from '@react-navigation/stack';

import theme from '@assets/theme/theme';
import { shadowStyles } from '@components';

export const headerDefaultStyles: StackNavigationOptions = {
  headerShown: true,
  headerShadowVisible: true,
  headerTitleStyle: {
    ...theme.textVariants['heading-md'],
    color: theme.colors.defaultTextColor,
  },
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerStyle: {
    ...shadowStyles.BASE.style,
    // The shadow of the elevation of the base shadow does not look like the other base shadows
    // -> Increase the elevation to get a similar shadow style.
    elevation: shadowStyles.BASE.elevation + 2,
  },
};
