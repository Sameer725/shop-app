import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NativeStackNavigationHelpers } from 'react-native-screens/lib/typescript/native-stack/types';

import { HeaderBackButton } from '@components';
import { useLocalizedData } from '@contexts';
import { DeliveryDateSelectionScreen, ProducerDetailsScreen, ProductDetailsScreen, ProductSearchScreen } from '@pages';
import { CommonScreens, ProductSearchScreens } from './routes';
import { headerDefaultStyles } from './styles';

export const ProductSearchNavigation: React.FC = () => {
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
      initialRouteName={ProductSearchScreens.PRODUCT_SEARCH}
    >
      <Stack.Screen name={ProductSearchScreens.PRODUCT_SEARCH} component={ProductSearchScreen} />
      <Stack.Screen name={CommonScreens.PRODUCT_DETAILS_SCREEN} component={ProductDetailsScreen} />
      <Stack.Screen name={CommonScreens.PRODUCER_DETAILS_SCREEN} component={ProducerDetailsScreen} />
      <Stack.Screen
        name={CommonScreens.DELIVERY_DATE_SELECTION_SCREEN}
        component={DeliveryDateSelectionScreen}
        options={{
          headerShown: true,
          title: strings.deliveryDate.deliveryInstruction,
        }}
      />
    </Stack.Navigator>
  );
};
