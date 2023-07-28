import { FetchResult, useMutation } from '@apollo/client';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, View } from 'react-native';

import { Box, Button, Checkbox, Divider, GiftAndPromotionErrorModal, OutlinedInput, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { APPLY_GIFT_COUPON_CODE, APPLY_PROMOTION_CODE } from '@graphqlDocuments/checkout.graphql';
import { useKeyboard } from '@hooks';
import {
  ApplyCouponCodeMutation,
  ApplyCouponCodeMutationVariables,
  ApplyGiftCouponCodeMutation,
  ApplyGiftCouponCodeMutationVariables,
  Discount,
  Order,
} from '@types';
import { formatPrice } from '@utils';
import { CheckoutCard } from './CheckoutCard';
import { DiscountCard } from './DiscountCard';

const getDiscountDetail = (discount: Discount) => {
  if (discount.description.startsWith('KS-')) {
    return `${formatPrice(discount?.initialValue ?? -discount?.amountWithTax) ?? ''} Gutschein`;
  }

  return `${formatPrice(discount.amountWithTax) ?? ''} Rabatt`;
};

interface GiftAndPromotionProps {
  discounts: Discount[];
  setActiveOrder: (order: Order) => void;
  scrollToPosition: (y: number) => void;
  setAddGiftCouponToWallet: Dispatch<SetStateAction<string>>;
  addGiftCouponToWallet: string;
}

export type GiftCouponResponseAccessor =
  | 'applyCouponCode'
  | 'applyGiftCouponCode'
  | 'removeCouponCode'
  | 'removeGiftCouponCode';

export const GiftAndPromotion = (props: GiftAndPromotionProps) => {
  const { discounts = [], setActiveOrder, scrollToPosition, setAddGiftCouponToWallet, addGiftCouponToWallet } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { hideKeyboard } = useKeyboard();
  const [applyPromotionCode, { loading: isApplyPromotionLoading }] = useMutation<
    ApplyCouponCodeMutation,
    ApplyCouponCodeMutationVariables
  >(APPLY_PROMOTION_CODE);
  const [applyGiftCoupon, { loading: isApplyCouponLoading }] = useMutation<
    ApplyGiftCouponCodeMutation,
    ApplyGiftCouponCodeMutationVariables
  >(APPLY_GIFT_COUPON_CODE);

  const {
    strings: { checkout },
  } = useLocalizedData();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: { code: '', addGiftCouponToWallet: !addGiftCouponToWallet },
  });

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const codeRef = useRef<View>(null);
  const scrollOnFocus = () =>
    codeRef?.current?.measure((x, y, width, height, pageX, pageY) => scrollToPosition(pageY + height));

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const setSuccessData = <T extends { [key: string]: any; __typename?: string | undefined }>(
    response: FetchResult<T>,
    accessor: GiftCouponResponseAccessor
  ) => {
    if (response.data) {
      const showError =
        // eslint-disable-next-line @typescript-eslint/naming-convention
        (response?.data[accessor] as { __typename?: string | undefined })?.__typename !== 'Order' ||
        discounts.length === (response?.data[accessor] as Order).discounts?.length;

      if (!showError) {
        setValue('code', '');
      }
      hideKeyboard();
      return showError ? showModal() : setActiveOrder(response.data[accessor] as Order);
    }
  };

  const setFailedData = () => {
    showModal();
  };

  const onPress = ({ code }: { code: string }) => {
    if (code.toUpperCase().startsWith('KS-')) {
      void applyGiftCoupon({ variables: { code: code.toUpperCase() } })
        .then((res) => setSuccessData(res, 'applyGiftCouponCode'))
        .catch(setFailedData);
    } else {
      void applyPromotionCode({ variables: { code } })
        .then((res) => setSuccessData(res, 'applyCouponCode'))
        .catch(setFailedData);
    }
    Keyboard.dismiss();
  };

  return (
    <CheckoutCard title={checkout.giftAndPromotion.name}>
      {discounts.map((discount) => {
        const discountInfo = getDiscountDetail(discount);

        return (
          <DiscountCard
            key={discount.description}
            discount={discountInfo}
            code={discount.description}
            setSuccessData={setSuccessData}
            setFailedData={setFailedData}
          />
        );
      })}

      <View ref={codeRef} renderToHardwareTextureAndroid>
        <Box flexDirection="row" alignItems="flex-end" justifyContent="space-between">
          <OutlinedInput
            onFocus={scrollOnFocus}
            error={null}
            control={control}
            name="code"
            label={checkout.giftAndPromotion.name}
            blurOnSubmit={true}
            style={styles.input}
            returnKeyType="send"
            autoComplete="off"
            autoCorrect={false}
            onSubmitEditing={handleSubmit(onPress)}
          />

          <Button
            isLoading={isApplyCouponLoading || isApplyPromotionLoading}
            marginLeft="s2"
            width="auto"
            onPress={handleSubmit(onPress)}
          >
            {checkout.giftAndPromotion.buttonLabel}
          </Button>
        </Box>

        {discounts?.length > 0 &&
        !!discounts.find(
          (d) => d.description.startsWith('KS') && d.initialValue && d.initialValue > -d.amountWithTax
        ) ? (
          <Box marginTop="s5">
            <Divider />
            <Box flexDirection="row" marginTop="s5" justifyContent="space-between" alignItems="center">
              <Text variant="text-sm">{checkout.addGiftCouponToWallet}</Text>

              <Checkbox
                control={control}
                name="addGiftCouponToWallet"
                onChange={() => {
                  setAddGiftCouponToWallet((prevState) => {
                    if (prevState) {
                      return '';
                    }
                    return addGiftCouponToWallet;
                  });
                }}
              />
            </Box>
          </Box>
        ) : null}
      </View>
      <GiftAndPromotionErrorModal isVisible={isModalVisible} closeModal={closeModal} />
    </CheckoutCard>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
});
