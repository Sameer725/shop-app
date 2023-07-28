import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, RadioButtonBox, Text } from '@components';
import { useLocalizedData, useOrderAction, useOrderState, useWalletTotal } from '@contexts';
import { APPLY_WALLET_TOTAL, GET_WALLET_TOTAL, REMOVE_WALLET_TOTAL } from '@graphqlDocuments';
import { ApplyWalletTotalMutation, GetWalletTotalQuery, RemoveWalletTotalMutation, Wallet } from '@types';
import { formatPrice } from '@utils';
import { GiftCouponPaymentOrWallet } from './GiftCouponPaymentOrWallet';

interface Props {
  children?: React.ReactNode;
}

export const BottomSheetWallet = (props: Props) => {
  const { children } = props;
  const [walletSelected, setWalletSelected] = useState(false);

  const { activeOrder } = useOrderState();
  const { walletTotal, updateWalletTotal } = useWalletTotal();

  const { setActiveOrder } = useOrderAction();
  const { data: walletQuery, loading: isLoading } = useQuery<GetWalletTotalQuery>(GET_WALLET_TOTAL, {
    fetchPolicy: 'no-cache',
  });

  const [applyWallet, { loading: applyLoading }] = useMutation<ApplyWalletTotalMutation>(APPLY_WALLET_TOTAL, {
    fetchPolicy: 'no-cache',
    onCompleted: (walletData) => {
      if (activeOrder) {
        setActiveOrder({
          ...activeOrder,
          customFields: {
            ...activeOrder?.customFields,
            usedWalletValue: walletData.applyWalletTotal.customFields?.usedWalletValue,
          },
        });
      }
    },
  });

  const [removeWallet, { loading: removeLoading }] = useMutation<RemoveWalletTotalMutation>(REMOVE_WALLET_TOTAL, {
    fetchPolicy: 'no-cache',
    onCompleted: (walletData) => {
      if (activeOrder) {
        setActiveOrder({
          ...activeOrder,
          customFields: {
            ...activeOrder?.customFields,
            usedWalletValue: walletData.removeWalletTotal.customFields?.usedWalletValue,
          },
        });
      }
    },
  });

  const changeWallet = () => {
    if (activeOrder?.customFields?.usedWalletValue) {
      void removeWallet();
    } else {
      void applyWallet();
    }
  };

  useEffect(() => {
    setWalletSelected(activeOrder?.customFields?.usedWalletValue ? true : false);
  }, [activeOrder]);

  useEffect(() => {
    updateWalletTotal(walletQuery?.wallet as Wallet);
  }, [walletQuery]);

  const { strings } = useLocalizedData();
  const walletLoading = applyLoading || removeLoading || isLoading;

  return (
    <>
      {walletTotal > 0 ? (
        <>
          <Box marginBottom="s4">
            <Pressable onPress={changeWallet}>
              <Box flexDirection="row" paddingTop="s5">
                <Box
                  backgroundColor="white"
                  borderRadius={theme.radii.xl}
                  flexDirection="row"
                  alignItems="center"
                  flex={1}
                >
                  <RadioButtonBox isOptionSelected={walletSelected} />

                  {walletLoading ? (
                    <Box paddingLeft="s4">
                      <ActivityIndicator size={theme.spacing.s4} color={theme.colors.gray300} />
                    </Box>
                  ) : (
                    <>
                      <Box paddingLeft="s4">
                        <KsIcon name={KS_ICON.EMPTY_WALLET} color={theme.colors.defaultTextColor} size={24} />
                      </Box>
                      <Box flex={1} flexDirection="row" justifyContent="space-between" alignItems="center">
                        <Box marginHorizontal="s4" flex={1}>
                          <Text variant="heading-2xs">
                            {strings.checkout.useCredit}: {formatPrice(walletTotal)}
                          </Text>
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </Pressable>
          </Box>
          <Box height={theme.spacing.px} borderRadius={theme.radii.lg} backgroundColor="gray300" />
        </>
      ) : null}

      {walletSelected && activeOrder?.totalWithTax === activeOrder?.customFields?.usedWalletValue ? (
        <GiftCouponPaymentOrWallet fromWallet walletLoading={walletLoading} />
      ) : (
        children
      )}
    </>
  );
};

const styles = StyleSheet.create({
  selectedRadio: {
    height: theme.spacing.s3,
    width: theme.spacing.s3,
    borderRadius: theme.radii.md,
  },
  unSelectedRadio: {
    height: theme.spacing.s5,
    width: theme.spacing.s5,
    borderRadius: 10,
  },
});
