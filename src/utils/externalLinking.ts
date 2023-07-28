import { Linking } from 'react-native';
import { BrowserResult, InAppBrowser } from 'react-native-inappbrowser-reborn';

import theme from '@assets/theme/theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const openUrlInAppBrowser = async (url: string): Promise<BrowserResult | any | null> => {
  if (!url) {
    return null;
  }

  try {
    if (await InAppBrowser.isAvailable()) {
      const backgroundColor = theme.colors.white;
      const textColor = theme.colors.defaultTextColor;

      return InAppBrowser.open(url, {
        // IOS Properties
        dismissButtonStyle: 'done',
        preferredBarTintColor: backgroundColor,
        preferredControlTintColor: textColor,
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'pageSheet',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,

        // Android Properties
        showTitle: true,
        toolbarColor: backgroundColor,
        secondaryToolbarColor: textColor,
        navigationBarColor: theme.colors.black,
        navigationBarDividerColor: theme.colors.black,
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_up', // Animation of browser entering
          startExit: 'scale_down', // Animation of app exiting
          endEnter: 'scale_up', // Animation of app entering
          endExit: 'slide_out_down', // Animation of browser existing
        },
      });
    } else {
      try {
        return openUrlInBrowser(url);
      } catch {}
    }
  } catch {}
  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const openUrlInBrowser = async (url: string): Promise<any | null> => {
  try {
    return Linking.openURL(url);
  } catch {}
  return null;
};
