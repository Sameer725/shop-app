import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { DashboardScreens } from '@routes/routes';
import { KsNavigation } from '@types';

const ICON_SIZE = theme.spacing.s5;

export const StickyCloseIcon = () => {
  const insets = useSafeAreaInsets();
  const navigation: KsNavigation = useNavigation();

  const iconContainerStyle = ({ pressed }: { pressed: boolean }) => [
    {
      backgroundColor: pressed ? theme.colors.gray300 : theme.colors.gray100,
      top: insets.top + 20,
    },
    styles.container,
  ];

  const navigateBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(DashboardScreens.DASHBOARD_LANDING_SCREEN);
    }
  };

  return (
    <Pressable style={iconContainerStyle} onPress={navigateBack}>
      <KsIcon name={KS_ICON.CLOSE_CIRCLE} color={theme.colors.gray700} size={ICON_SIZE} style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    left: theme.spacing.s3,
    aspectRatio: 1,
    position: 'absolute',
    width: theme.spacing.s10,
    zIndex: 1,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    // Due to a bug we have to apply the size of the icon as width and height as well.
    // See https://github.com/oblador/react-native-vector-icons/issues/638
    width: ICON_SIZE,
    height: ICON_SIZE,
    // Also, on Android devices the icon must be moved down one pixel so that it is perfectly aligned.
    ...Platform.select({
      android: {
        marginTop: 1,
      },
    }),
  },
});
