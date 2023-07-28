import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ParamListBase } from '@react-navigation/native';
import React, { ComponentType, ReactNode, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import theme from '@assets/theme/theme';
import { FocusAwareStatusBar } from './FocusAwareStatusBar';
import { shadowStyles } from './ShadowBox';

// ISSUE: https://github.com/callstack/react-native-pager-view/issues/458#issuecomment-940020561
// Applying patch for react-native-pager-view due to crashing issue on ios

export interface TopTabNavigationItem {
  id: string;
  name: string;
  screen?: ComponentType;
  placeholder?: () => ReactNode;
}

export interface TopTabNavigationScreenProps<T> extends MaterialTopTabScreenProps<ParamListBase> {
  item: T;
}
interface TopTabNavigationProps<T> {
  data?: (T | TopTabNavigationItem)[];
  initialRouteName?: string;
  defaultScreen: ComponentType<TopTabNavigationScreenProps<T>>;
  defaultPlaceHolder?: () => ReactNode;
}

export const TopTabNavigation = <T extends TopTabNavigationItem>(props: TopTabNavigationProps<T>) => {
  const { data, initialRouteName, defaultScreen, defaultPlaceHolder } = props;
  const TopTab = createMaterialTopTabNavigator();
  const insets = useSafeAreaInsets();
  const [tabScreens, setTabScreens] = useState<JSX.Element[]>();

  useEffect(() => {
    if (!data) {
      return;
    }
    const screens = data.map((item) => {
      const renderScreen = (route: MaterialTopTabScreenProps<ParamListBase>) => {
        const Component = item.screen ?? defaultScreen;
        return <Component item={item as T} {...route} />;
      };

      return (
        <TopTab.Screen key={item.id} name={item.name}>
          {renderScreen}
        </TopTab.Screen>
      );
    });

    setTabScreens(screens);
  }, [data, defaultScreen]);

  return (
    <>
      {tabScreens ? (
        <>
          <FocusAwareStatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />

          <TopTab.Navigator
            screenOptions={({ route }) => ({
              tabBarScrollEnabled: data && data?.length > 1,
              tabBarLabelStyle: {
                ...theme.textVariants['heading-sm'],
                color: theme.colors.defaultTextColor,
                textTransform: 'none',
              },
              tabBarItemStyle: { width: 'auto', paddingHorizontal: theme.spacing.s2 },
              tabBarStyle: {
                backgroundColor: theme.colors.white,
                ...shadowStyles.BASE.style,
                // The shadow of the elevation of the base shadow does not look like the other base shadows
                // -> Increase the elevation to get a similar shadow style.
                elevation: shadowStyles.BASE.elevation + 2,
              },
              tabBarContentContainerStyle: { paddingHorizontal: theme.spacing.s2, paddingTop: insets.top },
              tabBarPressColor: theme.colors.white,
              tabBarIndicatorStyle: {
                backgroundColor: theme.colors.primary500,
                marginBottom: theme.spacing.s2,
                marginHorizontal: theme.spacing.s2,
              },
              lazy: true,
              lazyPreloadDistance: 1,
              lazyPlaceholder:
                data?.find((item) => {
                  return item.name === route.name;
                })?.placeholder ?? defaultPlaceHolder,
            })}
            initialRouteName={initialRouteName}
          >
            {tabScreens}
          </TopTab.Navigator>
        </>
      ) : null}
    </>
  );
};
