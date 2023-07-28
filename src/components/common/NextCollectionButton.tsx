import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { ParamListBase, useNavigationState } from '@react-navigation/native';
import React from 'react';

import { useLocalizedData } from '@contexts';
import { DashboardScreens } from '@routes/routes';
import { Button } from './Button';

const NextButton = (props: { navigation: MaterialTopTabNavigationProp<ParamListBase> }) => {
  const { navigation } = props;
  const navigationState = useNavigationState((state) => state);
  const { strings } = useLocalizedData();

  const goToNextCollection = () => {
    const nextRoute = navigationState.routeNames[navigationState.index + 1];
    if (nextRoute) {
      navigation.jumpTo(navigationState.routeNames[navigationState.index + 1]);
    } else {
      navigation.navigate(DashboardScreens.DASHBOARD_LANDING_SCREEN);
    }
  };

  const hasNext = !!navigationState.routeNames[navigationState.index + 1];

  return (
    <>
      {hasNext ? (
        <Button onPress={goToNextCollection} marginBottom="s8" marginRight="s3" marginTop="s3">
          {strings.nextCollection}
        </Button>
      ) : null}
    </>
  );
};

export const NextCollectionButton = React.memo(NextButton);
