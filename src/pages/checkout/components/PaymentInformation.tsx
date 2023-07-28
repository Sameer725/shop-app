import React from 'react';

import { paymentLogos } from '@assets/paymentLogos';
import theme from '@assets/theme/theme';
import { Box, Text } from '@components';
import { AGB_URL, DATA_PRIVACY_URL } from '@constants';
import { useLocalizedData } from '@contexts';
import { openUrlInAppBrowser } from '@utils';

const renderLink = (message: string, url: string) => {
  const onPress = () => {
    void openUrlInAppBrowser(url);
  };

  return (
    <Text color="primary500" variant="text-xs" onPress={onPress}>
      {message + ' '}
    </Text>
  );
};

const RenderLogo = () => {
  const logos = Object.values(paymentLogos);

  return (
    <>
      {logos.map((logo, index) => {
        const Logo = logo;

        return (
          <Box justifyContent="center" alignItems="center" key={index} width="33.33%" marginVertical="s2">
            <Box
              borderWidth={1}
              borderColor="gray200"
              padding="s1"
              width={45}
              height={30}
              backgroundColor="white"
              borderRadius={theme.radii.base}
            >
              <React.Suspense fallback={null}>
                <Logo height="100%" width="100%" />
              </React.Suspense>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

const getRenderLink = (message: string) => {
  const messageSplit = message.split('|');

  return (
    <>
      <Text variant="text-xs">
        {messageSplit[0]}
        {renderLink(messageSplit[1], AGB_URL)}
        {messageSplit[2]}
        {renderLink(messageSplit[3], DATA_PRIVACY_URL)}
        {messageSplit[4]}
      </Text>
    </>
  );
};

export const PaymentInformation = () => {
  const {
    strings: { checkout },
  } = useLocalizedData();

  return (
    <Box marginTop="s5">
      <Box marginBottom="s8" flexDirection="row" flexWrap="wrap">
        {getRenderLink(checkout.payOptions.message)}
      </Box>

      <Box alignItems="center">
        <Text variant="text-xs">{checkout.payOptions.availableMethods}</Text>
        <Box marginTop="s4" width={170} flexDirection="row" flexWrap="wrap">
          <RenderLogo />
        </Box>
      </Box>
    </Box>
  );
};
