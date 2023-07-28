import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import {
  Box,
  Button,
  ButtonType,
  GiftAndPromotionErrorModal,
  ModalPopUp,
  OutlinedInput,
  ShadowBox,
  Text,
} from '@components';
import { useLocalizedData, useWalletTotal } from '@contexts';
import { ADD_GIFT_COUPON_TO_WALLET } from '@graphqlDocuments/wallet.graphql';
import { AddGiftCouponToWalletMutation, AddGiftCouponToWalletMutationVariables, Wallet } from '@types';
import { formatPrice } from '@utils';
import { WalletWithdrawModal } from './WalletWithdrawModal';

interface Props {
  wallet: Wallet;
  refetch: () => void;
}

export const WalletDetailsBox: React.FC<Props> = (props) => {
  const { wallet, refetch } = props;

  const { walletTotal } = useWalletTotal();

  const { strings } = useLocalizedData();
  const [showInfo, setShowInfo] = useState(false);
  const openInfo = () => setShowInfo(true);
  const closeInfo = () => setShowInfo(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const [showPayout, setShowPayout] = useState(false);
  const openPayout = () => setShowPayout(true);
  const closePayout = () => setShowPayout(false);

  const [updatedCode, { loading: isCodeLoading }] = useMutation<
    AddGiftCouponToWalletMutation,
    AddGiftCouponToWalletMutationVariables
  >(ADD_GIFT_COUPON_TO_WALLET, {
    onCompleted: () => {
      void refetch();
      setValue('code', '');
    },
    onError: () => {
      showModal();
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { code: '' },
  });

  const onSubmit = (submitData: AddGiftCouponToWalletMutationVariables) => {
    void updatedCode({ variables: { code: submitData.code } });
  };

  const payOutTotal = String(formatPrice(wallet.payoutTotal));

  const infoString = strings.profileSettings.wallet.balanceInfo.split(':xAmount');

  return (
    <>
      <GiftAndPromotionErrorModal isVisible={isModalVisible} closeModal={closeModal} />

      <ModalPopUp isVisible={showInfo} header={strings.profileSettings.wallet.balance} onClose={closeInfo}>
        <Text variant="text-md" textAlign="center">
          {infoString[0]}
          <Text variant="heading-sm">{payOutTotal}</Text>
          {infoString[1]}
        </Text>
      </ModalPopUp>
      <WalletWithdrawModal
        payOutTotalValue={wallet.payoutTotal}
        showPayout={showPayout}
        closePayout={closePayout}
        payOutTotal={payOutTotal}
      />
      <Box marginVertical="s5" marginHorizontal="s3">
        <ShadowBox borderRadius={theme.radii.xl} padding="s3">
          <Text variant="heading-sm" marginBottom="s4">
            {strings.profileSettings.wallet.wallet}
          </Text>
          <Box flex={1} flexDirection="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Text variant="heading-lg">{formatPrice(walletTotal)}</Text>

              <Text variant="text-sm">
                {strings.profileSettings.wallet.payableAmount.replace(':xAmount', payOutTotal)}
              </Text>
            </Box>
            <KsIcon onPress={openInfo} name={KS_ICON.INFORMATION_FILL} size={24} color={theme.colors.gray700} />
          </Box>

          <OutlinedInput
            error={errors?.code ? strings.profileSettings.wallet.couponCodeValidation : null}
            rules={{
              required: true,
            }}
            control={control}
            name="code"
            label={strings.profileSettings.wallet.couponCode}
            blurOnSubmit={true}
            style={styles.input}
            returnKeyType="send"
            autoComplete="off"
            autoCorrect={false}
          />

          <Button isLoading={isCodeLoading} onPress={handleSubmit(onSubmit)} marginTop="s5">
            {strings.profileSettings.wallet.redeemCoupon}
          </Button>
          <Button type={ButtonType.OUTLINE} marginTop="s5" onPress={openPayout}>
            {strings.profileSettings.wallet.withdrawCash}
          </Button>
        </ShadowBox>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: theme.spacing.s6,
    flex: 1,
  },
});
