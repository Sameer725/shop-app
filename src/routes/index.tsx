import { useNetInfo } from '@react-native-community/netinfo';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/de';
import isBetween from 'dayjs/plugin/isBetween';
import localeData from 'dayjs/plugin/localeData';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { useAuthData, useLocalizedData } from '@contexts';
import { useMountEffect, useToastNotification } from '@hooks';
import { AuthNavigation } from './AuthNavigation';
import { RootRoutes } from './routes';
import { TabNavigation } from './TabNavigation';

export const Routes = (): JSX.Element => {
  const Stack = createStackNavigator();
  // Hide SplashScreen only when this component is mounted
  useMountEffect(() => {
    SplashScreen.hide();
  }, []);

  // Set default locale time
  dayjs.locale(locale);
  dayjs.extend(localeData);
  dayjs.extend(isBetween);

  const { loginStatus } = useAuthData();

  const netInfo = useNetInfo();

  const { showInfoToast } = useToastNotification();
  const { strings } = useLocalizedData();

  useEffect(() => {
    if (netInfo.isConnected === false) {
      showInfoToast(strings.noInternetConnection);
    }
  }, [netInfo]);

  const renderScreens = () => {
    return loginStatus.userDetail !== undefined || loginStatus.isGuestUser ? (
      <Stack.Screen name={RootRoutes.AUTHENTICATED} component={TabNavigation} />
    ) : (
      <Stack.Screen name={RootRoutes.UNAUTHENTICATED} component={AuthNavigation} />
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerShown: false,
      }}
    >
      {renderScreens()}
    </Stack.Navigator>
  );
};
