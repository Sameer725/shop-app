import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Dimensions } from 'react-native';
import { NativeStackNavigationHelpers } from 'react-native-screens/lib/typescript/native-stack/types';

import theme from '@assets/theme/theme';
import { HEADER_BACK_BUTTON_MARGIN, HEADER_BACK_BUTTON_WIDTH, HeaderBackButton } from '@components';
import { useLocalizedData } from '@contexts';
import {
  AddressListScreen,
  AddressSelectionScreen,
  ComplaintScreen,
  DeleteAccountScreen,
  OrderDetailsScreen,
  OrderListScreen,
  PersonalDataScreen,
  ProfileSettingsScreen,
  SavedPaymentMethodsScreen,
  UpdateEmailScreen,
  UpdatePasswordScreen,
  WalletDetailsScreen,
} from '@pages';
import { ProfileSettingsScreens } from './routes';
import { headerDefaultStyles } from './styles';

export const ProfileSettingsNavigation: React.FC = () => {
  const Stack = createStackNavigator();
  const { strings } = useLocalizedData();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...headerDefaultStyles,
        headerLeft: (props) => (
          <HeaderBackButton navigation={navigation as NativeStackNavigationHelpers} backButtonProps={props} />
        ),
        headerTitleContainerStyle: {
          // Limit the maximum width to avoid the title overlapping the back button
          maxWidth: Dimensions.get('window').width - (2 * HEADER_BACK_BUTTON_WIDTH + 4 * HEADER_BACK_BUTTON_MARGIN),
        },
      })}
      initialRouteName={ProfileSettingsScreens.PROFILE_SETTINGS}
    >
      <Stack.Screen
        name={ProfileSettingsScreens.PROFILE_SETTINGS}
        component={ProfileSettingsScreen}
        options={{
          title: strings.profileSettings.settings,
        }}
      />
      <Stack.Screen
        name={ProfileSettingsScreens.ORDER_LIST}
        component={OrderListScreen}
        options={{
          title: strings.profileSettings.order.allOrders,
        }}
      />
      <Stack.Screen
        name={ProfileSettingsScreens.ORDER_DETAILS}
        component={OrderDetailsScreen}
        options={{
          title: strings.profileSettings.order.orderDetails,
        }}
      />
      <Stack.Screen
        name={ProfileSettingsScreens.COMPLAINT_SCREEN}
        component={ComplaintScreen}
        options={{
          title: strings.profileSettings.complain.complain,
        }}
      />
      <Stack.Screen
        name={ProfileSettingsScreens.PERSONAL_DATA}
        component={PersonalDataScreen}
        options={{
          title: strings.profileSettings.personalData.personalData,
        }}
      />
      <Stack.Screen
        name={ProfileSettingsScreens.CHANGE_PASSWORD}
        component={UpdatePasswordScreen}
        options={{
          title: strings.profileSettings.personalData.changePassword,
        }}
      />
      <Stack.Screen
        name={ProfileSettingsScreens.UPDATE_EMAIL}
        component={UpdateEmailScreen}
        options={{
          title: strings.profileSettings.personalData.updateEmail,
        }}
      />
      <Stack.Screen
        name={ProfileSettingsScreens.DELETE_ACCOUNT}
        component={DeleteAccountScreen}
        options={{
          headerTitleStyle: {
            ...theme.textVariants['heading-md'],
            color: theme.colors.white,
          },
          headerStyle: {
            backgroundColor: theme.colors.error500,
          },
          title: strings.profileSettings.deleteAccount.deleteAccount,
        }}
      />
      <Stack.Screen
        name={ProfileSettingsScreens.ADDRESS_LIST}
        component={AddressListScreen}
        options={{
          title: strings.profileSettings.addresses.addresses,
        }}
      />
      <Stack.Screen
        name={ProfileSettingsScreens.ADDRESS_EDIT}
        component={AddressSelectionScreen}
        options={{
          title: strings.profileSettings.addresses.editAddress,
        }}
      />
      <Stack.Screen
        name={ProfileSettingsScreens.ADDRESS_NEW}
        component={AddressSelectionScreen}
        options={{
          title: strings.profileSettings.addresses.newAddress,
        }}
      />
      <Stack.Screen
        name={ProfileSettingsScreens.SAVED_PAYMENT_METHODS}
        component={SavedPaymentMethodsScreen}
        options={{
          title: strings.profileSettings.overview.paymentMethods,
        }}
      />
      <Stack.Screen
        name={ProfileSettingsScreens.WALLET_DETAILS_SCREEN}
        component={WalletDetailsScreen}
        options={{
          title: strings.profileSettings.wallet.wallet,
        }}
      />
    </Stack.Navigator>
  );
};
