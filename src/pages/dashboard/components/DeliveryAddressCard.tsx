import React from 'react';
import { StyleSheet } from 'react-native';

import theme from '@assets/theme/theme';
import { Box, Button, ButtonType, DeliveryConditionCard, ShadowBox, Text } from '@components';
import { useAuthData, useLocalizedData, useOrderState } from '@contexts';
import { DeliveryAddressCardSkeleton } from './DeliveryAddressCardSkeleton';

export const DeliveryAddressCard = () => {
  const { strings } = useLocalizedData();

  const { activeOrder, isLoading } = useOrderState();

  const { loginStatus, dispatchUpdateLogin } = useAuthData();

  const isUserLoggedIn = !!loginStatus.userDetail?.id;

  const navigateToLogin = () => {
    dispatchUpdateLogin({
      isLoggedIn: false,
      isGuestUser: false,
    });
  };

  if (isLoading && !activeOrder) {
    return <DeliveryAddressCardSkeleton />;
  }

  const renderGuestDeliveryConditions = () => {
    return (
      <ShadowBox containerViewStyle={styles.containerViewStyle} paddingHorizontal="s3" paddingVertical="s4">
        <Text variant="heading-xs" paddingTop="s1" textAlign="center">
          {strings.dashboard.orderNowTitle}
        </Text>
        <Text variant="text-xs" paddingTop="s1">
          {strings.dashboard.orderNowInfo}
        </Text>
        <Box paddingTop="s4">
          <Button onPress={navigateToLogin} type={ButtonType.PRIMARY}>
            {strings.registerNow}
          </Button>
        </Box>
      </ShadowBox>
    );
  };

  return (
    <Box marginHorizontal="s3" marginTop="s8">
      {isUserLoggedIn ? (
        <DeliveryConditionCard infoText={strings.dashboard.changeDeliveryDate} />
      ) : (
        renderGuestDeliveryConditions()
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  containerViewStyle: {
    borderRadius: theme.radii['2xl'],
  },
});
