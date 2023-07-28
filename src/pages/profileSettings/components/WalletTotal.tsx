import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import theme from '@assets/theme/theme';
import { Box, Button, ShadowBox, Text } from '@components';
import { useLocalizedData, useWalletTotal } from '@contexts';
import { GET_WALLET_TOTAL } from '@graphqlDocuments/wallet.graphql';
import { ProfileSettingsScreens } from '@routes/routes';
import { GetWalletTotalQuery, KsNavigation, Wallet } from '@types';
import { formatPrice } from '@utils';

export const WalletTotal: React.FC = () => {
  const { strings } = useLocalizedData();

  const navigation: KsNavigation = useNavigation();

  const { walletTotal, updateWalletTotal } = useWalletTotal();
  const navigateToWalletDetailsScreen = () => navigation.navigate(ProfileSettingsScreens.WALLET_DETAILS_SCREEN);

  const { data, loading: isLoading } = useQuery<GetWalletTotalQuery>(GET_WALLET_TOTAL);

  useEffect(() => {
    updateWalletTotal(data?.wallet as Wallet);
  }, [data]);

  return (
    <Box marginTop="s5" marginHorizontal="s3">
      <ShadowBox borderRadius={theme.radii.xl} padding="s3">
        <Text variant="heading-sm" textAlign="center" marginBottom="s4">
          {strings.profileSettings.wallet.wallet}
        </Text>

        {isLoading ? (
          <Box>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                alignSelf="center"
                height={theme.spacing.s8}
                width={150}
                borderRadius={theme.radii.md}
              />
            </SkeletonPlaceholder>

            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                height={theme.spacing.s12}
                borderRadius={theme.radii.md}
                marginTop={theme.spacing.s4}
              />
            </SkeletonPlaceholder>
          </Box>
        ) : (
          <>
            <Text variant="heading-lg" textAlign="center" marginBottom="s4">
              {formatPrice(walletTotal)}
            </Text>
            <Button onPress={navigateToWalletDetailsScreen}>{strings.profileSettings.wallet.toMyWallet}</Button>
          </>
        )}
      </ShadowBox>
    </Box>
  );
};
