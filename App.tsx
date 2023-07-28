import 'react-native-gesture-handler';

import { ApolloProvider } from '@apollo/client';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { StripeProvider } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import CodePush from 'react-native-code-push';
import { enableFlipperApolloDevtools } from 'react-native-flipper-apollo-devtools';
import { Provider as PaperProvider } from 'react-native-paper';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import RNAsyncStorageFlipper from 'rn-async-storage-flipper';

import theme, { darkTheme, paperTheme } from '@assets/theme/theme';
import {
  AuthContextProvider,
  CollectionContextProvider,
  GlobalSettingsContextProvider,
  GuardContextProvider,
  LocalizationProvider,
  OrderContextProvider,
  TimerContextProvider,
  WalletContextProvider,
} from '@contexts';
import { AppContextProvider } from '@contexts/AppContext';
import { MERCHANT_IDENTIFIER, STRIPE_PUBLISH_KEY } from '@env';
import { client, linking } from '@utils';
import { App } from './src';

const ConnectedApp = connectActionSheet(App);

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};

const AppRoot = (): JSX.Element => {
  const [darkMode] = useState(false);

  useEffect(() => {
    // Enable AsyncStorage Flipper
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    RNAsyncStorageFlipper(AsyncStorage as any);
    // Enable flipper apollo devtool
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-argument
    enableFlipperApolloDevtools(client as any);

    // Set default text color of PaperTheme
    paperTheme.colors.text = theme.colors.defaultTextColor;
  }, []);

  return (
    <NavigationContainer
      linking={linking}
      theme={{
        dark: darkMode,
        colors: {
          primary: theme.colors.primary500,
          card: theme.colors.white,
          background: theme.colors.background,
          text: theme.colors.defaultTextColor,
          border: theme.colors.transparent,
          notification: theme.colors.primary500,
        },
      }}
    >
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ToastProvider offsetBottom={(initialWindowMetrics?.insets.bottom ?? 0) + 60}>
          <ApolloProvider client={client}>
            <AuthContextProvider>
              <ThemeProvider theme={darkMode ? darkTheme : theme}>
                <PaperProvider theme={paperTheme}>
                  <LocalizationProvider>
                    <ActionSheetProvider>
                      <StripeProvider
                        publishableKey={STRIPE_PUBLISH_KEY as string}
                        merchantIdentifier={MERCHANT_IDENTIFIER as string}
                      >
                        <AppContextProvider>
                          <TimerContextProvider>
                            <OrderContextProvider>
                              <WalletContextProvider>
                                <CollectionContextProvider>
                                  <GlobalSettingsContextProvider>
                                    <GuardContextProvider>
                                      <ConnectedApp />
                                    </GuardContextProvider>
                                  </GlobalSettingsContextProvider>
                                </CollectionContextProvider>
                              </WalletContextProvider>
                            </OrderContextProvider>
                          </TimerContextProvider>
                        </AppContextProvider>
                      </StripeProvider>
                    </ActionSheetProvider>
                  </LocalizationProvider>
                </PaperProvider>
              </ThemeProvider>
            </AuthContextProvider>
          </ApolloProvider>
        </ToastProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default CodePush(codePushOptions)(AppRoot);
