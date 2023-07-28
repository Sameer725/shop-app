import { useNavigation } from '@react-navigation/native';
import React from 'react';

import theme from '@assets/theme/theme';
import { Button, ShadowBox, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { DashboardScreens } from '@routes/routes';
import { KsNavigation } from '@types';

export const NoOrders: React.FC = () => {
  const { strings } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();

  const navigateToCollectionScreen = () => {
    navigation.navigate(DashboardScreens.COLLECTION_OVERVIEW_SCREEN);
  };

  return (
    <ShadowBox borderRadius={theme.radii.xl} padding="s3">
      <Text variant="heading-sm" textAlign="center" marginBottom="s4">
        {strings.profileSettings.order.noOrdersHeader}
      </Text>
      <Text variant="text-md" textAlign="center" marginBottom="s4">
        {strings.profileSettings.order.noOrdersText}
      </Text>
      <Button onPress={navigateToCollectionScreen}>{strings.profileSettings.order.discoverProducts}</Button>
    </ShadowBox>
  );
};
