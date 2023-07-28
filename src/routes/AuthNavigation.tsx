import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';

import {
  AddressSelectionScreen,
  BrowseAsGuestScreen,
  ForgetPasswordScreen,
  LoginScreen,
  LoginWithEmailScreen,
  RegisterScreen,
  ResetPasswordScreen,
  WaitingListInputScreen,
  WaitingListSuccessScreen,
  WelcomeScreen,
} from '@pages';
import { AuthScreens } from './routes';

export const AuthNavigation: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={(routes) => ({
        headerShown: false,
        gestureEnabled: routes.route.name !== AuthScreens.ADDRESS_SELECTION_SCREEN,
        animation: 'slide_from_right',
      })}
    >
      <Stack.Screen name={AuthScreens.WELCOME_SCREEN} component={WelcomeScreen} />
      <Stack.Screen name={AuthScreens.LOGIN_SCREEN} component={LoginScreen} options={{ animationEnabled: false }} />
      <Stack.Screen name={AuthScreens.LOGIN_WITH_EMAIL_SCREEN} component={LoginWithEmailScreen} />
      <Stack.Screen name={AuthScreens.REGISTER_SCREEN} component={RegisterScreen} />
      <Stack.Screen
        name={AuthScreens.FORGET_PASSWORD_SCREEN}
        component={ForgetPasswordScreen}
        options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
      />
      <Stack.Screen name={AuthScreens.RESET_PASSWORD_SCREEN} component={ResetPasswordScreen} />
      <Stack.Screen
        name={AuthScreens.BROWSE_AS_GUEST_SCREEN}
        component={BrowseAsGuestScreen}
        options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
      />
      <Stack.Screen name={AuthScreens.WAITING_LIST_INPUT_SCREEN} component={WaitingListInputScreen} />
      <Stack.Screen name={AuthScreens.WAITING_LIST_SUCCESS_SCREEN} component={WaitingListSuccessScreen} />
      <Stack.Screen name={AuthScreens.ADDRESS_SELECTION_SCREEN} component={AddressSelectionScreen} />
    </Stack.Navigator>
  );
};
