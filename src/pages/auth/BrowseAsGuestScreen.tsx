import { NavigationProp, ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';

import MapSVG from '@assets/img/map.svg';
import { Box, Button, ButtonSize, ButtonType, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { AuthLayout } from '@layouts';
import { LoginAsGuestButton } from '@pages/auth/components/LoginAsGuestButton';
import { AuthScreens } from '@routes/routes';

interface RouteParams {
  isWaitingListCreated?: boolean;
}

export const BrowseAsGuestScreen: React.FC = () => {
  const { strings } = useLocalizedData();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const route: RouteProp<{ params: RouteParams }, 'params'> = useRoute();

  const hideWaitingListButton = route.params?.isWaitingListCreated ?? false;

  const navigateToWaitingListInputScreen = () => {
    navigation.navigate(AuthScreens.WAITING_LIST_INPUT_SCREEN);
  };
  const navigateToLoginScreen = () => {
    navigation.navigate(AuthScreens.LOGIN_SCREEN);
  };
  return (
    <AuthLayout noBackground>
      <Box justifyContent="space-between" flex={1} marginTop="s8">
        <Box>
          <Box flexDirection="row" justifyContent="space-between">
            <Text style={styles.heading} variant="heading-3xl">
              {strings.auth.browseAsGuestHeading}
            </Text>

            <Button width="auto" onPress={navigateToLoginScreen} type={ButtonType.PRIMARY} size={ButtonSize.MD}>
              {strings.auth.login}
            </Button>
          </Box>

          <Text variant="heading-xs" marginTop="s5" style={styles.areaList}>
            {strings.auth.deliveryAreaList}
          </Text>
        </Box>

        <MapSVG style={styles.map} alignSelf="center" />

        <Box marginBottom="s8">
          <LoginAsGuestButton />

          {hideWaitingListButton ? null : (
            <Button onPress={navigateToWaitingListInputScreen} type={ButtonType.OUTLINE} marginTop="s4">
              {strings.auth.notInArea}
            </Button>
          )}
        </Box>
      </Box>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  heading: {
    maxWidth: 200,
  },
  areaList: {
    width: 240,
  },
  map: {
    aspectRatio: 1,
    width: '45%',
  },
});
