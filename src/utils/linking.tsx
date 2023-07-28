import { PathConfigMap } from '@react-navigation/core';
import { LinkingOptions, ParamListBase } from '@react-navigation/native';
import { Linking } from 'react-native';

import { WEB_APP_URL_DEV, WEB_APP_URL_PROD } from '@constants';
import {
  AuthScreens,
  BasketScreens,
  CommonScreens,
  DashboardScreens,
  ProfileSettingsScreens,
  RootRoutes,
  Tabs,
} from '@routes/routes';

const config = {
  screens: {
    [RootRoutes.UNAUTHENTICATED]: {
      screens: {
        InitialRouteName: AuthScreens.WELCOME_SCREEN,
        [AuthScreens.WELCOME_SCREEN]: { path: '*' },
        [AuthScreens.RESET_PASSWORD_SCREEN]: {
          path: 'resetScreen/:token',
          parse: {
            token: (token: string) => `${token}`,
          },
        },
      },
    },
    [RootRoutes.AUTHENTICATED]: {
      screens: {
        InitialRouteName: Tabs.DASHBOARD,
        [Tabs.DASHBOARD]: {
          screens: {
            [CommonScreens.PRODUCER_DETAILS_SCREEN]: { path: 'producer/:producerId' },
            [CommonScreens.PRODUCT_DETAILS_SCREEN]: { path: 'product/:productVariantId' },
            [DashboardScreens.COLLECTION_OVERVIEW_SCREEN]: { path: 'collection' },
            [DashboardScreens.PRODUCER_LIST_SCREEN]: { path: 'producer' },
            [DashboardScreens.RECIPE_SCREEN]: { path: 'recipe' },
            [DashboardScreens.RECIPE_DETAILS_SCREEN]: { path: 'recipe/:recipeId' },
          },
        },
        [Tabs.BASKET]: {
          screens: {
            [BasketScreens.BASKET]: { path: 'basket' },
            [BasketScreens.CHECKOUT]: { path: 'checkout' },
          },
        },
        [Tabs.FAVORITES]: { path: 'favorites' },
        [Tabs.PRODUCT_SEARCH]: { path: 'search' },
        [Tabs.PROFILE_SETTINGS]: {
          screens: {
            InitialRouteName: ProfileSettingsScreens.PROFILE_SETTINGS,
            [ProfileSettingsScreens.ORDER_LIST]: { path: 'order' },
            [ProfileSettingsScreens.ORDER_DETAILS]: { path: 'order/:orderId' },
            [ProfileSettingsScreens.PROFILE_SETTINGS]: { path: 'profile' },
            [ProfileSettingsScreens.WALLET_DETAILS_SCREEN]: { path: 'wallet' },
          },
        },
      },
    },
  },
};

export const linking: LinkingOptions<ParamListBase> = {
  prefixes: [WEB_APP_URL_DEV, WEB_APP_URL_PROD],
  config: config as {
    initialRouteName?: keyof ParamListBase;
    screens: PathConfigMap<ParamListBase>;
  },
};

export const openLink = async (link: string | null) => {
  if (link && (await Linking.canOpenURL(link))) {
    try {
      await Linking.openURL(link);
    } catch {}
  }
};
