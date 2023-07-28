import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { KS_ICON } from '@assets/icons';
import { Button, PlaceHolder } from '@components';
import { useLocalizedData } from '@contexts';
import { DashboardScreens } from '@routes/routes';
import { KsNavigation } from '@types';

export const EmptyScreen = () => {
  const {
    strings: { basket },
  } = useLocalizedData();
  const navigation: KsNavigation = useNavigation();

  const navigateToDashboardLandingScreen = () => navigation.navigate(DashboardScreens.COLLECTION_OVERVIEW_SCREEN);

  return (
    <PlaceHolder
      name={KS_ICON.BAG_2}
      title={basket.emptyShoppingCart}
      content={[basket.searchForProducts, basket.minimumOrderValue]}
    >
      <Button onPress={navigateToDashboardLandingScreen}>{basket.discoverProducts}</Button>
    </PlaceHolder>
  );
};
