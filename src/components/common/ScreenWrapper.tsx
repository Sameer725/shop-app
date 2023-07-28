import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

import theme from '@assets/theme/theme';

export enum StatusBarType {
  PRIMARY_LIGHT = 'primaryLight',
  BACKGROUND_DARK = 'backgroundDark',
  WHITE_DARK = 'whiteDark',
}

interface Props extends SafeAreaViewProps, React.ComponentProps<typeof SafeAreaView> {
  children: React.ReactNode;
  statusBarType?: StatusBarType;
}

const StatusBarColors = {
  primaryLight: theme.colors.primary500,
  backgroundDark: theme.colors.background,
  whiteDark: theme.colors.white,
};

const StatusBars = {
  primaryLight: (
    <StatusBar
      translucent={false}
      backgroundColor={theme.colors.primary500}
      hidden={false}
      barStyle="light-content"
      animated={true}
    />
  ),
  backgroundDark: (
    <StatusBar
      translucent={false}
      backgroundColor={theme.colors.background}
      hidden={false}
      barStyle="dark-content"
      animated={true}
    />
  ),
  whiteDark: (
    <StatusBar
      translucent={false}
      backgroundColor={theme.colors.white}
      hidden={false}
      barStyle="dark-content"
      animated={true}
    />
  ),
};

export const ScreenWrapper: React.FC<Props> = (props) => {
  const { children, statusBarType = StatusBarType.BACKGROUND_DARK, ...rest } = props;
  const isFocused = useIsFocused();
  const TopBar = () => StatusBars[statusBarType];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: StatusBarColors[statusBarType] }} edges={['top']} {...rest}>
      {isFocused ? <TopBar /> : null}
      {children}
    </SafeAreaView>
  );
};
