import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { KS_ICON } from '@assets/icons';
import { Button, ButtonType, PlaceHolder, ScreenWrapper } from '@components';
import { useLocalizedData } from '@contexts';
import { DashboardScreens } from '@routes/routes';
import { KsNavigation } from '@types';

export const NoFavorites = () => {
  const { strings } = useLocalizedData();

  const navigation: KsNavigation = useNavigation();

  const navigateToDashboardLandingScreen = () => {
    navigation.navigate(DashboardScreens.COLLECTION_OVERVIEW_SCREEN);
  };

  return (
    <ScreenWrapper>
      <PlaceHolder
        name={KS_ICON.HEART}
        title={strings.favorites.noFavorites}
        content={[strings.favorites.howToFavoriteInfo]}
      >
        <Button onPress={navigateToDashboardLandingScreen} type={ButtonType.PRIMARY}>
          {strings.favorites.discoverProducts}
        </Button>
      </PlaceHolder>
    </ScreenWrapper>
  );
};
