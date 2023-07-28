import { useMutation } from '@apollo/client';
import React from 'react';
import DeviceInfo from 'react-native-device-info';

import theme from '@assets/theme/theme';
import { Box, Button, ButtonType, Text } from '@components';
import { useAuthData, useLocalizedData, useOrderAction } from '@contexts';
import { LOGOUT_MUTATION } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { LogoutCustomerMutation } from '@types';

export const SettingsFooter: React.FC = () => {
  const { strings } = useLocalizedData();
  const { loginStatus, dispatchUpdateLogin } = useAuthData();
  const { showGeneralErrorToast } = useToastNotification();
  const { setActiveOrder } = useOrderAction();

  const [logout] = useMutation<LogoutCustomerMutation>(LOGOUT_MUTATION, {
    onError: () => {
      showGeneralErrorToast();
      setActiveOrder(undefined);
      dispatchUpdateLogin({
        isLoggedIn: false,
        isGuestUser: false,
      });
    },
    onCompleted: () => {
      setActiveOrder(undefined);
      dispatchUpdateLogin({
        isLoggedIn: false,
        isGuestUser: false,
      });
    },
    update: (cache) => {
      cache.evict({ fieldName: 'activeOrder' });
    },
  });

  const appVersion: string = DeviceInfo?.getVersion();

  return (
    <>
      <Box>
        <Button type={ButtonType.PRIMARY} onPress={logout}>
          {loginStatus.isGuestUser
            ? strings.profileSettings.overview.registerNow
            : strings.profileSettings.overview.logout}
        </Button>
      </Box>

      <Text style={theme.textVariants['text-xs']} textAlign="center" marginVertical="s5">
        {strings.profileSettings.overview.appVersion}: {appVersion}
      </Text>
    </>
  );
};
