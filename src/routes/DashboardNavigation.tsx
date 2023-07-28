import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NativeStackNavigationHelpers } from 'react-native-screens/lib/typescript/native-stack/types';

import { HeaderBackButton } from '@components';
import { useLocalizedData } from '@contexts';
import {
  AddressSelectionScreen,
  DashboardLandingScreen,
  DeliveryDateSelectionScreen,
  ProducerDetailsScreen,
  ProducerListScreen,
  ProductDetailsScreen,
  RecipeDetailsScreen,
  RecipeScreen,
  SpecialDetailScreen,
} from '@pages';
import { CollectionTopTabNavigator } from './CollectionNavigation';
import { CommonScreens, DashboardScreens } from './routes';
import { headerDefaultStyles } from './styles';

export const DashboardNavigation: React.FC = () => {
  const Stack = createStackNavigator();

  const { strings } = useLocalizedData();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...headerDefaultStyles,
        headerShadowVisible: false,
        headerShown: false,
        headerLeft: (props) => (
          <HeaderBackButton navigation={navigation as NativeStackNavigationHelpers} backButtonProps={props} />
        ),
      })}
      initialRouteName={DashboardScreens.DASHBOARD_LANDING_SCREEN}
    >
      <Stack.Screen name={DashboardScreens.COLLECTION_OVERVIEW_SCREEN} component={CollectionTopTabNavigator} />
      <Stack.Screen name={DashboardScreens.DASHBOARD_LANDING_SCREEN} component={DashboardLandingScreen} />
      <Stack.Screen
        name={CommonScreens.DELIVERY_DATE_SELECTION_SCREEN}
        component={DeliveryDateSelectionScreen}
        options={{
          headerShown: true,
          title: strings.deliveryDate.deliveryInstruction,
        }}
      />
      <Stack.Screen name={CommonScreens.PRODUCER_DETAILS_SCREEN} component={ProducerDetailsScreen} />
      <Stack.Screen name={DashboardScreens.PRODUCER_LIST_SCREEN} component={ProducerListScreen} />
      <Stack.Screen name={CommonScreens.PRODUCT_DETAILS_SCREEN} component={ProductDetailsScreen} />
      <Stack.Screen name={DashboardScreens.RECIPE_SCREEN} component={RecipeScreen} />
      <Stack.Screen name={DashboardScreens.RECIPE_DETAILS_SCREEN} component={RecipeDetailsScreen} />
      <Stack.Screen name={DashboardScreens.SPECIAL_DETAILS_SCREEN} component={SpecialDetailScreen} />

      <Stack.Screen
        name={DashboardScreens.DELIVERY_ADDRESS_NEW}
        component={AddressSelectionScreen}
        options={{
          headerShown: true,
          title: strings.profileSettings.addresses.newAddress,
        }}
      />
    </Stack.Navigator>
  );
};
