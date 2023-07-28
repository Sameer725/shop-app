import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { BottomTabBar } from '@components';
import { useCollection, useGlobalSettings } from '@contexts';
import { BasketNavigation } from './BasketNavigation';
import { DashboardNavigation } from './DashboardNavigation';
import { FavoritesNavigation } from './FavoritesNavigation';
import { ProductSearchNavigation } from './ProductSearchNavigation';
import { ProfileSettingsNavigation } from './ProfileSettingsNavigation';
import { Tabs } from './routes';

export const TabNavigation: React.FC = () => {
  const Tab = createBottomTabNavigator();
  const { useOnFetchCollection } = useCollection();
  const { useFetchSettings } = useGlobalSettings();
  useOnFetchCollection();
  useFetchSettings();

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={() => ({
        headerShown: false,
      })}
      backBehavior="history"
    >
      <Tab.Screen name={Tabs.DASHBOARD} component={DashboardNavigation} />
      <Tab.Screen name={Tabs.PRODUCT_SEARCH} component={ProductSearchNavigation} />
      <Tab.Screen name={Tabs.BASKET} component={BasketNavigation} />
      <Tab.Screen name={Tabs.FAVORITES} component={FavoritesNavigation} />
      <Tab.Screen name={Tabs.PROFILE_SETTINGS} component={ProfileSettingsNavigation} />
    </Tab.Navigator>
  );
};
